import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the JobPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class JobPage {

  jobSenaraiRoot = 'JobSenaraiPage'
  jobDiterimaRoot = 'JobDiterimaPage'
  profilAgentRoot = 'ProfilAgentPage'


  constructor(public navCtrl: NavController) {}

}
