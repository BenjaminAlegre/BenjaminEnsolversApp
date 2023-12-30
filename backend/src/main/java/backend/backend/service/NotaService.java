package backend.backend.service;

import backend.backend.dto.NotaDTO;
import backend.backend.exception.NotFoundException;
import backend.backend.model.Etiqueta;
import backend.backend.model.Nota;
import backend.backend.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class NotaService {
    @Autowired
    private NotaRepository notaRepository;
    @Autowired
    private EtiquetaService etiquetaService;

    public Nota obtenerNotaPorId(Long id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Nota no encontrada con el ID: " + id));
    }

    public List<Nota> listarNotasActivas() {
        return notaRepository.findByArchivada(false);
    }

    public List<Nota> listarNotasArchivadas() {
        return notaRepository.findByArchivada(true);
    }

    public Nota crearNota(NotaDTO notaRequest) {
        Nota nota = new Nota();
        nota.setNombre(notaRequest.getNombre());
        nota.setContenido(notaRequest.getContenido());
        nota.setArchivada(false);

        if (notaRequest.getEtiquetasIds() != null && !notaRequest.getEtiquetasIds().isEmpty()) {
            Set<Etiqueta> etiquetas = etiquetaService.obtenerEtiquetasPorIds(notaRequest.getEtiquetasIds());
            nota.setEtiquetas(etiquetas);
        }

        return notaRepository.save(nota);
    }

    public Nota editarNota(Long id, NotaDTO notaRequest) {
        Optional<Nota> optionalNota = notaRepository.findById(id);

        if (optionalNota.isPresent()) {
            Nota notaExistente = optionalNota.get();
            notaExistente.setContenido(notaRequest.getContenido());
            notaExistente.setNombre(notaRequest.getNombre());

            // Manejo de etiquetas
            if (notaRequest.getEtiquetasIds() != null && !notaRequest.getEtiquetasIds().isEmpty()) {
                Set<Etiqueta> etiquetas = etiquetaService.obtenerEtiquetasPorIds(notaRequest.getEtiquetasIds());
                notaExistente.setEtiquetas(etiquetas);
            } else {
                notaExistente.getEtiquetas().clear();
            }

            return notaRepository.save(notaExistente);
        } else {
            throw new NotFoundException("Nota no encontrada con el ID: " + id);
        }
    }

    public void borrarNota(Long id) {
        Optional<Nota> optionalNota = notaRepository.findById(id);

        if (optionalNota.isPresent()) {
            notaRepository.deleteById(id);
        } else {
            throw new NotFoundException("Nota no encontrada con el ID: " + id);
        }
    }

    public Nota archivarNota(Long id) {
        Optional<Nota> optionalNota = notaRepository.findById(id);

        if (optionalNota.isPresent()) {
            Nota notaExistente = optionalNota.get();
            notaExistente.setArchivada(true);
            return notaRepository.save(notaExistente);
        } else {
            throw new NotFoundException("Nota no encontrada con el ID: " + id);
        }
    }

    public Nota desarchivarNota(Long id) {
        Optional<Nota> optionalNota = notaRepository.findById(id);

        if (optionalNota.isPresent()) {
            Nota notaExistente = optionalNota.get();
            notaExistente.setArchivada(false);
            return notaRepository.save(notaExistente);
        } else {
            throw new NotFoundException("Nota no encontrada con el ID: " + id);
        }
    }

    public List<Nota> obtenerEtiquetasDeNota(Long id) {
        return notaRepository.findEtiquetasById(id);
    }

    public Nota agregarEtiquetas(Long notaId, Set<Long> etiquetasIds) {
        Nota nota = notaRepository.findById(notaId)
                .orElseThrow(() -> new NotFoundException("Nota no encontrada con ID: " + notaId));

        Set<Etiqueta> etiquetasNuevas = etiquetaService.obtenerEtiquetasPorIds(etiquetasIds);
//        Set<Etiqueta> etiquetasActuales = nota.getEtiquetas();
//        etiquetasNuevas.addAll(etiquetasActuales);
        nota.setEtiquetas(etiquetasNuevas);

        return notaRepository.save(nota);
    }

    public List<Nota> filtrarPorEtiqueta(Long etiquetaId) {
        return notaRepository.findByEtiquetasId(etiquetaId);
    }

}
