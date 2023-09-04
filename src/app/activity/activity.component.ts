import { Component, OnInit } from '@angular/core';
import { ActivityTableSetting } from '../shared/tableSettings/ActivityTableSetting';
import { SharedService } from '../shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../shared/constant/Contant';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  alertFadeoutTime = 0;
  activityList = [];
  activitySettings = ActivityTableSetting.setting;
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { 
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;

      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
    }

  ngOnInit() {
    this.getAllActivities();
    //this.updateRouterSequence();
    setTimeout(() => {
      jQuery("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
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

  getAllActivities(){
    let jsonData = {
      "loginEmpId" : this.loginEmpId,
      "loginEmpRole" : this.loginEmpRole,
      "tenentId" : this.tenentId
    }
    this.spinner.show();
    this.sharedService.getAllActivities(jsonData)
    .subscribe((response) =>{
      //console.log(response);
      this.activityList = response.activityList;
      // if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
      //   this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      // }
      // else{
      //   this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      // }
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitAssignData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  searchActivityData(){
    this.getAllActivities();
  }

}
