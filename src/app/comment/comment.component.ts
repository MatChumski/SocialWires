import { Component, Input } from '@angular/core';

export interface Comment
{
  comment: string;
  user: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input() comment:Comment = 
  {
    comment: "",
    user: ""
  }

}
