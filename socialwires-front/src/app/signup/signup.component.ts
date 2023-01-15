import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService, UserSignup } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  nickname:string = "";
  emptyNickname:boolean = false;

  fullname:string = "";
  emptyFullname:boolean = false;

  email:string = "";
  emptyEmail:boolean = false;

  password:string = "";
  emptyPassword:boolean = false;

  repeatPassword:string = "";
  emptyRepeatPassword:boolean = false;

  passwordsMatch:boolean = true;
  
  constructor(private userService:UserService, private router:Router)
  {

  }

  ngOnInit(): void {
    
    if (localStorage.getItem("access_token") && localStorage.getItem("username"))
    {
      this.router.navigate(['messages/create']);
    }

  }

  signup()
  {
    /**
     * Checks that all the fields are filled
     */
    let valid = true;

    this.nickname = this.nickname.trim();
    this.fullname = this.fullname.trim();
    this.email = this.email.trim();
    this.password = this.password.trim();
    this.repeatPassword = this.repeatPassword.trim();

    if (this.nickname == "")
    {
      this.emptyNickname = true;
      valid = false;
    }

    if (this.fullname == "")
    {
      this.emptyFullname = true;
      valid = false;
    }

    if (this.email == "")
    {
      this.emptyEmail = true;
      valid = false;
    }

    if (this.password == "")
    {
      this.emptyPassword = true;
      valid = false;
    }

    if (this.repeatPassword == "")
    {
      this.emptyRepeatPassword = true;
      valid = false;
    }

    if ((this.password != this.repeatPassword) && !this.emptyPassword && !this.emptyRepeatPassword)
    {
      this.passwordsMatch = false;
      valid = false
    }

    if (valid)
    {

      this.userService.signup(this.email, this.nickname, this.password, this.fullname)
      .subscribe(
        {
          complete: () => 
          {
            console.log("complete");
          },
          error: (error) =>
          {
            switch(error.message)
            {
              case "already exists":
                alert("User Already Exists");
                break;

              default:
                alert("Unknown Error: " + error.message);
            }
          },
          next: () =>
          {
            alert("Account created successfully, now you can log in");
            this.router.navigate(['login']);
          }
        }
      );        
      

    }

  }

}
