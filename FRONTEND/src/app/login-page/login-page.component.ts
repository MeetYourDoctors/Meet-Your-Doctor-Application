import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms'
import{AuthService} from '../service/auth.service'
import{Router} from '@angular/router'





@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  email = new FormControl;
  password = new FormControl;


  userProfile: any;

  isLoginError: boolean = false;
  public msg = [];


  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }
  alert: boolean = false
  ngOnInit(): void {

  }

  register() {

    const user = {
      email: this.email.value,
      password: this.password.value,


    };
    console.log(user)

    this.authService.loginUser(user).subscribe(res => {

      this.userProfile = res,
        console.log(this.userProfile),
        (this.msg = res.message)
      if (res.state) {
        this.authService.sendProfile(this.userProfile)
        this.router.navigate(['/profile'])
        this.alert = false;

      } else {
        this.alert = true

      }
    });




  }
}
