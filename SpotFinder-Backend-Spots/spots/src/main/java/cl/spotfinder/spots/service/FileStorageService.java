package cl.spotfinder.spots.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir;

    // Inyectamos la ruta desde application.properties
    public FileStorageService(@Value("${file.upload-dir:uploads}") String uploadDir) {
        // Usamos ruta absoluta basada en el directorio de trabajo
        this.uploadDir = System.getProperty("user.dir") + "/" + uploadDir;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        // 1. Obtener extensión
        String original = file.getOriginalFilename();
        String ext = "";
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf('.'));
        }

        // 2. Crear nombre único
        String filename = UUID.randomUUID().toString() + ext;

        // 3. Asegurar que el directorio existe (ej: /app/uploads/spots)
        Path dir = Paths.get(uploadDir, "spots");
        if (!Files.exists(dir)) {
            Files.createDirectories(dir);
        }

        // 4. Guardar el archivo
        Path target = dir.resolve(filename);
        Files.write(target, file.getBytes(), StandardOpenOption.CREATE_NEW);

        // 5. Retornar la URL relativa que servirá CorsConfig (ResourceHandler)
        // La URL será: http://host:8080/uploads/spots/nombre-uuid.jpg
        return "/uploads/spots/" + filename;
    }
}