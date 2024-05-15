import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../environment/environment';
import { LocalizacionService } from '../servicios/localizacion.service';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {
  markers: any[] = [];
  mostrarComidaChina = false;
  mostrarComidaJaponesa = false;
  mostrarComidaItaliana = false;
  mostrarComidaTapas = false;
  map:any;
  constructor( private LocalizacionService:LocalizacionService ){}


  markersData:any;




  ngOnInit(): void {
    mapboxgl.accessToken = environment.mapboxToken;

    this.LocalizacionService.verLocalizaciones().subscribe(response=>{
      this.markersData=response.data
            console.log(this.markersData)
            this.addMarkers();
    })


    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.1055487, 41.5471781],
      zoom: 12
    });

    this.addMarkers();
   

  }

// veo marcadores al inicio
  verMarkers(){
    if (this.markersData) {
      this.markersData.forEach((marker: any) => {
        const popup = new mapboxgl.Popup().setHTML(`<h6>${marker.titulo}</h6><br><p>${marker.direccion}</p>`)
        const newMarker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([marker.longitud,marker.latitud])
          .setPopup(popup)
          .addTo(this.map);
          this.markers.push(newMarker);
      }); 
    }
  }

  addMarkers() {
    // Limpia todos los marcadores
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  
    // Crea un array con los nombres de las categorías seleccionadas
    const selectedCategories:any[] = [];
    if (this.mostrarComidaChina) selectedCategories.push('china');
    if (this.mostrarComidaJaponesa) selectedCategories.push('japonesa');
    if (this.mostrarComidaItaliana) selectedCategories.push('italiana');
    if (this.mostrarComidaTapas) selectedCategories.push('tapas');
  
    // Filtra los marcadores si hay categorías seleccionadas
    let filteredMarkers = [];
    if (selectedCategories.length > 0) {
      filteredMarkers = this.markersData.filter((marker: any) => {
        return selectedCategories.includes(marker.category);
      });
    } else {
      // Si no hay categorías seleccionadas, muestra todos los marcadores
      filteredMarkers = this.markersData;
    }
  
    // Agrega los marcadores filtrados al mapa
    filteredMarkers.forEach((marker: any) => {
      const popup = new mapboxgl.Popup().setHTML(`<h6>${marker.titulo}</h6><br><p>${marker.direccion}</p>`);
      const newMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([marker.longitud, marker.latitud])
        .setPopup(popup)
        .addTo(this.map);
      this.markers.push(newMarker);
    });
  }
  
  // inputs 
  
  categorias(categoria: string) {
    switch (categoria) {
      case 'Comida China':
        this.mostrarComidaChina = !this.mostrarComidaChina;
        break;
      case 'Comida Japonesa':
        this.mostrarComidaJaponesa = !this.mostrarComidaJaponesa;
        break;
      case 'Comida Italiana':
        this.mostrarComidaItaliana = !this.mostrarComidaItaliana;
        break;
      case 'Comida Tapas':
        this.mostrarComidaTapas = !this.mostrarComidaTapas;
        break;
      default:
        break;
    }
    // Actualiza los marcadores según los filtros aplicados
    this.addMarkers();
  }
  
  
}
