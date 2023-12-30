package backend.backend.controllers;

import backend.backend.dto.NotaDTO;
import backend.backend.model.Etiqueta;
import backend.backend.model.Nota;
import backend.backend.service.EtiquetaService;
import backend.backend.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/app/notas")
public class NotaController {
    @Autowired
    private NotaService notaService;
    @Autowired
    private EtiquetaService etiquetaService;

    @GetMapping("/{id}")
    public ResponseEntity<Nota> obtenerNotaPorId(@PathVariable Long id) {
        Nota nota = notaService.obtenerNotaPorId(id);
        if(nota == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(nota);
    }

    @GetMapping("/activas")
    public List<Nota> listarNotasActivas() {
        return notaService.listarNotasActivas();
    }

    @GetMapping("/archivadas")
    public List<Nota> listarNotasArchivadas() {
        return notaService.listarNotasArchivadas();
    }

    @PostMapping
    public Nota crearNota(@RequestBody NotaDTO nota) {
        return notaService.crearNota(nota);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Nota> editarNota(@PathVariable Long id, @RequestBody NotaDTO notaRecibida) {
        Nota nota = notaService.obtenerNotaPorId(id);
        if(nota == null) {
            throw new RuntimeException("Nota no encontrada con el ID: " + id);
        }
        notaService.editarNota(id, notaRecibida);
        return ResponseEntity.ok(nota);
    }


    @DeleteMapping("/{id}")
    public void borrarNota(@PathVariable Long id) {
        notaService.borrarNota(id);
    }

    @PutMapping("/{id}/archivar")
    public Nota archivarNota(@PathVariable Long id) {
        return notaService.archivarNota(id);
    }

    @PutMapping("/{id}/desarchivar")
    public Nota desarchivarNota(@PathVariable Long id) {
        return notaService.desarchivarNota(id);
    }


    @GetMapping("/{id}/etiquetas")
    public ResponseEntity<List<Etiqueta>> obtenerEtiquetasDeNota(@PathVariable Long id) {
        Nota nota = notaService.obtenerNotaPorId(id);
        if(nota == null) {
            throw new RuntimeException("Nota no encontrada con el ID: " + id);
        }
        List<Etiqueta> etiquetas = nota.getEtiquetas().stream().toList();
        return ResponseEntity.ok(etiquetas);
    }



    @PutMapping("/{id}/addEtiquetas")
    public ResponseEntity<Nota> agregarEtiquetas(@PathVariable Long id, @RequestBody Set<Long> etiquetasIds) {
        Nota nota = notaService.obtenerNotaPorId(id);
        if(nota == null) {
            throw new RuntimeException("Nota no encontrada con el ID: " + id);
        }
        System.out.println("Nota existe: " + id);
        System.out.println("Etiquetas recibidas: " + etiquetasIds);

        notaService.agregarEtiquetas(id, etiquetasIds);
        return ResponseEntity.ok(nota);
    }


    @GetMapping("/{id}/filtroPorEtiqueta")
    public ResponseEntity<List<Nota>> filtrarPorEtiqueta(@PathVariable Long id) {
        Etiqueta etiqueta = etiquetaService.obtenerEtiquetaPorId(id);
        if(etiqueta == null) {
            throw new RuntimeException("Etiqueta no encontrada con el ID: " + id);
        }
        List<Nota> notas = notaService.filtrarPorEtiqueta(id);
        return ResponseEntity.ok(notas);
    }
}
