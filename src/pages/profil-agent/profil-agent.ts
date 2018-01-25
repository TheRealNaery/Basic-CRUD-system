import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from "../../providers/profile/profile";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database"; 
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
/**
 * Generated class for the ProfilAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-agent',
  templateUrl: 'profil-agent.html',
})
export class ProfilAgentPage {

  public userProfile: any;
  public userState: any;
  userId ;
  userInfo;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private afDatabase:AngularFireDatabase
  ) {}
  
  ionViewDidLoad() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) { 
        this.userId = user.uid;
        this.userInfo = firebase.database().ref(`/agentProfile/${user.uid}`)
      };
      console.log(this.userId);
      //console.log(this.userInfo.email);
      this.userInfo.on('value', userSnapshot =>{
      this.userProfile = userSnapshot.val();
      this.userState = this.userProfile.negeri;
  });
    });
    
  }
    /**
     * Calls the authentication provider and logs the user out, on successful logout it sends the user
     * back to the login page.
     */
    logMeOut() {
      this.authProvider.logoutUser().then( () => {
        this.navCtrl.setRoot('LoginPage');
      });
    }
}
