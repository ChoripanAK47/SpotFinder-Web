package cl.spotfinder.spots.controller;

import cl.spotfinder.spots.dto.SpotRequestDto;
import cl.spotfinder.spots.dto.SpotResponseDto;
import cl.spotfinder.spots.dto.Spot;
import cl.spotfinder.spots.service.SpotService;
import cl.spotfinder.spots.dto.SpotFrontendDto;
import cl.spotfinder.spots.service.SpotMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/spots")
public class SpotUploadController {

    @Autowired
    private SpotService spotService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadSpot(@RequestPart("spot") @Valid SpotRequestDto spotDto,
                                        @RequestPart(value = "files", required = false) MultipartFile[] files) {
        try {
            Spot saved = spotService.createSpotWithFiles(spotDto, files);

            SpotResponseDto resp = new SpotResponseDto();
            resp.setId(saved.getId());
            resp.setNombre(saved.getNombre());
            resp.setDescripcion(saved.getDescripcion());
            resp.setLat(saved.getLat());
            resp.setLng(saved.getLng());
            resp.setComuna(saved.getComuna());
            if (saved.getCalificacionPromedio() != null) {
                resp.setCalificacionPromedio(new SpotResponseDto.CalificacionDto(
                        saved.getCalificacionPromedio().getSeguridad(),
                        saved.getCalificacionPromedio().getLimpieza(),
                        saved.getCalificacionPromedio().getAccesibilidad()
                ));
            }
            if (saved.getServicios() != null) {
                resp.setServicios(new SpotResponseDto.ServiciosDto(
                        saved.getServicios().getTieneBanos(),
                        saved.getServicios().getTieneZonasRecreativas(),
                        saved.getServicios().getTieneComercioCercano()
                ));
            }
            List<String> fotos = saved.getFotos().stream().map(f -> f.getUrl()).collect(Collectors.toList());
            resp.setFotos(fotos);

            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error subiendo archivos: " + e.getMessage());
        }
    }

    @org.springframework.web.bind.annotation.GetMapping
    public ResponseEntity<?> listSpots() {
        List<Spot> spots = spotService.getAllSpots();
        List<SpotFrontendDto> dtos = spots.stream().map(SpotMapper::toFrontendDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @org.springframework.web.bind.annotation.GetMapping("/{id}")
    public ResponseEntity<?> getSpotById(@org.springframework.web.bind.annotation.PathVariable("id") Long id) {
        Spot spot = spotService.getSpotById(id);
        if (spot == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Spot no encontrado");
        return ResponseEntity.ok(SpotMapper.toFrontendDto(spot));
    }

}
