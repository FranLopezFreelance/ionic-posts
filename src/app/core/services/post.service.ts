import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private path_url: string = environment.path_url;
  private page: number = 0;

  constructor(private http: HttpClient) { }

  getPosts(pull: boolean = false){
    if(pull){
      this.page = 0;
    }
    this.page++;
    return this.http.get(`${this.path_url}/post/?page=${this.page}`);
  }
}
