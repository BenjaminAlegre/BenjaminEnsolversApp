package backend.backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class NotaDTO {
    private String nombre;
    private String contenido;
    private Set<Long> etiquetasIds;
}
