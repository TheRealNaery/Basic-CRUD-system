import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from 'angularfire2/database';
import firebase from 'firebase/app';

/*
  Generated class for the JobProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobProvider {
  public jobList: AngularFireList<any>;
  public userId: string;
  public userInfo: AngularFireList<any>;
  public userState: AngularFireObject<any>;
  public user: {};
  public job: any;

  constructor(    
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.userInfo = this.afDatabase.list(`/agentProfile/${user.uid}`);
      this.userState = this.afDatabase.object(`/agentProfile/${this.userId}`);
      this.job = this.userState.valueChanges().subscribe(user => {
        this.user = user.negeri;
      });
      this.jobList = this.afDatabase.list(`/job`);
      //,ref => ref.orderByChild('jobStatusID').equalTo(this.userState+"_Belum Diterima"));
      console.log(this.job);
      console.log(this.user);
    });
  }

  getJobList(): AngularFireList<any> {
    return this.jobList;
  }

  getJob(jobId: string): AngularFireObject<any> {
    return this.afDatabase.object(
      `/job/${jobId}`
    );
  }

  acceptJob(jobId: string): Promise<any> {
    return this.jobList.update(jobId, { jobStatus: 'Sudah Diterima' , jobStatusID: this.userState + '_Sudah Diterima' });
  }

}
