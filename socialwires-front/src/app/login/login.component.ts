import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  username:string = "";
  emptyUsername:boolean = false;
  
  password:string = "";
  emptyPassword:boolean = false;

  constructor(private userService:UserService, private router:Router)
  {

  }

  ngOnInit(): void {
    
    if (localStorage.getItem("access_token") && localStorage.getItem("username"))
    {
      this.router.navigate(['messages/create']);
    }

  }

  setSession(result: any)
  {
    localStorage.setItem('access_token', result.access_token);
    localStorage.setItem('expires_in', result.expires_in);
    localStorage.setItem('username', this.username)
  }

  login()
  {

    let valid = true;

    this.username = this.username.trim();
    this.password = this.password.trim();

    if (this.username == "")
    {
      this.emptyUsername = true;
      valid = false;
    }

    if (this.password == "")
    {
      this.emptyPassword = true;
      valid = false;
    }

    if (valid)
    {
      this.userService.login(this.username, this.password)
      .subscribe(
        {
          error: (error) =>
          {
            alert("Wrong Credentials")
          },
          next: (response) =>
          {
            this.setSession(response);
            alert("Login succesful");
            this.router.navigate(['messages/create']);
          }
        }
      );  
    }

  }

}
