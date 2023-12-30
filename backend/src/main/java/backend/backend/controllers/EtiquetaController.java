package backend.backend.controllers;

import backend.backend.model.Etiqueta;
import backend.backend.model.Nota;
import backend.backend.service.EtiquetaService;
import backend.backend.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Etiqueta crear(@RequestBody Etiqueta etiqueta) {
        return etiquetaService.crear(etiqueta);
    }

    @PutMapping("/{id}")
    public Etiqueta editar(@PathVariable Long id, @RequestBody Etiqueta etiqueta) {
        return etiquetaService.editar(id, etiqueta);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        etiquetaService.borrar(id);
    }

}
