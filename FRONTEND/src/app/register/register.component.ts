import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms'
import{AuthService} from '../service/auth.service'
import{Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = new FormControl;
  id = new FormControl;
  channelingCentre = new FormControl;
  province = new FormControl;
  district = new FormControl;
  hospital = new FormControl;
  nursingHome = new FormControl;
  qualifications = new FormControl;
  specialities = new FormControl;
  contactNumbers = new FormControl;
  workingHours = new FormControl;
  workingDays = new FormControl;
  email = new FormControl;
  password = new FormControl;

  public msg = [];

  constructor(
    public authService: AuthService,
    private router: Router

  ) { }
  alert: boolean = false
  ngOnInit(): void {

  }

  register() {

    const addDoctor = {
      name: this.name.value,
      id: this.id.value,
      channelingCentre: this.channelingCentre.value,
      address: {
        province: this.province.value,
        district: this.province.value
      },
      hospital: this.hospital.value,
      nursingHome: this.nursingHome.value,
      qualifications: this.qualifications.value,
      specialities: this.specialities.value,
      contactNumber: this.contactNumbers.value,
      email: this.email.value,
      password: this.password.value,
      image: "",
      workingHours: this.workingHours.value,
      workingDays: this.workingDays.value



    };
    console.log(addDoctor)
    this.authService.registerDoc(addDoctor).subscribe(res => {
      (this.msg = res.message)
      console.log(res)
      if (res.state) {

        this.router.navigate(['/login'])
        this.alert = false;

      } else {
        this.alert = true

      }
    })

  }

}
