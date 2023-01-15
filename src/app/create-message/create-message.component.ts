import { Component } from '@angular/core';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})

export class CreateMessageComponent {

  newTitle:string = "";
  emptyNewTitle:boolean = false;

  newMessage:string = "";
  emptyNewMessage:boolean = false;

  constructor(private messagesService:MessagesService)
  {

  }

  share()
  {

    let valid = true;
    
    this.newTitle = this.newTitle.trim();
    this.newMessage = this.newMessage.trim();

    if (this.newTitle == "")
    {
      this.emptyNewTitle = true;
      valid = false;
    }

    if (this.newMessage == "")
    {
      this.emptyNewMessage = true;
      valid = false;
    }

    if (valid)
    {
      this.messagesService.createMessage(this.newTitle, this.newMessage)
      .subscribe(
        {
          complete: () =>
          {
            console.log("complete");
          },
          error: (error) =>
          {
            console.error("error: " + error);
          },
          next: (response) =>
          {
            console.log(response);
          }
        }
      );
    }

  }
}
