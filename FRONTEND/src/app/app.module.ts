import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AbotusComponent } from './abotus/abotus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ChannelComponent } from './channel/channel.component';
// import {employee} from '../app/getData'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AbotusComponent,
    RegisterComponent,
    LoginPageComponent,
    PatientRegisterComponent,
    AppointmentComponent,
    FeedbackComponent,
    ChannelComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
