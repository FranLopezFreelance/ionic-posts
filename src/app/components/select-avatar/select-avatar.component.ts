import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { AVATARS } from './avatars';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss'],
})
export class SelectAvatarComponent implements OnInit {

  @Output() selectedAvatar = new EventEmitter<string>();
  @Input() currentAvatar: string = 'av-1.png';
  @ViewChild('avatarsSlide') avatarsSlide: IonSlides;
  currentAvatarIndex: number;
  avatars = AVATARS; 

  avatarSlide = {
    slydePreview: 5.5
  }

  constructor() { }

  ngOnInit() { 
    let i = 0;
    this.avatars.forEach(avatar => {
      avatar.selected = false;
      if(avatar.img === this.currentAvatar){
        avatar.selected = true;
        this.currentAvatarIndex = i;
      }
      i++;
    });
  }

  ngAfterViewInit(){
    console.log(this.currentAvatarIndex);
    this.avatarsSlide.slideTo(this.currentAvatarIndex);
  }

  selectAvatar(avatar: any){
    this.avatars.forEach(a => a.selected = false);
    avatar.selected = true;
    this.selectedAvatar.emit(avatar.img);
  }

}
