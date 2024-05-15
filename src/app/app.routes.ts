import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { GraficsComponent } from './grafics/grafics.component';
import { RegistroComponent } from './registro/registro.component';
import { EditarComponent } from './editar/editar.component';
export const routes: Routes = [
    
    {path:"",component:HomeComponent},
    {path:"mapa",component:MapaComponent},
    {path:"calendar",component:FullCalendarComponent},
    {path:"grafics",component:GraficsComponent},
    {path:"registro",component:RegistroComponent},
    {path:"editar",component:EditarComponent},


];
