import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { IPost } from 'src/app/interfaces/post.interface';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessagesService } from 'src/app/core/services/messages.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imagesTemp: string[] = [];
  loadPosition = false;
  newPost: IPost = {
    message: '',
    coords: null,
    position: false
  };

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private geolocation: Geolocation,
    private camera: Camera,
    private messagesService: MessagesService
  ) {}

  async createPost(){
    await this.postService.createPost(this.newPost);
    this.newPost = {
      message: '',
      coords: null,
      position: false
    };
    
    this.router.navigateByUrl('/main/tabs/tab1');
  }

  logOut(){
    this.userService.logout();
  }

  getPosition(){
    if(!this.newPost.position){
      this.loadPosition = false;
      this.newPost.coords = null;
      return;
    }else{
      this.loadPosition = true;
      this.geolocation.getCurrentPosition().then((resp) => {
        this.loadPosition = false;
        const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
        this.newPost.coords = coords;
       }).catch((error) => {
        this.loadPosition = false;
        this.messagesService.alertInfo(error);
       });
    }
  }

  getCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const img = window.ionic.WebView.ConvertFileSrc(imageData);
     console.log(img);
     this.imagesTemp.push(img);
    }, (err) => {
     // Handle error
    });
  }

}
