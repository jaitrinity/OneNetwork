import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  Player = ["Jai","Hunny","Yogendra","Ramu"];  
  Run = [11,22,12];  
  stackedBarData = [
    { data: [65, 59, 80, 1], label: 'Series A', stack: 'a',backgroundColor : "red" },
    { data: [28, 48, 40, 2], label: 'Series B', stack: 'a',backgroundColor : "blue" },
    { data: [22, 11, 5, 3], label: 'Series C', stack: 'a',backgroundColor : "yellow" }
  ];
  
  lineChart = []; 
  pieChart = []; 
  barChart = []; 
  constructor() { }

  ngOnInit() {
    this.showLineChart('lineChartCanvas','line');
    this.showPieChart('pieChartCanvas','pie');
    this.showBarChart('barChartCanvas','bar');
    this.showBarChart('doughnutChartCanvas','doughnut');
    this.showBarChart('polarAreaChartCanvas','polarArea');
    this.showStackedBarChart('stackedBarChartCanvas','bar');
  }

  showLineChart(canvasId, graphType) {
    this.lineChart = new Chart(canvasId, {  
      type: graphType,  
      data: {  
        labels: this.Player,  
        datasets: [  
          {  
            data: this.Run,  
            borderColor: '#3cb371',  
            backgroundColor: "#0000FF",  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }
  showBarChart(canvasId, graphType) {
    this.lineChart = new Chart(canvasId, {  
      type: graphType,  
      data: {  
        labels: this.Player,  
        datasets: [  
          {  
            data: this.Run,  
            borderColor: '#3cb371',  
            backgroundColor: [  
              "#3cb371",  
              "#0000FF",  
              "#9966FF",  
              // "#4C4CFF",  
              // "#00FFFF",  
              // "#f990a7",  
              // "#aad2ed",  
              // "#FF00FF",  
              // "Blue",  
              // "Red",  
              // "Blue"  
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: true  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }

  showStackedBarChart(canvasId, graphType) {
    this.lineChart = new Chart(canvasId, {  
      type: graphType,  
      data: {  
        labels: this.Player,  
        datasets: this.stackedBarData, 
        fill: true 
      },  
      options: {  
        legend: {  
          display: true  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }

  showPieChart(canvasId, graphType) {
    this.lineChart = new Chart(canvasId, {  
      type: graphType,  
      data: {  
        labels: this.Player,  
        datasets: [  
          {  
            data: this.Run,  
            borderColor: '#3cb371',  
            backgroundColor: [  
              "#3cb371",  
              "#0000FF",  
              "#9966FF",  
              // "#4C4CFF",  
              // "#00FFFF",  
              // "#f990a7",  
              // "#aad2ed",  
              // "#FF00FF",  
              // "Blue",  
              // "Red",  
              // "Blue"  
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: true  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }

}
