package cl.spotfinder.spots.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotFrontendDto {
    private String spotId;
    private String nombre;
    private String descripcion;
    private Ubicacion ubicacion;
    private List<String> fotosUrls;
    private String comuna;
    private Calificacion calificacionPromedio;
    private Servicios servicios;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Ubicacion {
        private Double lat;
        private Double lng;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Calificacion {
        private Integer seguridad;
        private Integer limpieza;
        private Integer accesibilidad;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Servicios {
        private Boolean tieneBanos;
        private Boolean tieneZonasRecreativas;
        private Boolean tieneComercioCercano;
    }
}
