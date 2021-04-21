import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// import { Console } from 'node:console';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private http: HttpClient
  ) { }

  registerDoc(addDoctor: any) {

    return this.http.post<any>("http://localhost:8080/doctor/add", addDoctor).pipe(map(res => res));

  }

  registerPatient(addPatient: any) {

    return this.http.post<any>("http://localhost:8080/patient/add", addPatient).pipe(map(res => res));

  }



  loginUser(user: any) {
    return this.http.post<any>("http://localhost:8080/login", user).pipe(map(res => res));
  }

  Data: any
  sendProfile(userProfile: any) {
    this.Data = userProfile
  }
  getProfile() {
    return this.Data;
  }



  logout() {
    this.Data.clear()
  }



  newAppointmentAdd(addPatient: any) {
    return this.http.post<any>("http://localhost:8080/appointment/add", addPatient).pipe(map(res => res));
  }



  search(user: any) {
    return this.http.post<any>("http://localhost:8080/search", user).pipe(map(res => res));
  }




  id: any
  getMyAppointmentDetailsDoc(userId: any) {
    this.id = userId._id
    console.log(this.id)
    return this.http.get<any>("http://localhost:8080/appointment/doctor/" + this.id).pipe(map(res => res));
  }

  id2: any
  getMyAppointmentDetailsPatent(userId: any) {
    this.id2 = userId._id
    return this.http.get<any>("http://localhost:8080/appointment/patient/" + this.id2).pipe(map(res => res));
  }

  id3: any
  toApproveAppointment(appointmentId: any) {
    this.id3 = appointmentId._id
    return this.http.put<any>("http://localhost:8080/appointment/approve/" + this.id3, "").pipe(map(res => res));
  }












  id4: any
  deleteMyAccDoc(myId: any) {
    this.id4 = myId._id
    return this.http.delete<any>("http://localhost:8080/doctor/delete/" + this.id4).pipe(map(res => res));
  }



  id5: any
  deleteMyAccPatient(myId: any) {
    this.id5 = myId._id
    return this.http.delete<any>("http://localhost:8080/patient/delete/" + this.id5).pipe(map(res => res));
  }


  id6: any
  getDocFeedBacks(userId: any) {
    this.id6 = userId._id
    return this.http.get<any>("http://localhost:8080/feedback/getByDoctorId/" + this.id6).pipe(map(res => res))
  }


  sendFeedback(feedbackDetail: any) {
    return this.http.post<any>("http://localhost:8080/feedback/add", feedbackDetail).pipe(map(res => res))
  }




  id7: any
  getPatientChannelings(userId: any) {
    this.id7 = userId._id
    return this.http.get<any>("http://localhost:8080/channeling/patient/" + this.id7).pipe(map(res => res))
  }


  appointmentData: any
  sendApprovedAppointmentData(appointmentData: any) {
    this.appointmentData = appointmentData
  }
  getApprovedAppointmentData() {
    return this.appointmentData
  }



  addChanneling(channel: any) {
    return this.http.post<any>("http://localhost:8080/channeling/add", channel).pipe(map(res => res))
  }


  deleteChannel(channelId: any) {
    return this.http.delete<any>("http://localhost:8080/channeling/delete/" + channelId).pipe(map(res => res))
  }


  deleteAppointment(appointment_id: any) {
    return this.http.delete<any>("http://localhost:8080/appointment/delete/" + appointment_id).pipe(map(res => res))
  }







}
