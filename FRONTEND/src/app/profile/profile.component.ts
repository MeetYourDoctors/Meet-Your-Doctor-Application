import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import{AuthService} from '../service/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  msg: any;

  user: any;

  getmyappointment: any;

  getapprove: boolean = true;

  isDoctor: boolean = false;

  feedbacks: any;




  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.user = this.authService.getProfile()

    if (this.user.details.specialities) {
      this.isDoctor = true
      console.log(this.isDoctor + "_doctor")
    }

    console.log(this.user)



    const userId = {
      _id: this.user.details._id
    }

    if (this.isDoctor) {
      this.authService.getMyAppointmentDetailsDoc(userId).subscribe(res => {
        this.getmyappointment = res.details,
          this.getapprove = res.details.approve
        console.log(res)
      })


      this.authService.getDocFeedBacks(userId).subscribe(res => {
        this.feedbacks = res
        this.msg = res.message
      })

    } else {

      this.authService.getMyAppointmentDetailsPatent(userId).subscribe(res => {
        this.getmyappointment = res.details,
          this.getapprove = res.details.approve
        console.log(res)
      })


    }



  }







  logout() {
    this.router.navigate(['/'])
    this.authService.logout()

  }



  clickApprove(clickedapprovedId: any) {


    const appointmentId = {
      _id: clickedapprovedId._id
    }


    this.authService.toApproveAppointment(appointmentId).subscribe(res => {
      this.msg = res.message,
        console.log(res)
    })


  }


  deleteAcc(user_id: any) {
    console.log(user_id)
    const myId = {
      _id: user_id
    }


    if (this.isDoctor) {
      this.authService.deleteMyAccDoc(myId).subscribe(res => {
        this.msg = "Account " + res.message,
          console.log(res)
      })

    } else {
      this.authService.deleteMyAccPatient(myId).subscribe(res => {
        this.msg = "Account " + res.message,
          console.log(res)
      })
    }


  }





  sendApprovedAppoinment(appointmentData: any) {

    this.authService.sendApprovedAppointmentData(appointmentData)

  }




  deleteAppointment(appointmentId: any) {

    this.authService.deleteAppointment(appointmentId).subscribe(res => {
      this.msg = res.message,
        console.log(res)
    })

  }







}

  

