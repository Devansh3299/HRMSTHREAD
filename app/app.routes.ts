import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { RightComponent } from './right/right.component';
import { ProfileComponent } from './profile/profile.component';
import { SheduleComponent } from './shedule/shedule.component';
import { LeaveComponent } from './leave/leave.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AttendanceApplicationComponent } from './attendance-application/attendance-application.component'; 
import { LeavesComponent } from './leaves/leaves.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpComponent },
  
{ path: 'right', component: RightComponent },
{ path: 'profile', component: ProfileComponent },
{path:'shedule', component: SheduleComponent},
{path:'leave',component:LeaveComponent},
{path:'topnav',component:TopNavComponent},
{path:'attendance-application',component:AttendanceApplicationComponent},
{path:'leaves',component:LeavesComponent},
    ]
 