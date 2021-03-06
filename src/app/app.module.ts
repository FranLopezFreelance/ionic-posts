import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    CoreModule, HttpClientModule, IonicStorageModule.forRoot() ],
  providers: [ StatusBar, SplashScreen, Geolocation, Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    /* { provide: HTTP_INTERCEPTORS, useClass: Authorization, multi: true } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
