import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [ PostsComponent, PostComponent, SelectAvatarComponent, MapComponent ],
  imports: [ CommonModule, IonicModule, PipesModule ],
  exports: [ PostsComponent, SelectAvatarComponent ]
})
export class ComponentsModule { }
