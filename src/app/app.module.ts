import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

import firebase from 'firebase';

import { AngularFireModule, FirebaseAppConfig} from "angularfire2";
import { AngularFireDatabaseModule } from  'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { JobProvider } from '../providers/job/job';

const config = {
  apiKey: "AIzaSyB0SylAYKWxltAh_wLQUlYSQ6S5e9HVNOg",
  authDomain: "mommyhelper-8496c.firebaseapp.com",
  databaseURL: "https://mommyhelper-8496c.firebaseio.com",
  projectId: "mommyhelper-8496c",
  storageBucket: "mommyhelper-8496c.appspot.com",
  messagingSenderId: "695211966649"
};
firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    JobProvider
  ]
})
export class AppModule {}
