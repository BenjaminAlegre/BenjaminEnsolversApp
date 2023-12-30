package backend.backend.service;

import backend.backend.exception.NotFoundException;
import backend.backend.model.Etiqueta;
import backend.backend.model.Nota;
import backend.backend.repository.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EtiquetaService {

    @Autowired
    private EtiquetaRepository etiquetaRepository;


    public List<Etiqueta> listarEtiquetas() {
        return etiquetaRepository.findAll();
    }

    public Etiqueta obtenerEtiquetaPorId(Long id) {
        return etiquetaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Etiqueta no encontrada con el ID: " + id));
    }

    public Set<Etiqueta> obtenerEtiquetasPorIds(Set<Long> ids) {
        return etiquetaRepository.findAllByIdIn(ids);
    }

    public Etiqueta crear(Etiqueta etiqueta) {
        return etiquetaRepository.save(etiqueta);
    }

    public Etiqueta editar(Long id, Etiqueta etiqueta) {
        Optional<Etiqueta> optionalEtiqueta = etiquetaRepository.findById(id);

        if (optionalEtiqueta.isPresent()) {
            Etiqueta etiquetaExistente = optionalEtiqueta.get();
            etiquetaExistente.setNombre(etiqueta.getNombre());
            return etiquetaRepository.save(etiquetaExistente);
        } else {
            throw new NotFoundException("Etiqueta no encontrada con el ID: " + id);
        }
    }

    public void borrar(Long id) {
        etiquetaRepository.deleteById(id);
    }
}
