package cl.spotfinder.spots.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.spotfinder.spots.dto.Spot;
import cl.spotfinder.spots.repository.SpotRepository;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import cl.spotfinder.spots.dto.SpotRequestDto;
import cl.spotfinder.spots.dto.Foto;
import cl.spotfinder.spots.repository.FotoRepository;

@Service
public class SpotService {
    
    @Autowired
    private SpotRepository spotRepository;

    @Autowired
    private FotoService fotoService;

    @Autowired
    private FotoRepository fotoRepository;

    public List<Spot> getAllSpots() {
        return spotRepository.findAll();
    }

    public Spot getSpotById(Long id) {
        return spotRepository.findById(id).orElse(null);
    }

    public Spot createSpot(Spot spot) {
        return spotRepository.save(spot);
    }

    public Spot createSpotWithFiles(SpotRequestDto dto, MultipartFile[] files) throws IOException {
        Spot spot = new Spot();
        spot.setNombre(dto.getNombre());
        spot.setDescripcion(dto.getDescripcion());
        if (dto.getUbicacion() != null) {
            spot.setLat(dto.getUbicacion().getLat());
            spot.setLng(dto.getUbicacion().getLng());
        }
        spot.setComuna(dto.getComuna());
        if (dto.getServicios() != null) {
            Spot.Servicios s = new Spot.Servicios(dto.getServicios().getTieneBanos(), dto.getServicios().getTieneZonasRecreativas(), dto.getServicios().getTieneComercioCercano());
            spot.setServicios(s);
        }

        // Persist spot first to get id
        Spot saved = spotRepository.save(spot);

        if (files != null && files.length > 0) {
            for (int i = 0; i < files.length; i++) {
                MultipartFile f = files[i];
                Foto foto = fotoService.uploadAndCreate(saved, f, i);
                // add to collection
                saved.getFotos().add(foto);
            }
            // save again to update relationship
            saved = spotRepository.save(saved);
        }

        return saved;
    }

    public Spot updateSpot(Long id, Spot spotDetails) {
        Spot spot = spotRepository.findById(id).orElse(null);
        if (spot != null) {
            spot.setNombre(spotDetails.getNombre());
            spot.setDescripcion(spotDetails.getDescripcion());
            spot.setLat(spotDetails.getLat());
            spot.setLng(spotDetails.getLng());
            spot.setComuna(spotDetails.getComuna());
            // Update other fields as necessary
            return spotRepository.save(spot);
        }
        return null;
    }
    
    public List<Spot> findSpotsByComuna(String comuna) {
        // Implement custom query in SpotRepository if needed
        return spotRepository.findAll().stream()
        .filter(spot -> spot.getComuna().equalsIgnoreCase(comuna))
        .toList();
    }
    
    public void deleteSpot(Long id) {
        spotRepository.deleteById(id);
    }
}
