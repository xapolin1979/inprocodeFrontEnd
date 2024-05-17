import { Component } from '@angular/core';
import { UserService } from '../servicios/base-datos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
infoCliente:any;
datos:any;
eliminado:boolean=false;
  constructor(private userService: UserService, private router: Router) { }


  obtenerRegistros() {
    this.userService.verRegistros().subscribe(response => {
      this.datos = response.data;
      console.log(this.datos);
    });
  }

borrar(id:number){
  this.userService.eliminarRegistro(id).subscribe(response => {
    console.log(response.message); 
  });
  this.eliminado=true;
   this. obtenerRegistros()
}

cerrar(){
  this.eliminado=false;
}

obtenerInfo(id:any){
this.infoCliente=id;
this.router.navigate(['/editar'], { queryParams: { infoCliente: this.infoCliente } });
console.log(this.infoCliente)
}
  ngOnInit(){
    this.obtenerRegistros()
  }
}
