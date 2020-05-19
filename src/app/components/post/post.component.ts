import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: IPost;
  imgUrl1 = '/assets/perro-1.jpg';
  imgUrl2 = '/assets/perro-2.jpg';
  imgUrl3 = '/assets/perro-3.jpg';

  constructor() { }

  ngOnInit() {}

}
