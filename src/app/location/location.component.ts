import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/service/SharedService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../shared/constant/Contant';
import { LocationTableSetting } from '../shared/tableSettings/LocationTableSetting';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  alertFadeoutTime = 0;
  geoInfo = "* If manual enter Geo-coordinate, please press `Enter` key..";
  isShowMap : boolean = true;
  locationName = "";
  latitude = "";
  longitude = "";
  geoCoordinate = "";
  locationList = [];
  locationTableSettings = LocationTableSetting.setting;
  tenentId = "";
  loginEmpId = "";
  loginEmpRole = "";
  button = "";
  color1 = "";
  color2 = "";
  address = "";
  zoom = 12;
  lat = 28.6490059;
  lng = 77.3668853;
  editLat = 28.6490059;
  editLng = 77.3668853;
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
    this.getAllLocationList();
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
      $(".location_GeoCoordinate").attr("title","Click me to show ? details.");
      $(".location_GeoCoordinate").click(function(){
        $("#locationInfoModal").modal({
          backdrop : 'static',
          keyboard : false
        });
      })
    }, 100);
    //this.updateRouterSequence();
  }

  closeModal(){
    $("#locationInfoModal").modal("hide");
  }
  onChooseLocation(event,id){
    // console.log(event)
    let lat = event.coords.lat;
    let lng = event.coords.lng;
    if(id==1){
      this.geoCoordinate = lat+","+lng;
      this.lat = lat; this.lng = lng;
      this.getAddressByLatLong(this.geoCoordinate);
    }
    else {
      this.editableGeoCoordinate = lat+","+lng;
      this.editLat = lat; this.editLng = lng;
      this.getAddressByLatLong(this.editableGeoCoordinate);
    }

  }
  getAddressByLatLong(latLong:string){
    this.sharedService.getAddressByLatLong(latLong)
    .subscribe((response) =>{
      // console.log(response);
      this.address = response.results[0].formatted_address;
      // console.log(this.address)
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAddressByLatLong"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
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
  getAllLocationList(){
    this.locationList = [];
    let jsonData = {
      "loginEmpId" : this.loginEmpId,
      "loginEmpRole" : this.loginEmpRole,
      "tenentId" : this.tenentId
    }
    this.spinner.show();
    this.sharedService.getAllLocationList(jsonData)
    .subscribe((response) =>{
      // console.log(response);
      this.locationList = response.locationList;
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitAssignData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  submitLocData(){
    if(this.locationName == ""){
      this.toastr.warning("please enter location name","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.geoCoordinate == ""){
      this.toastr.warning("please enter geoCoordinate value ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.address == ""){
      this.toastr.warning(this.geoInfo,"Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    // else if(this.latitude == ""){
    //   this.toastr.warning("please enter latitude","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    // else if(this.longitude == ""){
    //   this.toastr.warning("please enter longitude","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    // this.latitude = this.geoCoordinate.split(",")[0];
    // this.longitude = this.geoCoordinate.split(",")[1];
    let jsonData = {
      locationName : this.locationName,
      // latitude : this.latitude,
      // longitude : this.longitude
      geoCoordinate : this.geoCoordinate,
      address : this.address,
      tenentId : this.tenentId
    }
    //console.log(JSON.stringify(jsonData));
    this.spinner.show();
    this.sharedService.submitLocationData(jsonData)
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.setDefaultToField();
        this.getAllLocationList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submit location data"),"Alert !",{timeOut : this.alertFadeoutTime});
    });

  }

  searchLocation(id){
    // alert("dd");
    if(id == 1){
      this.lat = parseFloat(this.geoCoordinate.split(",")[0]);
      this.lng = parseFloat(this.geoCoordinate.split(",")[1]);
      this.getAddressByLatLong(this.geoCoordinate);
    }
    else{
      this.editLat = parseFloat(this.editableGeoCoordinate.split(",")[0]);
      this.editLng = parseFloat(this.editableGeoCoordinate.split(",")[1]);
      this.getAddressByLatLong(this.editableGeoCoordinate);
    }
    
  }

  setDefaultToField(){
    // this.isShowMap = false;
    this.locationName = "";
    this.latitude = "";
    this.longitude = "";
    this.geoCoordinate = "";
    this.address = "";
    this.lat = 28.6490059;
    this.lng = 77.3668853;
  }

  goToMap(){
    // window.open("https://www.google.co.in/maps","_blank");
    this.isShowMap = !this.isShowMap;
  }

  onCustomAction(event) {
    switch ( event.action) {
    //   case 'activerecord':
    //     this.actionOnEmployee(event,1);
    //     break;
    //  case 'deactiverecord':
    //     this.actionOnEmployee(event,0);
    //     break;
      case 'editrecord':
        this.editLocation(event);
        break;
    }
  }

  closeEditModal(){
    if(!this.isDoAnyChange){
      let isConfirm = confirm("Do you want to close?");
      if(isConfirm){
        $("#editLocationModal").modal("hide");
      }
    }
    else{
      $("#editLocationModal").modal("hide");
    }
  }

  isDoAnyChange : boolean = true;
  editableLocationName = "";
  editableGeoCoordinate = "";
  editableLocationId = "";
  editLocation(event){
    this.isDoAnyChange = true;
    this.editableLocationId = event.data.locId;
    this.editableLocationName = event.data.locName;
    this.editableGeoCoordinate = event.data.geoCoordinate;
    this.address = event.data.address;
    this.editLat = parseFloat(this.editableGeoCoordinate.split(",")[0])
    this.editLng = parseFloat(this.editableGeoCoordinate.split(",")[1])

    $("#editLocationModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  editLocationData(){
    if(this.address == null || this.address == ""){
      this.toastr.warning(this.geoInfo,"Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    let jsonData = {
      locationId : this.editableLocationId,
      locationName : this.editableLocationName,
      geoCoordinate : this.editableGeoCoordinate,
      address : this.address
    }
    // console.log(JSON.stringify(jsonData));
    
    this.spinner.show();
    this.sharedService.actionOnDataByUpdateType(jsonData,'updateLocation')
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.setDefaultToField();
        this.getAllLocationList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.spinner.hide();
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submit location data"),"Alert !",{timeOut : this.alertFadeoutTime});
    });

    $("#editLocationModal").modal("hide");
  }

}
