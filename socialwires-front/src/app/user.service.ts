import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { API } from './api-routes'


export interface UserSignup
{
  id: String;
  username: String;
  email: String;
  fullname: String;
}

export interface UserLogin
{
  access_token: string,
  expires_in: string,
  message: string,
  status: boolean
}

export interface UserI
{
  id: string;
  username: string;
  email: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
}


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private readonly http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.error.message.includes("already exists"))
      {
        return throwError(() => new Error('already exists'))
      }

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public signup(email:String, username:String, password:String, fullname:String): Observable<UserSignup>
  {

    const body = 
    {
      email: email,
      username: username,
      password: password,
      fullname: fullname
    }

    return this.http.post<UserSignup>(API.base + "/" + API.signup, body)
    .pipe(
      catchError(this.handleError)
    );

  }

  public login(username:String, password:String)
  {
    const body =
    {
      username: username,
      password: password
    }

    return this.http.post<UserLogin>(API.base + "/" + API.login, body)
    .pipe(
      catchError(this.handleError)
    );
  }
}
