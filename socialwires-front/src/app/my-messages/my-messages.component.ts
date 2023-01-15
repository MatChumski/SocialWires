import { Component, OnInit } from '@angular/core';
import { MessageI, MessagesService } from '../messages.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})

export class MyMessagesComponent implements OnInit {

  filterDate:string = new Date().toISOString().split('T')[0];

  messagesList:MessageI[] = [];

  constructor(private messagesService:MessagesService)
  {

  }

  ngOnInit()
  {
    const accessToken = localStorage.getItem("access_token");

    this.messagesService.getUserMessages()
    .subscribe(
      {
        error: (error) =>
        {
          console.log("error: " + error);
        },
        next: (result) =>
        {
          this.messagesList = [...result];
          console.log(result);
        }
      }
    )


  }

}
