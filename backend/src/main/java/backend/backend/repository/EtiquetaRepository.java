package backend.backend.repository;

import backend.backend.model.Etiqueta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface EtiquetaRepository extends JpaRepository<Etiqueta, Long> {
    Set<Etiqueta> findAllByIdIn(Set<Long> ids);

}
