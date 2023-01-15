import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})

export class MessageCardComponent implements OnInit{

  @Input() title:string = "Title";
  @Input() message:string = "Content";
  @Input() username:string = "";
  @Input() date:string = "";

  constructor()
  {

  }

  ngOnInit(): void {
    
    if (!this.username)
    {
      this.username = <string>localStorage.getItem("username");
    }
    if (!this.date)
    {
      this.date = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    }

  }


}
