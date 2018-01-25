import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from "../../providers/profile/profile";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database"; 
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the JobDiterimaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-diterima',
  templateUrl: 'job-diterima.html',
})
export class JobDiterimaPage {

  public userProfile: any;
  public senaraiKerja: Array<any> = [];
  public userState: any;
  userId ;
  userInfo;
  jobList;
  jobListed;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private afDatabase:AngularFireDatabase) {
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
        this.jobList = firebase.database().ref("job");//.orderBy('jobStatusID').equalTo(this.userState+"_Belum Diterima");
        this.jobList.orderByChild('jobStatusID').equalTo(this.userState+"_Sudah Diterima").on('value', jobSnapshot => {
        this.senaraiKerja = [];
        jobSnapshot.forEach( jobSnap => {
          this.senaraiKerja.push(jobSnap.val());
          return false;
        });
        });
      });
    });
    
  }

  ionViewDidLoad() {

  }

  openJob(jobGambar,jobServis,jobNegeri,jobAlamatPenuh,jobBeratPakaian,jobJumlahHarga,jobID){
    let jobData = {
      jobGambar : jobGambar,
      jobServis : jobServis,
      jobNegeri : jobNegeri,
      jobAlamatPenuh : jobAlamatPenuh,
      jobBeratPakaian : jobBeratPakaian,
      jobJumlahHarga : jobJumlahHarga,
      jobID : jobID
  }
  this.navCtrl.push('JobDiterimaInfoPage', jobData);
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
