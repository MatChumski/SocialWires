import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageI, MessagesService } from '../messages.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})

export class MainHeaderComponent implements OnInit {

  isMessagesActive:boolean = false;
  
  isMenuActive:boolean = false;

  username:String = "";

  messagesList:MessageI[] = [];

  constructor(private router:Router, private messagesService:MessagesService)
  {

  }

  ngOnInit()
  {

    const accessToken = localStorage.getItem("access_token");
    this.username = <string>localStorage.getItem("username");

    if (!accessToken || !this.username)
    {
      alert("Not logged in");
      this.router.navigate(['']);
    }

    this.messagesService.getAllMessages()
    .subscribe(
      {
        error: (error) => 
        {
          console.error(error.message);
        },
        next: (result) =>
        {
          this.messagesList = [...result];
        }
      }
    )

  }

  public toggleMessagesActive()
  {
    this.isMessagesActive = !this.isMessagesActive;
    this.isMenuActive = false;
  }

  public toggleMenuActive()
  {
    this.isMenuActive = !this.isMenuActive;
    this.isMessagesActive = false;
  }

}
