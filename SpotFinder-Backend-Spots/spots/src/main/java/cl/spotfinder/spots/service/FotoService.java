package cl.spotfinder.spots.service;

import cl.spotfinder.spots.dto.Foto;
import cl.spotfinder.spots.dto.Spot;
import cl.spotfinder.spots.repository.FotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FotoService {

    private final FotoRepository fotoRepository;
    private final FileStorageService fileStorageService; // Cambiado de S3Service

    public FotoService(FotoRepository fotoRepository, FileStorageService fileStorageService) {
        this.fotoRepository = fotoRepository;
        this.fileStorageService = fileStorageService;
    }

    public Foto uploadAndCreate(Spot spot, MultipartFile file, Integer orden) throws IOException {
        // Usamos el servicio local
        String url = fileStorageService.uploadFile(file);
        
        Foto foto = new Foto();
        foto.setUrl(url); // Guardamos la ruta relativa, ej: /uploads/spots/abc.jpg
        foto.setFilename(file.getOriginalFilename());
        foto.setContentType(file.getContentType());
        foto.setSize(file.getSize());
        foto.setOrden(orden);
        foto.setSpot(spot);
        return fotoRepository.save(foto);
    }
}