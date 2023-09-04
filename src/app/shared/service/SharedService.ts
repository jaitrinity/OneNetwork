import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';
import { AuthenticateModel } from 'src/app/login/model/authenticateModel';

@Injectable()
export class SharedService{
    private serviceEndPoint;
    private phpServicePoint;
    constructor(private http:Http){
        this.serviceEndPoint = Constant.serverURL;
        this.phpServicePoint = Constant.phpServiceURL;
    }

    public getPortalColor(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=portal_color',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // public appUrl(companyName : string) {
    //     return this.http.get(this.phpServicePoint+'appURL.php?company='+companyName)
    //            .map((response:Response) => response.json())
    //            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    public getAddressByLatLong(latlong : string) {
            return this.http.get(Constant.ADDRESS_URL+'&latlng='+latlong)
                   .map((response:Response) => response.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }

    public authenticate(authModel:AuthenticateModel){
        let bodyString = JSON.stringify(authModel);
        return this.http.post(this.phpServicePoint+'authenticate.php',bodyString)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMenuListByRoleName(jsonData : any){
        return this.http.post(this.phpServicePoint+'getMenuByEmpRole.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMenuTrasactions(jsonData : any){

        return this.http.post(this.phpServicePoint+'getMenuTrasactions.php',jsonData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMenuTrasactionsDet(jsonData : any){
        
        return this.http.post(this.phpServicePoint+'getMenuTrasactionsDet.php',jsonData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public changeTransactionStatus(jsonData : any){
        
        return this.http.post(this.phpServicePoint+'changeTransactionStatus.php',jsonData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // public changeTransactionStatus(jsonData : any){
    //     let headers = new Headers({'Content-Type':'application/json'});
    //     headers.append("Access-Control-Allow-Origin", "*");
    //     let options = new RequestOptions({ headers:headers });
    //     return this.http.post(this.serviceEndPoint+'changeTransactionStatus',jsonData,options)
    //            .map((response:Response) => response.json())
    //            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    public getMenuNameByMenuId(jsonData:  any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getMenuNameByMenuId',jsonData,options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getCategorySubcategoryByRole(jsonData:  any) {
        return this.http.post(this.phpServicePoint+'getCategorySubcategoryByRole.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public sendOTP(jsonData: any) {
               return this.http.post(this.phpServicePoint+'sendOTPtoMobile.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public changePassword(jsonData: any) {
        
        return this.http.post(this.phpServicePoint+'changePassword.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitLocationData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=location',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitEmployeeData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=employee',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllList(tenentId : any) {
        return this.http.get(this.phpServicePoint+'assignToEmp.php?tenentId='+tenentId)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitAssignData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=assign',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitMappingData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=mapping',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitDataByInsertType(jsonData: any,insertType : string) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType='+insertType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitCheckpointData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=checkpoint',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public submitInputTypeData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=inputType',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public submitChecklistData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType=checklist',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getHeaderMenu(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=headerMenu',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllActivities(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=activity',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllAssignData(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=assign',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllEmployeeList(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=employee',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllDeviceList(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=device',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllLocationList(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=location',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllMappingList(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=mapping',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllListBySelectType(jsonData: any, selectType : string) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType='+selectType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllCheckpointList(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=checkpoint',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllCheckpointListArr(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=checkpointListArr',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllInputTypeList(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=inputType',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getAllChecklist(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=checklist',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public actionOnDevice(jsonData: any) {
        return this.http.post(this.phpServicePoint+'updateInTable.php?updateType=device',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public actionOnMapping(jsonData: any,updateType : string) {
        return this.http.post(this.phpServicePoint+'updateInTable.php?updateType='+updateType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public actionOnDataByUpdateType(jsonData: any,updateType : string) {
        return this.http.post(this.phpServicePoint+'updateInTable.php?updateType='+updateType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public actionOnAssign(jsonData: any) {
        return this.http.post(this.phpServicePoint+'updateInTable.php?updateType=assign',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public actionOnEmployee(jsonData: any) {
        return this.http.post(this.phpServicePoint+'updateInTable.php?updateType=employee',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}