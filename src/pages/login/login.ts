import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register/register";


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    user: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        private angularFireAuth: AngularFireAuth) {

        console.log(this.angularFireAuth.auth.currentUser);

        this.user = this.formBuilder.group({
            email: ["", Validators.compose([
                Validators.required,
                Validators.email
                //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.+-]*')
            ])
            ],
            password: ["", Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    async login() {
        //console.log(this.user.value);
        //try {
        //    const result = this.angularFireAuth.auth.signInWithEmailAndPassword(this.user.value.email, this.user.value.password);
        //    console.log(this.angularFireAuth.auth.currentUser);
        //    if (result) {
        //        this.navCtrl.setRoot(TabsPage);
        //    }
        //    else {
        //        alert("error");
        //    }
        //}
        //catch (e) {
        //    alert("error");
        //}

        this.angularFireAuth.auth.signInWithEmailAndPassword(this.user.value.email, this.user.value.password).then(x => {
            if (x) {
                console.log(this.angularFireAuth.auth.currentUser);
                this.navCtrl.setRoot(TabsPage);
            }
        }).catch(error => {
            alert("帳號或密碼錯誤!!!");
        });
    }

    register() {
        this.navCtrl.push(RegisterPage);
    }

}
