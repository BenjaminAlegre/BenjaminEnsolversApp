package backend.backend.controllers;

import backend.backend.model.Etiqueta;
import backend.backend.model.Nota;
import backend.backend.service.EtiquetaService;
import backend.backend.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/etiquetas")
@CrossOrigin(value = "http://localhost:3000")
public class EtiquetaController {

    @Autowired
    private EtiquetaService etiquetaService;

    @Autowired
    private NotaService notaService;



    @GetMapping
    public ResponseEntity<List<Etiqueta>> listar() {
        List<Etiqueta> etiquetas = etiquetaService.listarEtiquetas();
        return ResponseEntity.ok(etiquetas);
    }

    @PostMapping
    public ResponseEntity<Etiqueta>  crear(@RequestBody Etiqueta etiqueta) {
        Etiqueta etiquetaCreada = etiquetaService.crear(etiqueta);
        return ResponseEntity.ok(etiquetaCreada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etiqueta> editar(@PathVariable Long id, @RequestBody Etiqueta etiqueta) {
        Etiqueta etiquetaEditada = etiquetaService.editar(id, etiqueta);
        return ResponseEntity.ok(etiquetaEditada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> borrar(@PathVariable Long id) {
        try {
            etiquetaService.borrar(id);
            return new ResponseEntity<>("Borrado exitoso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al borrar: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
