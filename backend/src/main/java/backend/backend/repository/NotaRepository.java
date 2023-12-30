package backend.backend.repository;

import backend.backend.model.Etiqueta;
import backend.backend.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByArchivada(boolean archivada);

    List<Nota> findEtiquetasById(Long notaId);

    List<Nota> findByEtiquetasId(Long etiquetaId);



}
