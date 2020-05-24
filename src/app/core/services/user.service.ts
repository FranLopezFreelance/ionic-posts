import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { IUser } from 'src/app/interfaces/user.interface';
import { MessagesService } from './messages.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path_url: string = environment.path_url;
  private token: string = null;
  private user: IUser = null;
  
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private messagesService: MessagesService,
    private navCtrl: NavController
  ) {
    this.getToken();
  }

  login(data: any){
    return new Promise(resolve => {
      this.http.post(`${this.path_url}/auth/login`, data).subscribe(async (res: any) => {
        if(res.ok){
          this.token = res.token;
          await this.saveToken(this.token);
          resolve(true);
        }
      }, (err: any) => {
        this.messagesService.alertInfo(err.statusText);
        this.token = null;
        this.storage.clear();
        resolve(false);
      });
    });
  }

  getUser(): IUser {
    return {...this.user};
  }

  register(user: IUser){
    return new Promise(resolve => {
      this.http.post(`${this.path_url}/auth/register`, user).subscribe((res: any) => {
        if(res.ok){
          this.token = res.token;
          this.saveToken(this.token);
          resolve(true);
        }
      }, (err: any) => {
        this.messagesService.alertInfo(err.statusText);
        this.token = null;
        this.storage.clear();
        resolve(false);
      });
    });
  }

  updateUser(user: IUser){
    
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return new Promise(resolve => {
      return this.http.put(`${this.path_url}/user/`, user, { headers }).subscribe((res: any) => {
        if(res.ok){
          this.saveToken(res.token);
          this.messagesService.toastMessage(res.message);
          resolve(true);
        }else{
          console.log(res);
        }
      }, (err: any) => {
        this.messagesService.alertInfo(err);
        resolve(false);
      });
    })
    
  }

  async getToken(){
    this.token = await this.storage.get('TOKEN') || null;
  }

  async saveToken(token: string){
    this.token = token;
    await this.storage.set('TOKEN', token);
    await this.verifyToken();
  }

  async verifyToken(): Promise<boolean>{
    await this.getToken();
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'Authorization': this.token
      });
      this.http.get(`${this.path_url}/user/`, { headers }).subscribe((res: any) => {
        if(res.ok){
          this.user = res.user;
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  logout(){
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

}
