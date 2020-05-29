import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  updatedUser: IUser = null;
  edit: boolean = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(){
    this.updatedUser = this.userService.getUser();
  }

  selectAvatar(avatar: string){
    this.updatedUser.avatar = avatar;
  }

  async updateUser( updateForm: NgForm){
    if(!updateForm.valid){
      return;
    }
    await this.userService.updateUser(this.updatedUser);
    this.setEdit(false);
  }

  logOut(){
    this.userService.logout();
  }

  setEdit(value: boolean){
    this.edit = value;
  }
}
