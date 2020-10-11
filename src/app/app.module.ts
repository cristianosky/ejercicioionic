import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';


export const firebase =  {
  apiKey: "AIzaSyB9mxnxk6zLCHkrfYhcf9xB5uXXw5n8Hf4",
  authDomain: "ionic-eje.firebaseapp.com",
  databaseURL: "https://ionic-eje.firebaseio.com",
  projectId: "ionic-eje",
  storageBucket: "ionic-eje.appspot.com",
  messagingSenderId: "85624396264",
  appId: "1:85624396264:web:e71c05468dceca5a6dec5d",
  measurementId: "G-K3V38PSTXK"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
            AngularFireModule.initializeApp(firebase), AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
