import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../app.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RightComponent } from '../right/right.component';
import { ProfileComponent } from '../profile/profile.component';
import { SheduleComponent } from '../shedule/shedule.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from '../leave/leave.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { LeavesComponent } from '../leaves/leaves.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RightComponent,
    ProfileComponent,
    SheduleComponent,
    LoginPageComponent,
    SignUpComponent,
    LeaveComponent,
    TopNavComponent,
    LeavesComponent,
   
  ],
  imports: [
  CommonModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
