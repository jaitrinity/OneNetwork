import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/service/SharedService';
import { Constant } from '../shared/constant/Contant';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrasanctionHdrTableSetting } from '../shared/tableSettings/TrasanctionHdrTableSetting';
import { TrasanctionDetTableSetting } from '../shared/tableSettings/TrasanctionDetTableSetting';
import { CommonFunction } from '../shared/service/CommonFunction';
declare var $: any;

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.css']
})
export class CommonPageComponent implements OnInit {
  isDoAnyChange : boolean = false;
  filterEmployeeId = "";
  filterTransactionId = "";
  filterStartDate = "";
  filterEndDate = "";
  categoryName = "";
  public href: string = "";
  menuId : any;
  transactionHdrList = [];
  categoryList = [];
  selectedCategoryList = [];
  subcategoryList = [];
  selectedSubcategoryList = [];
  captionList = [];
  selectedCaptionList = [];
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  blankTableSettings :any = {};
  transactionHdrSettings = TrasanctionHdrTableSetting.setting;
  newSetting = TrasanctionHdrTableSetting.setting;
  transactionDetSettings = TrasanctionDetTableSetting.setting;
  loginEmpId : any = "";
  loginEmpRole : any = "";
  button = "";
  color1 = "";
  color2 = "";
  constructor(private route: ActivatedRoute,private router : Router,
    private sharedService : SharedService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("empRoleId");
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
      allowSearchFilter: true,
      closeDropDownOnSelection : true
    };
    setTimeout(() => {
      $("ng2-smart-table thead, .myTable thead").css('background-color',this.color1);
    }, 100);

