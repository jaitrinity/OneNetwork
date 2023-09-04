import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
// import { DashbordComponent } from './layout/dashbord/dashbord.component';
import { CommonPageComponent } from './common-page/common-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { GraphDashbordComponent } from './layout/graph-dashbord/graph-dashbord.component';
import { DeviceComponent } from './device/device.component';
import { EmployeeComponent } from './employee/employee.component';
import { LocationComponent } from './location/location.component';
import { MappingComponent } from './mapping/mapping.component';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { AssignComponent } from './assign/assign.component';
import { ActivityComponent } from './activity/activity.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { InputTypeComponent } from './input-type/input-type.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {path : '' ,  redirectTo: '/login', pathMatch: 'full'},
  {path : 'login', component :LoginComponent},
  {path : 'layout', component :LayoutComponent,  canActivate: [AuthGuard],
  children: [
    {path: '', redirectTo: 'm5', pathMatch: 'full'},
    // { path: 'dashboard', component: GraphDashbordComponent },
    { path: 'menu-submenu/:menuId', component: CommonPageComponent },
    // { path: '_page', component: CommonPageComponent },
    // { path: 'menu-submenu-1', component: CommonPageComponent },
    // { path: 'menu-submenu-2', component: CommonPageComponent },
    // { path: 'menu-submenu-3', component: CommonPageComponent },
    // { path: 'menu-submenu-4', component: CommonPageComponent },
    // { path: 'menu-submenu-5', component: CommonPageComponent },
    // { path: 'menu-submenu-6', component: CommonPageComponent },
    // { path: 'menu-submenu-7', component: CommonPageComponent },
    // { path: 'menu-submenu-8', component: CommonPageComponent },
    // { path: 'menu-submenu-9', component: CommonPageComponent },
    // { path: 'menu-submenu-10', component: CommonPageComponent },
    // { path: 'menu-submenu-11', component: CommonPageComponent },
    // { path: 'menu-submenu-12', component: CommonPageComponent },
    // { path: 'menu-submenu-13', component: CommonPageComponent },
    // { path: 'menu-submenu-14', component: CommonPageComponent },
    // { path: 'menu-submenu-15', component: CommonPageComponent },
    { path: 'm1', component: DeviceComponent },
    { path: 'm2', component: EmployeeComponent },
    { path: 'm3', component: LocationComponent },
    { path: 'm4', component: MappingComponent },
    { path: 'm5', component: CheckpointComponent },
    { path: 'm6', component: AssignComponent },
    { path: 'm7', component: ActivityComponent },
    { path: 'm8', component: ChecklistComponent },
    { path: 'm9', component: InputTypeComponent },
    { path: 'm10', component: RoleComponent },
    { path: '**', component: PageNotFoundComponent }
    // { path: 'tnd-create-training', component: CreateTrainingComponent },
    // { path: 'tnd-assign-training', component: AssignTrainingComponent },
    // { path: 'tnd-ticket-status', component: TicketStatusComponent },
    // { path: 'tnd-incident-training', component: IncidentTrainingComponent },
    // { path: 'tnd-group-training', component: GroupTrainingComponent },
    // { path: 'tnd-assign-group-training', component: AssignGroupTrainingComponent },
    // { path: 'tnd-planned-training', component: PlannedTrainingComponent },
    // { path: 'tnd-training-history', component: TrainingHistoryComponent },
    // { path: 'tnd-group-incident-training', component: GroupIncidentTrainingComponent },
    // { path: 'tnd-group-planned-training', component: GroupPlannedTrainingComponent },
    // { path: 'tnd-notification', component: NotificationComponent },
    // { path: 'tnd-offline-training', component: OfflineTrainingComponent }
  ]},
  //{ path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
