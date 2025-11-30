export const spots = [
  {
    spotId: '1',
    nombre: 'Parque La Calera',
    descripcion: `Ubicado en el corazón de La Calera, Región de Valparaíso, el Parque Municipal Ramón Aravena Laborde se ha consolidado como el principal espacio de recreación, encuentro comunitario y esparcimiento familiar de la comuna. Su nombre honra al exalcalde Ramón Aravena Laborde, figura clave en el desarrollo urbano local.

    Durante años, el parque fue administrado bajo concesiones breves, lo que limitaba la posibilidad de ejecutar proyectos de largo plazo. Sin embargo, en octubre de 2023, se marcó un hito histórico: el municipio de La Calera, liderado por el alcalde Johnny Piraíno, logró firmar una concesión por 25 años con el Ministerio de Bienes Nacionales. Este acuerdo permitió planificar mejoras estructurales y sociales, como la instalación de una pista de patinaje, un parque para mascotas y un cierre perimetral financiado por el Fondo Nacional de Desarrollo Regional.
    
    Hoy, el parque no solo representa un pulmón verde vital para la ciudad, sino también un símbolo de gestión comunitaria, visión urbana y compromiso con el bienestar de los caleranos y caleranas.`,
    ubicacion: { lat: -32.787788, lng: -71.184983},
    fotosUrls: ['/imagenesSpots/ParqueLaCalera.jpg', '/imagenesSpots/ParqueLaCalera1.jpg', '/imagenesSpots/ParqueLaCalera2.jpg', '/imagenesSpots/ParqueLaCalera3.jpg'],
    comuna: 'La Calera',
    calificacionPromedio: { seguridad: 4, limpieza: 5, accesibilidad: 5 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: true, tieneComercioCercano: true }
  },
  {
    spotId: '2',
    nombre: 'Skatepark La Calera',
    descripcion: 'Skatepark en La Calera.',
    ubicacion: { lat: -32.782243, lng: -71.189674 },
    fotosUrls: ['/imagenesSpots/SkateparkLaCalera.jpg'],
    comuna: 'La Calera',
    calificacionPromedio: { seguridad: 2, limpieza: 3, accesibilidad: 3 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: true, tieneComercioCercano: false }
  },
  {
    spotId: '3',
    nombre: 'Laguna Sausalito',
    descripcion: 'Laguna Sausalito.',
    ubicacion: { lat: -33.012848, lng: -71.537790 },
    fotosUrls: ['/imagenesSpots/LagunaSausalitoVina.jpg'],
    comuna: 'Viña del Mar',
    calificacionPromedio: { seguridad: 3, limpieza: 2, accesibilidad: 3 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: true, tieneComercioCercano: true }
  },
  {
    spotId: '4',
    nombre: 'Plaza Cemento Melón',
    descripcion: 'Plaza Cemento Melón.',
    ubicacion: { lat: -32.790383, lng: -71.201871 },
    fotosUrls: ['/imagenesSpots/PlazaCementoMelonLaCalera.jpg'],
    comuna: 'La Calera',
    calificacionPromedio: { seguridad: 4, limpieza: 5, accesibilidad: 5 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: true, tieneComercioCercano: true }
  },
  {
    spotId: '5',
    nombre: 'Montañas Lorem Ipsum',
    descripcion: 'Montañas Lorem Ipsum.',
    ubicacion: { lat: -32.792875, lng: -71.187840 },
    fotosUrls: ['/imagenesSpots/Landscape.jpg'],
    comuna: 'Loremipsumjistán',
    calificacionPromedio: { seguridad: 3, limpieza: 5, accesibilidad: 1 },
    servicios: { tieneBanos: false, tieneZonasRecreativas: true, tieneComercioCercano: false }
  },
];
