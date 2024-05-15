import { Component } from '@angular/core';
import { UserService } from '../servicios/base-datos.service';
import {ReactiveFormsModule , FormControl,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    alert:boolean=false;
    formularioValido: boolean = false;
   datos=new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/),this.telefonoLengthValidator]),
    localizacion: new FormControl('', Validators.required)

  }) 


  constructor(private userService: UserService) { }

  

  insertar(){
   this.userService.insertarRegistro(this.datos.value).subscribe(response=>{
    console.log(response)
   })
   this.datos.reset(); 
   this.alert=true;
  } 
  cerrar(){
    this.alert=false;
  }

  ngOnInit(): void{

  this.datos.statusChanges.subscribe(() => {
    this.formularioValido = this.datos.valid;
  });
 
}


telefonoLengthValidator(control: FormControl): { [key: string]: any } | null {
  if (control.value && control.value.toString().length !== 9) {
      return { 'invalidLength': true };
  }
  return null;
}

}
