import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';

const SERVICES_PROVIDER = [ PostService ];

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [  ],
  providers: [ SERVICES_PROVIDER ]
})
export class CoreModule { }
