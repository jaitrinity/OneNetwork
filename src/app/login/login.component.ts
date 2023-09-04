import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from './model/AuthenticateModel';
import { NgxSpinnerService } from "ngx-spinner";
import { Constant } from '../shared/constant/Contant';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared/service/SharedService';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // appName = "OneNetwork";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  mobileNumber = "";
  otpNumber = "";
  newPassword = "";
  confirmPassword = "";
  validOTPNumber = "";
  isOTP_Validate : boolean = false;
  public loginModel : AuthenticateModel;
  constructor(private sharedService : SharedService,private router:Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.loginModel = new AuthenticateModel();
    // this.appName = Constant.APP_NAME;
  }

  ngOnInit() {
    this.getAppUrl();
  }

  getAppUrl(){
    //console.log(this.companyName)
    let jsonData = {
      loginEmpId : ""
    }
    this.sharedService.getPortalColor(jsonData)
    .subscribe( (response) =>{
      // console.log(response);
      let appResponse = response.colorList[0];
      this.loginPage = appResponse.loginPage;
      this.button = appResponse.button;
      this.color1 = appResponse.color1;
      this.color2 = appResponse.color2;
      // this.colorSetting = {
      //   'background-color' : this.color1,
      //   //'color' : this.color2
      // }
      //console.log(appResponse.color1);
      localStorage.setItem("loginPage",this.loginPage);
      localStorage.setItem("button",this.button);
      localStorage.setItem("color1",this.color1);
      localStorage.setItem("color2",this.color2);
  },
    (error)=>{
      
    })
  }

  checkAuthenticate(){
    // this.loginModel.appName = this.appName;
    if(this.loginModel.username == ""){
      // alert("enter valid username")
      this.toastr.warning("enter valid employee id","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      return ;
    }
    if(this.loginModel.password == ""){
      // alert("enter password")
      this.toastr.warning("enter valid password","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      return ;
    }
    this.spinner.show();
    this.sharedService.authenticate(this.loginModel)
    .subscribe( (response) =>{
      this.spinner.hide(); 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          // sessionStorage.setItem("username",this.loginModel.username);
          // sessionStorage.setItem("password", this.loginModel.password)
          localStorage.setItem("empId",this.loginModel.username);
          localStorage.setItem("empName",response.wrappedList[0].empName);
          localStorage.setItem("empRoleId",response.wrappedList[0].empRoleId);
          localStorage.setItem("loginEmpRole",response.wrappedList[0].roleName);
          localStorage.setItem("tenentId",response.wrappedList[0].tenentId);
          localStorage.setItem(btoa("isValidToken"),btoa(Constant.TRINITY_PRIVATE_KEY));
          this.router.navigate(['/layout']);
          this.spinner.hide();
        }
        else if(response.responseCode === Constant.NO_RECORDS_FOUND_CODE){
          this.toastr.warning(response.responseDesc, 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        else{
          this.toastr.warning('Invalid Login Credentials...', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.spinner.hide();
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("authenticate"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    })

  }

  openForgetPasswordModel(){
    if(this.loginModel.username == ""){
      // alert("enter employee id");
      this.toastr.warning("enter valid employee id","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      return;
    }
    $("#forgetPasswordModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  sendOTP(){
    this.isOTP_Validate = false;
    this.validOTPNumber = "";
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber
    }
    this.spinner.show();
    this.sharedService.sendOTP(json)
    .subscribe( (response) =>{
      this.spinner.hide(); 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.validOTPNumber = response.wrappedList[0];
          this.spinner.hide();
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.spinner.hide();
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("sendOTPtoMobile"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    })
  }

  VerifyOTP(){
    this.isOTP_Validate = false;
    if(this.otpNumber != this.validOTPNumber){
      alert("enter enter valid otp");
      return;
    }
    this.isOTP_Validate = true;

  }

  changePassword(){
    if(this.newPassword == ""){
      alert("enter new password");
      return ;
    }
    else if(this.confirmPassword != this.newPassword){
      alert("password confirmation incorrect please check");
      return;
    }
    this.spinner.show(); 
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber,
      newPassword : this.newPassword
    }
    this.sharedService.changePassword(json)
    .subscribe( (response) =>{
      this.spinner.hide(); 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success('password change successfully', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          $("#forgetPasswordModal").modal("hide");
          this.otpNumber = "";
          this.mobileNumber = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.isOTP_Validate = false;
          this.spinner.hide();
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.spinner.hide();
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("changePassword"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    })
  }

  closeModal(){
    let isConfirm = confirm("Do you want to close?");
    if(isConfirm){
      this.mobileNumber = "";
      this.otpNumber = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.isOTP_Validate = false;
      $("#forgetPasswordModal").modal("hide");
    }
  }

}
