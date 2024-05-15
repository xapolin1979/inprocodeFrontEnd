import { Component } from '@angular/core';
import { Chart, ChartType} from 'chart.js/auto';

@Component({
  selector: 'app-grafics',
  standalone: true,
  imports: [],
  templateUrl: './grafics.component.html',
  styleUrl: './grafics.component.css'
})
export class GraficsComponent {
chartLine:any;
chartBar:any;
  ngOnInit():void{
    this.chartLine = new Chart('lineChart', {
      type: 'line' as ChartType,
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'Ventas 2023',
            data: [65, 59, 80, 81, 75, 55, 63],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Ventas 2024',
            data: [45, 80, 55, 72, 81, 63, 75], 
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      }
    });


    this.chartBar = new Chart('barChart', {
      type: 'bar' as ChartType,
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'Facturacion 2023',
            data: [2500, 3000, 4500, 2300, 3260, 1800, 4200],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132)',
            borderWidth: 1
          },
          {
            label: 'Facturacion 2024',
            data: [2800, 3200, 3800, 4000, 4500, 2000, 3800],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235)',
            borderWidth: 1
          }
        ]
      }
    });
    



  }

}
  


