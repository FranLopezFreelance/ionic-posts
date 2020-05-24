import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AVATARS } from './avatars';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss'],
})
export class SelectAvatarComponent implements OnInit {

  @Output() selectedAvatar = new EventEmitter<string>();
  @Input() currentAvatar: string = 'av-1.png';
  avatars = AVATARS; 

  avatarSlide = {
    slydePreview: 5.5
  }

  constructor() { }

  ngOnInit() { 
    this.avatars.forEach(avatar => {
      avatar.selected = false;
      if(avatar.img === this.currentAvatar){
        avatar.selected = true;
      }
    });
  }

  selectAvatar(avatar: any){
    this.avatars.forEach(a => a.selected = false);
    avatar.selected = true;
    this.selectedAvatar.emit(avatar.img);
  }

}
