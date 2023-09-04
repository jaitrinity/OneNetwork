import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraphService } from 'src/app/shared/service/GraphService';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/shared/constant/Contant';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-graph-dashbord',
  templateUrl: './graph-dashbord.component.html',
  styleUrls: ['./graph-dashbord.component.css']
})
export class GraphDashbordComponent implements OnInit {
  searchType = "";
  checklistId = "";
  checklistData = [];
  label = [];  
  filledData = [];
  approveData = [];
  pendingData = [];
  data = [];  
  // monthLabel = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; 
  // monthData = [];
  monthLabel = []; 
  monthData = [];
  loginEmpId : any = "";
  loginEmpRole : any = "";
  barChart = [];
  doughnutChart = [];
  constructor(private graphService : GraphService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe : DatePipe) { 
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRole = localStorage.getItem("empRole");
  }


  
  ngOnInit() {
    //this.loadChecklistGraph();
  }

  loadChecklistGraph(){
    let json = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole
    }
    this.graphService.loadChecklistGraph(json)
    .subscribe((response) =>{
      //console.log(response);
      // let jan = 0;
      // let feb = 0;
      // let mar = 0;
      // let apr = 0;
      // let may = 0;
      // let jun = 0;
      // let jul = 0;
      // let aug = 0;
      // let sep = 0;
      // let oct = 0;
      // let nov = 0;
      // let dec = 0;
      let wrappedList = response.wrappedList;
      for(let i=0;i<wrappedList.length;i++){
        let checklistName = wrappedList[i].checklistName;
        let menuId = wrappedList[i].menuId;
        let checklistJson = {
          checklistName : checklistName,
          menuId : menuId
        }
        this.checklistData.push(checklistJson);
        this.label.push(checklistName)
        let dataObj = wrappedList[i].data[0];
        this.filledData.push(dataObj.filledChecklist);
        this.approveData.push(dataObj.approvedChecklist);
        this.pendingData.push(dataObj.pendingForApprovalChecklist);
        // jan += dataObj.jan;
        // feb += dataObj.feb;
        // mar += dataObj.mar;
        // apr += dataObj.apr;
        // may += dataObj.may;
        // jun += dataObj.jun;
        // jul += dataObj.jul;
        // aug += dataObj.aug;
        // sep += dataObj.sep;
        // oct += dataObj.oct;
        // nov += dataObj.nov;
        // dec += dataObj.dec;
      }
      // this.monthData.push(jan);
      // this.monthData.push(feb);
      // this.monthData.push(mar);
      // this.monthData.push(apr);
      // this.monthData.push(may);
      // this.monthData.push(jun);
      // this.monthData.push(jul);
      // this.monthData.push(aug);
      // this.monthData.push(sep);
      // this.monthData.push(oct);
      // this.monthData.push(nov);
      // this.monthData.push(dec);
      //this.showBarChart("barChartCanvas");
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("loadChecklistGraph"),"Alert !");
      this.spinner.hide();
    });
  }

  showBarChart(canvasId) {
    this.barChart = new Chart(canvasId, {  
      type: "bar", 
       
      data: {  
        labels: this.label,
        datasets : [
          { data: this.filledData, label: 'Fill', stack: 'a',backgroundColor : "#00FFFF" },
          { data: this.approveData, label: 'Approved', stack: 'a',backgroundColor : "#3cb371" },
          { data: this.pendingData, label: 'Pending', stack: 'a',backgroundColor : "#f990a7" }
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

  loadMonthwiseGraph(canvasId) {
    // console.log(this.monthLabel);
    // console.log(this.monthData);
    this.doughnutChart = new Chart(canvasId, {  
      type: "doughnut",  
      data: {  
        labels: this.monthLabel,  
        datasets: [  
          {  
            data: this.monthData,  
            borderColor: '#3cb371',  
            backgroundColor: [  
              "#3cb371",  
              "#0000FF",  
              "#9966FF",  
              "#4C4CFF",  
              "#00FFFF",  
              "#f990a7",  
              "#aad2ed",  
              "#FF00FF",  
              "Blue",  
              "Red",  
              "Blue",
              "yellow"  
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
            display: false  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }

  loadMonthWiseGraph(){
    // alert((new Date().getMilliseconds()));
    if(this.searchType == ""){
      return ;
    }
    else if(this.checklistId == ""){
      return ;
    }
    // $(".doughnutChartCanvasClass").removeAttr("id");
    // this.monthLabel = [];
    // this.monthData = [];
    this.label = [];
    this.filledData = [];
    this.approveData = [];
    this.pendingData = [];
    let json = {
      loginEmpId : this.loginEmpId,
      searchType : this.searchType,
      menuId : this.checklistId
    }
    this.graphService.loadMonthWiseGraph(json)
    .subscribe((response) =>{
      //console.log(response);
      let wrappedDataList = response.wrappedList[0].data;
      for(let i=0;i<wrappedDataList.length;i++){
        // this.monthLabel.push(wrappedDataList[i].monthName);
        // this.monthData.push(wrappedDataList[i].filledChecklist);
        this.label.push(wrappedDataList[i].monthName)
        this.filledData.push(wrappedDataList[i].filledChecklist);
        this.approveData.push(wrappedDataList[i].approvedChecklist);
        this.pendingData.push(wrappedDataList[i].pendingForApprovalChecklist);
      }
      $(".doughnutChartCanvas").html("");
      if(this.searchType === "MTD"){
        // $(".doughnutChartCanvas").html("<canvas id='doughnutChartCanvasMTD'></canvas>");
        //this.loadMonthwiseGraph("doughnutChartCanvasMTD");
        $(".doughnutChartCanvas").html("<canvas id='barChartCanvasMTD'></canvas>");
        this.showBarChart("barChartCanvasMTD");
      }
      else if(this.searchType === "QTD"){
        // $(".doughnutChartCanvas").html("<canvas id='doughnutChartCanvasQTD'></canvas>");
        // this.loadMonthwiseGraph("doughnutChartCanvasQTD");
        $(".doughnutChartCanvas").html("<canvas id='barChartCanvasQTD'></canvas>");
        this.showBarChart("barChartCanvasQTD");
      }
      else if(this.searchType === "YTD"){
        // $(".doughnutChartCanvas").html("<canvas id='doughnutChartCanvasYTD'></canvas>");
        // this.loadMonthwiseGraph("doughnutChartCanvasYTD");
        $(".doughnutChartCanvas").html("<canvas id='barChartCanvasYTD'></canvas>");
        this.showBarChart("barChartCanvasYTD");
      }
      
      // setTimeout(() => {
      //   let currentHhMmSs = this.datePipe.transform(new Date(),'hh_mm_ss');
      //   let customId = "doughnutChartCanvas_"+currentHhMmSs;
      //   $(".doughnutChartCanvasClass").attr("id",customId);
      //   this.loadMonthwiseGraph(customId);
      // }, 1000);
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("loadMonthWiseGraph"),"Alert !");
      this.spinner.hide();
    });
    //
  }

}
