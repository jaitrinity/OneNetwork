import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../shared/constant/Contant';
import { RoleTableSetting } from '../shared/tableSettings/RoleTableSetting';
import { CommonFunction } from '../shared/service/CommonFunction';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  alertFadeoutTime = 0;
  roleName = "";
  menuList = [];
  selectedMenuList = [];
  roleList = [];
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  roleTableSettings = RoleTableSetting.setting;
  multiSelectdropdownSettings = {};
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
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    
    
    this.getAllList();
    this.getAllRoleList();
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


  getAllList(){
    this.sharedService.getAllList(this.tenentId)
    .subscribe((response) =>{
      // console.log(response);
      this.menuList = response.menuList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  getAllRoleList(){
    this.roleList = [];
    let jsonData = {
      "loginEmpId" : this.loginEmpId
    }
    this.spinner.show();
    this.sharedService.getAllListBySelectType(jsonData,"role")
    .subscribe((response) =>{
      //console.log(response);
      this.roleList = response.roleList;
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllRoleList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  submitRoleData(){
    if(this.roleName == ""){
      this.toastr.warning("please enter role ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.selectedMenuList.length == 0){
      this.toastr.warning("please select menu","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
   
    let menuIds = CommonFunction.createCommaSeprate(this.selectedMenuList);

    let jsonData = {
      roleName : this.roleName,
      menuId : menuIds,
    }
    //console.log(JSON.stringify(jsonData))
    this.spinner.show();
    this.sharedService.submitDataByInsertType(jsonData,"role")
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.roleName = "";
        this.selectedMenuList = [];
        this.getAllRoleList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitMappingData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  actionOnRole(event){
    let isConfirm = confirm("Do you want to delete this role?");
    if(isConfirm){
      let roleId = event.data.roleId;
      let jsonData = {
        "roleId" : roleId
      }
      this.spinner.show();
      this.sharedService.actionOnDataByUpdateType(jsonData,'roleDelete')
      .subscribe((response) =>{
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
          this.getAllRoleList();
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

  closeModal(){
    if(!this.isDoAnyChange){
      let isConfirm = confirm("Do you want to close?");
      if(isConfirm){
        $("#editRoleModal").modal("hide");
      }
    }
    else{
      $("#editRoleModal").modal("hide");
    }
  }

  editableSelectedMenuList = [];
  isDoAnyChange : boolean = true;
  editableRoleId = "";
  editRole(event){
    this.isDoAnyChange = true;
    this.editableSelectedMenuList = [];
    this.editableRoleId = event.data.roleId;
    let menuIdStr = event.data.menuId;
    let menuListArr = menuIdStr.split(",");
    for(let i=0;i<this.menuList.length;i++){
      let loopMenuId = this.menuList[i].paramCode;
      let indexOf = menuListArr.indexOf(loopMenuId);
      if(indexOf >= 0){
        this.editableSelectedMenuList.push(this.menuList[i]);
      }
    }

    $("#editRoleModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  editRoleData(){
    let isConfirm = confirm("Are you sure want to change this?");
    if(isConfirm){
      let newEditableMenuId = CommonFunction.createCommaSeprate(this.editableSelectedMenuList);
      let jsonData = {
        "roleId" : this.editableRoleId,
        "menuId" : newEditableMenuId
      }
      this.spinner.show();
      this.sharedService.actionOnDataByUpdateType(jsonData,'roleUpdate')
      .subscribe((response) =>{
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
          this.getAllRoleList();
        }
        else{
          this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        }
        this.spinner.hide();
        
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("submitAssignData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      });

      $("#editRoleModal").modal("hide");
    }
  }

  

}
