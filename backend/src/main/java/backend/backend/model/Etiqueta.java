package backend.backend.model;


import jakarta.persistence.*;
import lombok.*;

@Data@NoArgsConstructor@AllArgsConstructor
@Entity
public class Etiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}
