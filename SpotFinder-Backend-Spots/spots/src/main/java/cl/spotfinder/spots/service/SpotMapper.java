package cl.spotfinder.spots.service;

import cl.spotfinder.spots.dto.Foto;
import cl.spotfinder.spots.dto.Spot;
import cl.spotfinder.spots.dto.SpotFrontendDto;

import java.util.List;
import java.util.stream.Collectors;

public class SpotMapper {

    public static SpotFrontendDto toFrontendDto(Spot spot) {
        SpotFrontendDto dto = new SpotFrontendDto();
        dto.setSpotId(spot.getId() == null ? null : String.valueOf(spot.getId()));
        dto.setNombre(spot.getNombre());
        dto.setDescripcion(spot.getDescripcion());
        if (spot.getLat() != null || spot.getLng() != null) {
            dto.setUbicacion(new SpotFrontendDto.Ubicacion(spot.getLat(), spot.getLng()));
        }
        List<String> fotos = spot.getFotos() == null ? List.of() : spot.getFotos().stream().map(Foto::getUrl).collect(Collectors.toList());
        dto.setFotosUrls(fotos);
        dto.setComuna(spot.getComuna());
        if (spot.getCalificacionPromedio() != null) {
            dto.setCalificacionPromedio(new SpotFrontendDto.Calificacion(
                    spot.getCalificacionPromedio().getSeguridad(),
                    spot.getCalificacionPromedio().getLimpieza(),
                    spot.getCalificacionPromedio().getAccesibilidad()
            ));
        }
        if (spot.getServicios() != null) {
            dto.setServicios(new SpotFrontendDto.Servicios(
                    spot.getServicios().getTieneBanos(),
                    spot.getServicios().getTieneZonasRecreativas(),
                    spot.getServicios().getTieneComercioCercano()
            ));
        }
        return dto;
    }
}
