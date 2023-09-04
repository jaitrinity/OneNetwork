import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../shared/constant/Contant';
import { AssignTableSetting } from '../shared/tableSettings/AssignTableSetting';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  alertFadeoutTime = 0;
  employeeList = [];
  selectedEmployeeList = [];
  menuList = [];
  selectedMenuList = [];
  locationList = [];
  selectedLocationList = [];
  startDate = "";
  endDate = "";
  assignList = [];
  assignTableSettings = AssignTableSetting.setting;
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { 
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
    }

  ngOnInit() {
    this.multiSelectdropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
      $(".assign_location").attr("title","Click me to show ? details.");
      $(".assign_location").click(function(){
        $("#assignInfoModal").modal({
          backdrop : 'static',
          keyboard : false
        });
      })
    }, 2000);

    this.getAllList();
    this.getAllAssignedList();
    //this.updateRouterSequence();
  }
  updateRouterSequence(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      currentRouter : this.router.url
    }
    this.sharedService.actionOnDataByUpdateType(jsonData,'routerSequence')
    .subscribe((response) =>{
      // console.log(response);
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("updateRouterSeq"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  closeModal(){
    $("#assignInfoModal").modal("hide");
  }

  createCommaSeprate(listData : any){
    let commSeprateValue = "";
    for(let i=0;i<listData.length;i++){
      commSeprateValue += listData[i].paramCode;
      if(i != listData.length-1){
        commSeprateValue += ",";
      }
    }
    return commSeprateValue;
  }

  getAllList(){
    this.sharedService.getAllList(this.tenentId)
    .subscribe((response) =>{
      // console.log(response);
      this.employeeList = response.empList;
      this.menuList = response.menuList;
      this.locationList = response.locationList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  submitAssignData(){
    if(this.selectedEmployeeList.length == 0){
      this.toastr.warning("please select employee","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.selectedMenuList.length == 0){
      this.toastr.warning("please select menu","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.selectedLocationList.length == 0){
      this.toastr.warning("please select location","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.startDate == ""){
      this.toastr.warning("please enter start date value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.endDate == ""){
      this.toastr.warning("please enter end date value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    let empIds = this.createCommaSeprate(this.selectedEmployeeList);
    let menuIds = this.createCommaSeprate(this.selectedMenuList);
    let locationIds = this.createCommaSeprate(this.selectedLocationList);

    let jsonData = {
      empId : empIds,
      menuId : menuIds,
      locationId : locationIds,
      startDate : this.startDate,
      endDate : this.endDate
    }
    this.spinner.show();
    this.sharedService.submitAssignData(jsonData)
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.setDefaultField();
        this.getAllAssignedList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitAssignData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }
  setDefaultField(){
    this.selectedEmployeeList = [];
    this.selectedMenuList = [];
    this.selectedLocationList = [];
    this.startDate = "";
    this.endDate = "";
  }

  getAllAssignedList(){
    this.assignList = [];
    let jsonData = {
      "loginEmpId" : this.loginEmpId,
      "loginEmpRole" : this.loginEmpRole,
      "tenentId" : this.tenentId
    }
    this.spinner.show();
    this.sharedService.getAllAssignData(jsonData)
    .subscribe((response) =>{
      //console.log(response);
      this.assignList = response.assignList;
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitAssignData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  actionOnAssign(event,action){
    let isConfirm = confirm("Do you want to change?");
    if(isConfirm){
      let assignId = event.data.assignId;
      let jsonData = {
        "assignId" : assignId,
        "action" : action
      }
      this.spinner.show();
      this.sharedService.actionOnAssign(jsonData)
      .subscribe((response) =>{
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
          this.getAllAssignedList();
        }
        else{
          this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        }
        this.spinner.hide();
        
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("submitAssignData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      });
    }
  }

}
