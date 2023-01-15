import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API } from './api-routes';
import { UserI } from './user.service';

export interface MessageCreated
{
  title: string;
  text: string;
  user: string;
  id: string;
  createdAt: string;
  udpatedAt: string
}

export interface MessageI
{
  id: string;
  title: string;
  text: string;
  comments:string[];
  createdAt: string;
  updatedAt: string;
  user?:UserI;
}


@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  messagesList:MessageI[] = [];

  constructor(private readonly http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(() => new Error(error.error.message))      

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public createMessage(title:string, message:string)
  {
    const body =
    {
      title: title,
      text: message
    };

    return this.http.post<MessageCreated>(API.base + "/" + API.messages, body)
    .pipe(
      catchError(this.handleError)
    )

  }

  public getAllMessages()
  {

    return this.http.get<MessageI[]>(API.base + "/" + API.messages)
    .pipe(
      catchError(this.handleError)
    );

  }

  public getUserMessages()
  {
    return this.http.get<MessageI[]>(API.base + "/" + API.myMessages)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getMessagesSearch(search:string, date?:string)
  {
    const body =
    {
      search: search,
      date: date
    }

    return this.http.post<MessageI[]>(API.base + "/" + API.searchMessages, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  public commentMessage(messageID:string, comment:string)
  {
    const body =
    {
      comment: comment
    }

    return this.http.patch<MessageI>(API.base + "/" + API.comment + "/" + messageID, body)
    .pipe(
      catchError(this.handleError)
    );

  }

}
