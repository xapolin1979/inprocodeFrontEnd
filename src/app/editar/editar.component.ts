import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ReactiveFormsModule , FormControl,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../servicios/base-datos.service';
@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  id:any;
  alert=false;
  formularioValido: boolean = false;
infoCliente:any;
  datos: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/),this.telefonoLengthValidator]),
    localizacion: new FormControl('', Validators.required)
  });
  constructor(private route: ActivatedRoute,private userService: UserService) { }

  cerrar(){
    this.alert=false;
  }

  obtenerRegistros() {
   
    this.userService.obtenerRegistroPorId(this.id).subscribe(response => {
      this.infoCliente=response.data;
         
      this.datos.patchValue({
        nombre: this.infoCliente.nombre,
        apellido: this.infoCliente.apellido,
        email: this.infoCliente.email,
        telefono: this.infoCliente.telefono,
        localizacion: this.infoCliente.localizacion
      });
    });
  }

actualizarDatos(){
  this.userService.actualizarRegistro(this.id,this.datos.value).subscribe(response=>{
    console.log(response)
  })
  this.alert=true
}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['infoCliente'];
      console.log(this.id);
    });

    this.datos.statusChanges.subscribe(() => {
      this.formularioValido = this.datos.valid;
    });
    this.obtenerRegistros();
   }

   
telefonoLengthValidator(control: FormControl): { [key: string]: any } | null {
  if (control.value && control.value.toString().length !== 9) {
      return { 'invalidLength': true };
  }
  return null;
}


}