    this.route.paramMap.subscribe(params => {
      // this.transactionHdrSettings = Object.assign({}, this.blankTableSettings);
      this.transactionHdrSettings = Object.assign({}, TrasanctionHdrTableSetting.setting);
      this.subcategoryList = [];
      this.selectedSubcategoryList = [];
      this.captionList = [];
      this.selectedCaptionList = [];
      this.filterStartDate = "";
      this.filterEndDate = "";
      this.transactionHdrList = [];
      this.menuId = params.get('menuId');
      this.categoryName = localStorage.getItem(this.menuId);
      this.getCategorySubcategoryByRole();
    });
    // console.log(this.menuId);
    //alert(this.loginEmpId)
    //this.href = this.router.url;
    // console.log(this.href);
    //let lastIndex = this.href.lastIndexOf("-");
    //this.menuId = this.href.substring(lastIndex+1,this.href.length);
    //this.categoryName = localStorage.getItem(this.menuId);
    //this.getMenuNameByMenuId();
    //this.getCategorySubcategoryByRole();
    //this.getMenuTrasactions();
  }

  reloadPage(){
    alert("Hello");
  }

  onSelectOrDeselectCategory(item: any) {
    //this.selectedSubcategoryList = [];
    //this.subcategoryList = this.createSubcategoryList();
  }

  onSelectAllOrDeselectAllCategory(item: any) {
    this.selectedCategoryList = item;
    //this.frequencyUserByOpco = this.createCommaSeprate(this.selectedOpcoFrequencyList);
  }

  onSelectOrDeselectSubcategory(item: any) {
    //this.frequencyUserByOpco = this.createCommaSeprate(this.selectedOpcoFrequencyList);
    this.createCaptionList();
  }

  onSelectAllOrDeselectAllSubcategory(item: any) {
    this.selectedSubcategoryList = item;
    //this.frequencyUserByOpco = this.createCommaSeprate(this.selectedOpcoFrequencyList);
  }

  // createCommaSeprate(listData : any){
  //   let commSeprateValue = "";
  //   for(let i=0;i<listData.length;i++){
  //     commSeprateValue += listData[i].paramCode;
  //     if(i != listData.length-1){
  //       commSeprateValue += ",";
  //     }
  //   }
  //   return commSeprateValue;
  // }

  // createSubcategoryList() : any {
  //   this.subcategoryList = [];
  //   //console.log(this.selectedCategoryList);
  //   //console.log(this.allSubcategoryList);
  //   this.menuId = this.selectedCategoryList[0].menuId;
  //   let selectedCategory = this.selectedCategoryList[0].paramCode;
  //   for(let i=0;i<this.allSubcategoryList.length;i++){
  //     if(this.allSubcategoryList[i].paramCode == selectedCategory){
  //       let json = {
  //         paramCode : this.allSubcategoryList[i].paramDesc,
  //         paramDesc : this.allSubcategoryList[i].paramDesc+" "
  //       }
  //       this.subcategoryList.push(json);  
  //     }
  //   }
  //   return this.subcategoryList;
  // }

  level : any = 1;
  getCategorySubcategoryByRole(){
    let jsonData = {
      loginEmpRole : this.loginEmpRole,
      categoryName : this.categoryName
    }
    this.spinner.show();
    this.sharedService.getCategorySubcategoryByRole(jsonData)
    .subscribe((response) =>{
      //console.log(response);
      this.level = response.count;
      //console.log(this.level)
      if(this.level == 2 || this.level == 3){
        this.subcategoryList = response.wrappedList;
      }
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    });

  }

  createCaptionList(){
    if(this.level == 1 || this.level == 2){
      return ;
    }
    if(this.selectedSubcategoryList.length == 0){
      return ;
    }
    this.captionList = [];
    this.selectedCaptionList = [];
    let subCatName = CommonFunction.createCommaSeprateByParamDesc(this.selectedSubcategoryList);

    let jsonData = {
      loginEmpRole : this.loginEmpRole,
      categoryName : this.categoryName,
      subCategoryName : subCatName
    }
    //console.log(JSON.stringify(jsonData));
    this.spinner.show();
    this.sharedService.getAllListBySelectType(jsonData,"caption")
    .subscribe((response) =>{
      // console.log(response);
      this.captionList = response.captionList;
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("createCaptionList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    });
  }

  getMenuNameByMenuId(){
    //this.submenuName = localStorage.getItem(this.menuId);
    //console.log(this.submenuName);
    //if(this.submenuName != null && this.submenuName != ""){
      //return ;
    //}
    let json = {
      menuId : this.menuId
    }
    this.sharedService.getMenuNameByMenuId(json)
    .subscribe((response) =>{
      //console.log(response);
      //this.submenuName = response.wrappedList[0];
      //localStorage.setItem(this.menuId,this.submenuName);
      this.spinner.hide();
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getMenuNameByMenuId"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    });
  }
  getMenuTrasactions(){
    if((this.level == 2 || this.level == 3) && this.selectedSubcategoryList.length == 0){
      alert("select atleast one sub category");
      return;
    }
    else if(this.level == 3 && this.selectedCaptionList.length == 0){
      alert("select atleast one caption");
      return;
    }
    // this.transactionHdrSettings = Object.assign({}, this.blankTableSettings);
    // this.transactionHdrSettings = Object.assign({}, TrasanctionHdrTableSetting.setting);
    
    let subCatMenuIds = CommonFunction.createCommaSeprate(this.selectedSubcategoryList);
    let captionMenuIds = CommonFunction.createCommaSeprate(this.selectedCaptionList);
    this.transactionHdrList = [];
    this.spinner.show();
    let json = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      menuId : this.menuId,
      subCatMenuId : subCatMenuIds,
      captionMenuId : captionMenuIds,
      filterEmployeeId : this.filterEmployeeId,
      filterTransactionId : this.filterTransactionId,
      filterStartDate : this.filterStartDate,
      filterEndDate : this.filterEndDate,
      level : this.level
    }
    this.sharedService.getMenuTrasactions(json)
    .subscribe((response) =>{
      // console.log(JSON.stringify(response));
      this.transactionHdrList = response.wrappedList;
      // for(let i=0;i<this.transactionHdrList.length;i++){
      //   let topFirstKey = this.transactionHdrList[i].topFirstKey;
      //   let topSecondKey = this.transactionHdrList[i].topSecondKey;
      //   let topThirdKey = this.transactionHdrList[i].topThirdKey;

      //   let topFirstCheckpointDesc = this.transactionHdrList[i].topFirstCheckpointDesc;
      //   let topSecondCheckpointDesc = this.transactionHdrList[i].topSecondCheckpointDesc;
      //   let topThirdCheckpointDesc = this.transactionHdrList[i].topThirdCheckpointDesc;
      //   if(topFirstCheckpointDesc != ""){
      //     this.newSetting.columns[topFirstKey] = {title : topFirstCheckpointDesc,width : '138px'};
      //   }
      //   if(topSecondCheckpointDesc != ""){
      //     this.newSetting.columns[topSecondKey] = {title : topSecondCheckpointDesc,width : '138px'};
      //   }
      //   if(topThirdCheckpointDesc != ""){
      //     this.newSetting.columns[topThirdKey] = {title : topThirdCheckpointDesc,width : '138px'};
      //   }

      //   this.transactionHdrSettings = Object.assign({},this.newSetting);        
      // }
      
      if(this.transactionHdrList.length == 0){
        this.toastr.info("No record found","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
      this.spinner.hide();
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getMenuTrasactions"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    });
  }

  isVerifyRequired : boolean = false;
  isApprovalRequired : boolean = false;
  transactionId : any = "";
  viewMenuId : any = "";
  viewLocationId : any = "";
  viewVerifiedDate : any = "";
  viewVerifiedBy : any = "";
  viewApprovedDate : any = "";
  viewApprovedBy : any = "";
  transactionDetList = [];
  actionCheckpointList = [];
  verifyDetList = [];
  approveDetList = [];
  transactionStatus = "";
  myRoleForTask = "";
  viewDetails(event){
    this.isDoAnyChange = false;
    this.isVerifyRequired = false;
    this.isApprovalRequired = false;
    this.myRoleForTask = "";
    this.transactionStatus = "";
    this.transactionDetList = [];
    this.actionCheckpointList = [];
    this.verifyDetList = [];
    this.approveDetList = [];
    this.transactionId = event.data.transactionId;
    this.viewMenuId = event.data.menuId;
    let verifierTId = event.data.verifierTId;
    let approvedTId = event.data.approvedTId;
    this.transactionStatus = event.data.status;
    this.myRoleForTask = event.data.myRoleForTask;
    this.viewVerifiedDate = event.data.verifiedDate;
    this.viewVerifiedBy = event.data.verifiedBy;
    this.viewApprovedDate = event.data.approvedDate;
    this.viewApprovedBy = event.data.approvedBy;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      menuId : this.viewMenuId,
      transactionId : this.transactionId,
      verifierTId : verifierTId,
      approvedTId : approvedTId,
      status : this.transactionStatus
    }
    this.spinner.show();
    this.sharedService.getMenuTrasactionsDet(jsonData)
    .subscribe((response) =>{
      // console.log(JSON.stringify(response));
      this.transactionDetList = response.wrappedList[0].transactionDetList; 
      this.actionCheckpointList = response.wrappedList[0].actionCheckpointList; 
      this.verifyDetList = response.wrappedList[0].verifyDetList; 
      this.approveDetList = response.wrappedList[0].approveDetList; 
      this.viewLocationId = response.wrappedList[0].locationId; 

      for(let i=0;i<this.transactionDetList.length;i++){
        let forVerifier = this.transactionDetList[i].forVerifier;
        let forApprover = this.transactionDetList[i].forApprover;
        if(forVerifier == "Yes"){
          this.isVerifyRequired = true;
        }
        if(forApprover == "Yes"){
          this.isApprovalRequired = true;
        }
      }
      $("#viewDetailsModal").modal({
        backdrop : 'static',
        keyboard : false
      });
      setTimeout(() => {
        $("ng2-smart-table thead, .myTable thead").css('background-color',this.color1);
      }, 100);
      this.spinner.hide();
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("transactionDetList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    });

    // for(let i=0;this.transactionHdrList.length;i++){
    //   let transactionId = this.transactionHdrList[i].transactionId;
    //   let primaryAppRole = this.transactionHdrList[i].primaryAppRole;
    //   let secondaryAppRole = this.transactionHdrList[i].secondaryAppRole;
    //   if(this.transactionId == transactionId){
    //     if(primaryAppRole == this.loginEmpRole){
    //       this.isApprovalRequired = true;
    //     }
    //     if(secondaryAppRole == this.loginEmpRole){
    //       this.isApprovalRequired = true;
    //     }
    //     this.transactionDetList = this.transactionHdrList[i].transactionDetList;
    //     $("#viewDetailsModal").modal({
    //       backdrop : 'static',
    //       keyboard : false
    //     });
    //     return;
    //   }
    // }
  }

  validatedData = [];
  validateChangeStatus() : any{
    this.validatedData = [];
    for(var i=0;i<this.actionCheckpointList.length;i++){
      var typeId = this.actionCheckpointList[i].typeId;
      var checkpointId = this.actionCheckpointList[i].checkpointId;
      if(typeId == 1 || typeId == 2 || typeId == 3 || typeId == 7){
        var textObj = $("#action-"+checkpointId);
        if(textObj.val().trim()!=""){
          let filledJson = {
            checkpointId : checkpointId,
            checkpointValue : textObj.val().trim(),
            typeId : typeId,
            dependChpId : 0
          }
          this.validatedData.push(filledJson);
        }
        else{
          alert("please enter "+checkpointId+" value ");
          return false;
        }
      }
      else if(typeId == 10){
        var textObj = $("#action-"+checkpointId);
        if(textObj.val().trim()!=""){
          let filledJson = {
            checkpointId : checkpointId,
            checkpointValue : textObj.val().trim(),
            typeId : typeId,
            dependChpId : 0
          }
          this.validatedData.push(filledJson);
        }
        else{
          alert("please select "+checkpointId+" option ");
          return false;
        }
      }
      else if(typeId == 4){
        let isChecked = false;
        let answer = "";
        $(".action-"+checkpointId).each(function(){
          if($(this).prop("checked")){
            answer = $(this).val();
            isChecked = true;
          }
        });

        if(isChecked){
          let filledJson = {
            checkpointId : checkpointId,
            checkpointValue : answer,
            typeId : typeId,
            dependChpId : 0
          }
          this.validatedData.push(filledJson);
        }
        else{
          alert("please select atlease one option of "+checkpointId);
          return false;
        }
      }
      else if(typeId == 5 || typeId == 6){
        var textObj = $("#hidden-"+checkpointId);
        if(textObj.val().trim()!=""){
          let filledJson = {
            checkpointId : checkpointId,
            checkpointValue : textObj.val().trim(),
            typeId : typeId,
            dependChpId : 0
          }
          this.validatedData.push(filledJson);
        }
        else{
          alert("please brower an image in "+checkpointId);
          return false;
        }
        
      }
      else if(typeId == 12){
        var textObj = $("#hidden-"+checkpointId);
        if(textObj.val().trim()!=""){
          let filledJson = {
            checkpointId : checkpointId,
            checkpointValue : textObj.val().trim(),
            typeId : typeId,
            dependChpId : 0
          }
          this.validatedData.push(filledJson);
        }
        else{
          alert("please brower a video in "+checkpointId);
          return false;
        }
        
      }
      
    }
    return true;
  }

  remark : any = "";
  changeTransactionStatus(status){
    if(!this.validateChangeStatus()){
      return false;
    }

    for(let i=0;i<$(".dependentQues:visible").length;i++){
      let obj = $(".dependentQues:visible")[i];
      let typeId = $(obj).attr("typeId");
      let checkpointId = $(obj).attr("checkpointId");
      let dependChpId = $(obj).attr("dependChpId");
      // alert($(this +" input[type='text']").val());
      let v = $(obj).children("input[type='text']").val();
      if(v == undefined) v = $(obj).children("select").val();
      // alert(v);

      let filledJson = {
        checkpointId : checkpointId,
        checkpointValue : v,
        typeId : typeId,
        dependChpId : dependChpId
      }
      this.validatedData.push(filledJson);

    }

    // console.log(JSON.stringify(this.validatedData));
    // if(this.remark == ""){
    //   alert("please enter remark");
    //   return;
    // }
    this.spinner.show();
    let json = {
      "loginEmpId" : this.loginEmpId,
      "loginEmpRole" : this.loginEmpRole,
      "transactionId" : this.transactionId,
      "menuId" : this.viewMenuId,
      "locationId" : this.viewLocationId,
      // "remark" : this.remark,
      "status" : status,
      "validatedDataList" : this.validatedData
    }
    // console.log(JSON.stringify(json));
    this.sharedService.changeTransactionStatus(json)
    .subscribe((response) =>{
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success("Update successfully","Alert",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        $("#viewDetailsModal").modal("hide");
        this.remark = "";
        this.spinner.hide();
        this.getMenuTrasactions();
      }
      else{
        this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.spinner.hide();
      }

    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("changeTransactionStatus"),"Alert",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    });
  }

  closeModal(){
    if(this.isDoAnyChange){
      let isConfirm = confirm("Do you want to close?");
      if(isConfirm){
        $("#viewDetailsModal").modal("hide");
        this.isVerifyRequired = false;
        this.isApprovalRequired = false;
        this.remark = "";
      }
    }
    else{
      $("#viewDetailsModal").modal("hide");
      this.isVerifyRequired = false;
      this.isApprovalRequired = false;
      this.remark = "";
    }
    
  }

  changeListener($event,chkId): void {
    this.readThis($event.target,chkId);
    this.isDoAnyChange = true;
  }

  readThis(inputValue: any,chkId): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      let image = myReader.result;
      $("#hidden-"+chkId).val(image);
    }
    myReader.readAsDataURL(file);
  }

  openMedia(v){
    // alert(v);
    window.open(v);
  }

  showDependent(event, cpId, logicCp,typeId){
    // console.log(event)
    $(".dependentQues_"+cpId).hide();
    let depCp = logicCp.split(":");
    if(typeId == 10){
      let selectedIndex = event.target.selectedIndex;
      let depLogic = depCp[selectedIndex-1].split(",");
      for(let i=0;i<depLogic.length;i++){
        $("#dep_"+cpId+"_"+depLogic[i]).show();
      }
    }
    else if(typeId == 4){
      let checked = event.target.checked;
      let defaultValue = event.target.defaultValue;
      let selectedIndex = 1;
      if(defaultValue == "No") selectedIndex = 2;
      if(checked){
        let depLogic = depCp[selectedIndex-1].split(",");
        for(let i=0;i<depLogic.length;i++){
          $("#dep_"+cpId+"_"+depLogic[i]).show();
        }
      }
    }
    
    

    
    
  }

}
