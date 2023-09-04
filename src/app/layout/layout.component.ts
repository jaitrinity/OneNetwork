import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared/service/SharedService';
import { Constant } from '../shared/constant/Contant';
import { DatePipe } from '@angular/common';
// import { ConnectionService } from 'ng-connection-service';
declare var jQuery: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  // status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  dashbordIcon = "https://image.shutterstock.com/image-vector/marketing-strategy-symbol-vector-icon-260nw-718510423.jpg";
  companyName = "Trinity";
  loginEmpId : string = "";
  empName : string;
  loginEmpRole : string = "";
  empRoleId : string;
  currentYear : any;
  tenentId = "";
  loginPage = "";
  color1 = "";
  color2 = "";
  colorSetting = {};
  public menuTopList = [];
  public menuList = [];
  constructor(
    //private connectionService:ConnectionService, 
    private router:Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sharedService : SharedService,
    private datePipe : DatePipe) {
      // this.connectionService.monitor().subscribe(isConnected => {
      //   this.isConnected = isConnected;
      //   if(this.isConnected){
      //     // this.status = "ONLINE";
      //   } else {
      //     // this.toastr.warning("You now offline, plz check your internet connection..","Alert !",{timeOut : 2000});
      //     // this.status = "OFFLINE"
      //   }
      //   // alert(this.status);
      // });
      this.loginEmpId = localStorage.getItem("empId");
      this.empName = localStorage.getItem("empName");
      this.empRoleId = localStorage.getItem("empRoleId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.tenentId = localStorage.getItem("tenentId");
      this.loginPage = localStorage.getItem("loginPage");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
      // console.log(this.color1+" : "+this.color2)
    }

  ngOnInit() {
    this.loadMenuList();
    this.loadTopMenuList();
    //this.currentYear = this.datePipe.transform(new Date(),'dd-MMM-yyyy hh:mm:ss a');
    this.currentYear = this.datePipe.transform(new Date(),'yyyy');
    setTimeout(() => {
      if(this.loginEmpRole != 'Admin'){
        // this.router.navigate(['/layout/dashboard']);
        let firstMenuId = localStorage.getItem("firstMenuId");
        this.router.navigate(['/layout/menu-submenu/'+firstMenuId]);
      }
    }, 100);
    

    // this.menuTopList = [
    //   {"menuName":"Device","routerLink":"m1"},
    //   {"menuName":"Employee","routerLink":"m2"},
    //   {"menuName":"Location","routerLink":"m3"},
    //   {"menuName":"Mapping","routerLink":"m4"},
    //   {"menuName":"Checkpoint","routerLink":"m5"},
    //   {"menuName":"Assign","routerLink":"m6"},
    //   {"menuName":"Activity","routerLink":"m7"},
    //   {"menuName":"Checklist","routerLink":"m8"},
    //   {"menuName":"Input type","routerLink":"m9"},
    // ];

    // Prevent to right click on brower
    // jQuery(document).ready(function() {
    //   jQuery("div").on("contextmenu",function(){
    //     alert("Please not try to right click")
    //      return false;
    //   }); 
    // });

    setTimeout(() => {
      jQuery("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    

    jQuery('#toggle-btn').on('click', function (e) {
      e.preventDefault();
      jQuery(this).toggleClass('active');

      jQuery('.side-navbar').toggleClass('shrinked');
      jQuery('.content-inner').toggleClass('active');
      jQuery(document).trigger('sidebarChanged');

      if (jQuery(window).outerWidth() > 1183) {
          if (jQuery('#toggle-btn').hasClass('active')) {
              jQuery('.navbar-header .brand-small').hide();
              jQuery('.navbar-header .brand-big').show();
          } else {
              jQuery('.navbar-header .brand-small').show();
              jQuery('.navbar-header .brand-big').hide();
          }
      }

      if (jQuery(window).outerWidth() < 1183) {
          jQuery('.navbar-header .brand-small').show();
      }
    });
  }

  // getTxtColor() : string{
  //   return this.color1;
  // }
  // getBgColor() : string{
  //   return this.color2;
  // }

  loadTopMenuList(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId
    }
    this.sharedService.getHeaderMenu(jsonData)
    .subscribe( (response) =>{
      //console.log(response);
      this.menuTopList = response.headerMenuList;
  },
    (error)=>{
      
    })
  }

  logout(){
    let isConfirm = confirm("Are you sure you want to logout?")
    if(isConfirm){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  loadMenuList(){
    var jsonStr = {
      loginEmpId:this.loginEmpId,
      empRoleId:this.empRoleId,
      loginEmpRole:this.loginEmpRole,
      tenentId:this.tenentId
    }
    //console.log(jsonStr);
    this.menuList = [];
    this.sharedService.getMenuListByRoleName(jsonStr)
    .subscribe( (response) =>{
      // console.log(response);
        if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.menuList = response.wrappedList;
          for(let i=0;i<this.menuList.length;i++){
            let catId = this.menuList[i].menuId;
            let catName = this.menuList[i].menuName;
            if(i==0){
              localStorage.setItem("firstMenuId",catId);
            }
            localStorage.setItem(catId,catName);
          }
        }
        else{
         
        }
  },
    (error)=>{
      
    })

  }

}
