import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
  public alertCtrl: AlertController, public formBuilder: FormBuilder, 
  public authProvider: AuthProvider) {
    
    this.signupForm = formBuilder.group({
      nama: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      identityC: ['', Validators.compose([Validators.required])],
      phoneNo: ['', Validators.compose([Validators.required])],
      noUnit: ['', Validators.compose([Validators.required])],
      alamat: ['', Validators.compose([Validators.required])],
      poskod: ['', Validators.compose([Validators.required])],
      negeri: ['', Validators.compose([Validators.required])]
    });
  
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.nama, 
        this.signupForm.value.email,
        this.signupForm.value.password, 
        this.signupForm.value.identityC, 
        this.signupForm.value.phoneNo, 
        this.signupForm.value.noUnit, 
        this.signupForm.value.alamat, 
        this.signupForm.value.poskod, 
        this.signupForm.value.negeri)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot('JobPage');
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
