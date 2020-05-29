import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPost } from 'src/app/interfaces/post.interface';
import { UserService } from './user.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private path_url: string = environment.path_url;
  private page: number = 0;
  newPost = new EventEmitter<IPost>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private messagesService: MessagesService
  ) { }

  getPosts(pull: boolean = false){
    if(pull){
      this.page = 0;
    }
    this.page++;
    return this.http.get(`${this.path_url}/post/?page=${this.page}`);
  }

  createPost(post: IPost): any{
    this.userService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': this.userService.token
        });

        return new Promise(resolve => {
          this.http.post(`${this.path_url}/post/`, post, { headers }).subscribe((res: any) => {
            this.newPost.emit(res.post);
            this.messagesService.toastMessage(res.message);
            resolve(true);
          }, () => {
            resolve(false);
          });

        });

    });
    
  }
}
