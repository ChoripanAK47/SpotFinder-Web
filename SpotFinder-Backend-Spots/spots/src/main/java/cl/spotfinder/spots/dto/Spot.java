package cl.spotfinder.spots.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "spots")
public class Spot {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false, length = 5000)
	private String descripcion;

	@Column(nullable = false)
	private Double lat;

	@Column(nullable = false)
	private Double lng;

	@Column(nullable = false)
	private String comuna;

	@OneToMany(mappedBy = "spot", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Foto> fotos = new ArrayList<>();

	@Embedded
	private Calificacion calificacionPromedio;

	@Embedded
	private Servicios servicios;

	@Embeddable
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Calificacion {
		private Integer seguridad;
		private Integer limpieza;
		private Integer accesibilidad;
	}

	@Embeddable
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Servicios {
		private Boolean tieneBanos;
		private Boolean tieneZonasRecreativas;
		private Boolean tieneComercioCercano;
	}

}
