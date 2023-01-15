import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../comment/comment.component';
import { MessageI, MessagesService } from '../messages.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})

export class MessageCardComponent implements OnInit{


  @Input() title:string = "Title";
  @Input() message:string = "Content";
  @Input() checkComment:boolean = true;
  @Input() msg:MessageI | undefined

  username?:string = "";
  date:string = ""; 

  newComment:string = "";
  commentsList:Comment[] = [];

  localUsername:string;

  constructor(private messagesService:MessagesService)
  {
    this.localUsername = <string>localStorage.getItem("username");

  }

  ngOnInit(): void {
    
    if (this.msg)
    {
      this.username = this.msg.user?.username;
      this.title = this.msg.title;
      this.message = this.msg.text;
      this.date = this.msg.createdAt;
    }

    if (!this.msg?.user?.username)
    {
      this.username = this.localUsername;
    }
    if (!this.msg?.createdAt)
    {
      this.date = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    }

    if (this.msg)
    {
      this.loadComments(this.msg);
    }

  }

  /**
   * Loads all the comment of a message
   */
  loadComments(newMessage:MessageI)
  {
    this.commentsList = [];

    if (newMessage)
    {
      for (let i = 0; i < newMessage.comments.length; i++)
      {
        let msgCom = JSON.parse(newMessage.comments[i]);

        let thisComment:Comment =
        {
          comment: msgCom.comment,
          user: msgCom.user
        }

        this.commentsList.push(thisComment);
      }
    }

    /**
     * Reverses the list so it shows the most
     * recent elements first
     */
    this.commentsList.reverse();
  }

  createComment()
  {
    if (this.msg?.id)
    {
      this.messagesService.commentMessage(this.msg?.id, this.newComment)
      .subscribe(
        {
          error: (error) =>
          {
            console.log(error);
          },
          next: (response) =>
          {
            console.log(response);
            this.loadComments(response);
          }
        }
      );
    }
  }


}
