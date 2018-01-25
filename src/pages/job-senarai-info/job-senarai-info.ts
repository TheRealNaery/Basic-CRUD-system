import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the JobSenaraiInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-senarai-info',
  templateUrl: 'job-senarai-info.html',
})
export class JobSenaraiInfoPage {
  jobGambar;
  jobServis;
  jobNegeri;
  jobAlamatPenuh;
  jobBeratPakaian;
  jobJumlahHarga;
  jobID;
  jobList;
  nStatus;
  nStatusID;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jobList = firebase.database().ref("job");
  }

  ionViewDidLoad() {
    this.jobGambar = this.navParams.get('jobGambar');
    this.jobServis = this.navParams.get('jobServis');
    this.jobNegeri = this.navParams.get('jobNegeri');
    this.jobAlamatPenuh = this.navParams.get('jobAlamatPenuh');
    this.jobBeratPakaian = this.navParams.get('jobBeratPakaian');
    this.jobJumlahHarga = this.navParams.get('jobJumlahHarga');
    this.jobID = this.navParams.get('jobID');
    this.nStatus = "Sudah Diterima";
    this.nStatusID = this.jobNegeri+"_Sudah Diterima";
    console.log(this.jobID);
  }

  acceptJob(nStatus: string, nStatusID: string): void{
    const jobRef: firebase.database.Reference = firebase.database().ref(`/job/${this.jobID}`);
    jobRef.update({
      jobStatus: nStatus,
      jobStatusID: nStatusID
    }).then(newJob =>{
      this.navCtrl.push('JobSenaraiPage');
    },error=>{console.log(error);});
  }
}
