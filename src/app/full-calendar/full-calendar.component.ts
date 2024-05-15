import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Importa interactionPlugin
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es'
import {ReactiveFormsModule, Validators,FormControl } from '@angular/forms';
import { UserService } from '../servicios/base-datos.service';
@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [FullCalendarModule,CommonModule,ReactiveFormsModule],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.css'
})
export class FullCalendarComponent {
  deleteConfirmation:boolean=false;
  verModal:boolean=false;
  editarModal:boolean=false;
  eventoControl = new FormControl('', Validators.required);
  eventoColor = new FormControl('', Validators.required);
  editarControl = new FormControl('', Validators.required);
  editarColor = new FormControl('', Validators.required);
  editarFecha:any;
  fechaEvento:any;
  nuevoEvento:any;
  eventos:any;
  verEventos: any[] = [];
  infoEvento:any;
  idEvento:number=0;
  constructor(private userService: UserService) { }


  ngOnInit():void{
    this.userService.verEventos().subscribe(response=>{
      this.verEventos=response.data;
      console.log( this.verEventos)
      this.calendarOptions.events = this.verEventos;
    })
  
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    locale: esLocale,
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (info) => this.handleEventClick(info),
    editable: true, // Habilita la edición de eventos
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek' // Botones para cambiar entre vista mensual y semanal
    }
   
  };

  //modal para crear eventos
  handleDateClick(arg: any) {
    this.verModal = true;
    this.fechaEvento=arg.dateStr
    
  }
    
  crearEvento(){
 
    const nuevoEvento = {
        title: this.eventoControl.value,
        date: this.fechaEvento,
        color: this.eventoColor.value
    };
    this.eventos=nuevoEvento;
   
    this.userService.insertarEventos(this.eventos).subscribe(response=>{
         console.log(response)
    })
  
    this.verModal = false;
     window.location.reload();

  }
   
  //modal para editar o borrar eventos insertados

  handleEventClick(info: any) {
    this.editarControl.setValue(info.event.title);
    this.editarColor.setValue(info.event.backgroundColor);
     this.editarModal=true;
     this.editarFecha = info.event.startStr;
     this.idEvento=info.event.id
   
  }
   
  editarEvento(id:number){

    this.infoEvento = {
      title: this.editarControl.value,
      date: this.editarFecha, 
      color: this.editarColor.value
    };
    this.userService.actualizarEvento(id, this.infoEvento).subscribe(response=>{console.log(response)})
    window.location.reload();
  }
  
borrarEvento(id:number){
  this.userService.eliminarEvento(id).subscribe(response=>console.log(response));
  window.location.reload();
}


}
