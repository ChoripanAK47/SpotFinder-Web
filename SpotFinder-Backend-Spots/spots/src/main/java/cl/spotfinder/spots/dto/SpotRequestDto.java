package cl.spotfinder.spots.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotRequestDto {
    @NotBlank
    private String nombre;
    private String descripcion;
    private Ubicacion ubicacion;
    private String comuna;
    private ServiciosDto servicios;

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
    public static class ServiciosDto {
        private Boolean tieneBanos;
        private Boolean tieneZonasRecreativas;
        private Boolean tieneComercioCercano;
    }
}
