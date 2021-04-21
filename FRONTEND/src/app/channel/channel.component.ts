import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import{AuthService} from '../service/auth.service'


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  user: any;
  isDoctor: boolean = false;

  msg: any;
  msg2: any;

  approvedAppointmentData: any;

  zoomLink = new FormControl;





  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user = this.authService.getProfile()

    if (this.user.details.specialities) {
      this.isDoctor = true
      console.log(this.isDoctor + "_doctor login")
    } else {
      console.log("patient login")
    }




    if (this.isDoctor) {

      this.approvedAppointmentData = this.authService.getApprovedAppointmentData();
      console.log(this.approvedAppointmentData)

    }
    else {

      const userId = {
        _id: this.user.details._id
      }

      this.authService.getPatientChannelings(userId).subscribe(res => {
        this.approvedAppointmentData = res.details
        this.msg = res.message
        console.log(res)
      })


    }


  }




  sendMeetingLink() {

    const channel = {
      appointmentId: this.approvedAppointmentData._id,
      approve: this.approvedAppointmentData.approve,
      zoomLink: this.zoomLink.value,
      patientId: this.approvedAppointmentData.patientId,
      doctorId: this.user.details._id
    }
    console.log(channel)

    this.authService.addChanneling(channel).subscribe(res => {
      console.log(res)
      this.msg = res.message
    })

  }


  Delete(Ids: any) {

    this.authService.deleteChannel(Ids.channelId).subscribe(res => {
      console.log(res)
      this.msg = res.message
    })

    this.authService.deleteAppointment(Ids.appointmentId).subscribe(res => {
      this.msg2 = res.message,
        console.log(res)
    })

  }






}
