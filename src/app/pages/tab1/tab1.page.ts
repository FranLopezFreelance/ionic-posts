import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';
import { IPostsResponse } from 'src/app/interfaces/posts-response.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  posts: IPost[] = [];
  scrollDisabled = true;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(){
    this.postService.newPost.subscribe((post: IPost) => {
      this.posts.unshift(post);
    });
    this.next();
  }

  reload(event: any){
    this.next(event, true);
    this.scrollDisabled = true;
      this.posts = [];
  }

  next(event?: any, pull: boolean = false){
    this.postService.getPosts(pull).subscribe((res: IPostsResponse) => {
      this.posts.push(... res.posts);
      if(event){
        event.target.complete();
        if(res.posts.length == 0){
          this.scrollDisabled = false;
        }
      }
    });
  }

  logOut(){
    this.userService.logout();
  }

}
