package backend.backend.model;

//
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data@NoArgsConstructor@AllArgsConstructor
@Entity
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    private boolean archivada;

    @ManyToMany
    @JoinTable(
            name = "nota_etiqueta",
            joinColumns = @JoinColumn(name = "nota_id"),
            inverseJoinColumns = @JoinColumn(name = "etiqueta_id"))
    private Set<Etiqueta> etiquetas;
}
