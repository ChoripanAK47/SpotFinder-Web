package cl.spotfinder.spots.repository;

import cl.spotfinder.spots.dto.Foto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FotoRepository extends JpaRepository<Foto, Long> {

}
