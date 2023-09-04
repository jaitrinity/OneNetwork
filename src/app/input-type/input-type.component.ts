import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../shared/constant/Contant';
import { InputTypeTableSetting } from '../shared/tableSettings/InputTypeTableSetting';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-input-type',
  templateUrl: './input-type.component.html',
  styleUrls: ['./input-type.component.css']
})
export class InputTypeComponent implements OnInit {
  alertFadeoutTime = 0;
  loginEmpId = "";
  loginEmpRole = "";
  typeName = "";
  inputTypeList = [];
  button = "";
  color1 = "";
  color2 = "";
  inputTypeTableSetting = InputTypeTableSetting.setting;
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { 
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
    }

  ngOnInit() {
    this.getAllInputTypeList();
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
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

  getAllInputTypeList(){
    this.inputTypeList = [];
    let jsonData = {
      loginEmpId : ""
    }
    this.spinner.show();
    this.sharedService.getAllInputTypeList(jsonData)
    .subscribe((response) =>{
      this.inputTypeList = response.inputTypeList;
      this.spinner.hide();
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  submitInputTypeData(){
    if(this.typeName == ""){
      this.toastr.warning("please enter type value ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    let jsonData = {
      typeName : this.typeName
    }
    this.spinner.show();
    this.sharedService.submitInputTypeData(jsonData)
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.typeName = "";
        this.getAllInputTypeList();
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
