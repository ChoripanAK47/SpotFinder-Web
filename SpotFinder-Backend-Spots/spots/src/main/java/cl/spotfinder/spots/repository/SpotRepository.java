package cl.spotfinder.spots.repository;

import cl.spotfinder.spots.dto.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpotRepository extends JpaRepository<Spot, Long> {
    
}
