import { Component, OnInit } from '@angular/core';
import { MessageI, MessagesService } from '../messages.service';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css']
})

export class AllMessagesComponent implements OnInit{

  filterDate:string = new Date().toISOString().split('T')[0];
  filterSearch:string = "";

  messagesList:MessageI[] = [];

  constructor(private messagesService:MessagesService)
  {

  }

  ngOnInit(): void {
    
    this.search();

  }

  search()
  {

    this.filterSearch = this.filterSearch.trim();
    console.log(this.filterSearch);

    this.messagesService.getMessagesSearch(this.filterSearch)
    .subscribe(
      {
        error: (error) =>
        {
          console.log(error);

          this.messagesList = [];
          
        },
        next: (response) =>
        {
          this.messagesList = [...response];
          this.messagesList.reverse();
          
          console.log(this.messagesList);
        }
      }
    )

  }

}
