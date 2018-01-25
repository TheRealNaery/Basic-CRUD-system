import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase) {

    }

  /**
   * loginUser takes in an email and password and signs the user into the application.
   */
  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  /**
   * signupUser takes in an email and password and does 3 things:
   * 1. It creates the new user.
   * 2. It signs the user into the application.
   * 3. It creates a database node for the user to store the userProfile, which starts with just
   *    the email address.
   */
  signupUser(nama: string, email: string, password: string, identityC: string, phoneNo: string, noUnit: string, alamat: string, poskod: string, negeri: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/agentProfile').child(newUser.uid).set({
          nama: nama,
          email: email,
          identityC: identityC,
          phoneNo: phoneNo,
          noUnit: noUnit,
          alamat: alamat,
          poskod: poskod,
          negeri: negeri,
          alamatPenuh: noUnit + ", " + alamat + ", " + poskod + ", " + negeri
      });
    });
  }

  /**
   * resetPassword takes the email address as a string and sends the email with the reset password
   * link.
   */
  resetPassword(email: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
   * the currently logged in user.
   */
  logoutUser(): Promise<any> {
    return firebase.auth().signOut();
  }

}
