package cl.spotfinder.spots.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotResponseDto {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double lat;
    private Double lng;
    private String comuna;
    private List<String> fotos;
    private CalificacionDto calificacionPromedio;
    private ServiciosDto servicios;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CalificacionDto {
        private Integer seguridad;
        private Integer limpieza;
        private Integer accesibilidad;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ServiciosDto {
        private Boolean tieneBanos;
        private Boolean tieneZonasRecreativas;
        private Boolean tieneComercioCercano;
    }
}
