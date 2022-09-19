import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public angularFireAuth: AngularFireAuth,
        public afdb: AngularFireDatabase) {

        this.user = this.formBuilder.group({
            email: ["", Validators.compose([
                Validators.required,
                Validators.email
            ])
            ],
            password: ["", Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    async register() {
        try {
            const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(this.user.value.email, this.user.value.password);
            console.log(result);
            if (result) {

                this.afdb.object(`/customer/${this.angularFireAuth.auth.currentUser.uid}`).set({
                    "convert": "0",
                    "finished": "0",
                    "info": {
                        "name": ""
                    },
                    "like": "0",
                    "subscribed":"0"
                });


                this.navCtrl.setRoot(LoginPage);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

}
