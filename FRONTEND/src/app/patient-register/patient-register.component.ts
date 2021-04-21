import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms'
import{AuthService} from '../service/auth.service'
import{Router} from '@angular/router'


@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit {

  name = new FormControl;
  id = new FormControl;
  address = new FormControl;
  locations = new FormControl;
  contactNumbers = new FormControl;
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

    const addPatient = {
      name: this.name.value,
      id: this.id.value,
      address: this.address.value,
      locations: this.locations.value,
      contactNumber: this.contactNumbers.value,
      email: this.email.value,
      password: this.password.value,
      image: ""



    };

    this.authService.registerPatient(addPatient).subscribe(res => {
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
