import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  msg: any;

  comment = new FormControl;
  rating = new FormControl;


  patentDetail: any;
  doctorDetail: any;




  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.patentDetail = this.authService.getProfile()
    this.doctorDetail = this.authService.getApprovedAppointmentData();
    console.log(this.doctorDetail)
  }


  commentfunc() {

    const feedbackDetail = {
      comment: this.comment.value,
      rate: this.rating.value,
      patientId: this.patentDetail.details._id,
      doctorId: this.doctorDetail.doctorId
    }
    console.log(feedbackDetail)
    this.authService.sendFeedback(feedbackDetail).subscribe(res => {
      (this.msg = res.message)
      console.log(res)
    })



  }





}
