import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './layout/dashbord/dashbord.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import { SharedService } from './shared/service/SharedService';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonPageComponent } from './common-page/common-page.component';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OnlyNumber } from './shared/validations/OnlyNumber';
import { GraphDashbordComponent } from './layout/graph-dashbord/graph-dashbord.component';
import { GraphService } from './shared/service/GraphService';
import { LengthValidater } from './shared/validations/LengthValidater';
import { DeviceComponent } from './device/device.component';
import { EmployeeComponent } from './employee/employee.component';
import { LocationComponent } from './location/location.component';
import { MappingComponent } from './mapping/mapping.component';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { AssignComponent } from './assign/assign.component';
import { ActivityComponent } from './activity/activity.component';
import { InputTypeComponent } from './input-type/input-type.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { RoleComponent } from './role/role.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashbordComponent,
    PageNotFoundComponent,
    CommonPageComponent,
    OnlyNumber,
    LengthValidater,
    GraphDashbordComponent,
    DeviceComponent,
    EmployeeComponent,
    LocationComponent,
    MappingComponent,
    CheckpointComponent,
    AssignComponent,
    ActivityComponent,
    InputTypeComponent,
    ChecklistComponent,
    RoleComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBRHoDj-z_mh59rKgkXo6_P9eU2KOGoeM' 
    })
  ],
  providers: [AuthGuard,SharedService,GraphService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
