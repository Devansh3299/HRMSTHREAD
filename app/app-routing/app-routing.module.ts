import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ProfileComponent } from '../profile/profile.component';
import { SheduleComponent } from '../shedule/shedule.component';
import { RightComponent } from '../right/right.component';
import { LeaveComponent } from '../leave/leave.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { LeavesComponent } from '../leaves/leaves.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'right', component: RightComponent },
  { path: 'shedule', component: SheduleComponent },
  {path:'leave', component:LeaveComponent},
  {path:'topnav', component:TopNavComponent},
  {path:'leaves', component:LeavesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
