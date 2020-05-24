import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('mainSlide') slides: IonSlides;
  
  loginUser = {
    email: 'test1@mail.com',
    password: '123456'
  }

  registerUser: IUser = {
    name: 'Test',
    email: 'test1@mail.com',
    password: '123456',
    avatar: 'av-1.png'
  }

  constructor(
    private userService: UserService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
  }

  async login(form: NgForm){
    if(form.invalid){
      return;
    }
    const auth = await this.userService.login(this.loginUser);
    if(auth){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    }
  }

  async register(form: NgForm){
    if(form.invalid){
      return;
    }
    const auth = await this.userService.register(this.registerUser);
    if(auth){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    }
  }

  goToLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  goToRegister(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  selectAvatar(avatar: string){
    this.registerUser.avatar = avatar;
  }

}
