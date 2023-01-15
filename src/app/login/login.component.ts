import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username:string = "";
  emptyUsername:boolean = false;
  
  password:string = "";
  emptyPassword:boolean = false;

  constructor(private userService:UserService)
  {

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
          complete: () => 
          {
            console.log("complete");
          },
          error: (error) =>
          {
            switch(error.message)
            {
              default:
                alert("Unknown Error: " + error);
            }
          },
          next: (response) =>
          {
            try
            {
              this.setSession(response);
              alert("Login succesful")
            }
            catch (e)
            {
              alert("Something went wrong " + e);

            }
          }
        }
      );  
    }

  }

}
