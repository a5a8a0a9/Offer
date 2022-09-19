import { Component } from '@angular/core';
import { NavController, App, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    user: any;
    name: any;
    edit: boolean = false;
    myInput: any;
    loader = this.loadingCtrl.create({
        content: "載入中"
    });
    convertData = [];
    setKeyArray: any;

    constructor(
        public navCtrl: NavController,
        public app: App,
        public afAuth: AngularFireAuth,
        public afDb: AngularFireDatabase,
        public loadingCtrl: LoadingController) {

        this.loader.present();
        this.afAuth.authState.subscribe(x => {
            this.loader.dismiss();
            this.user = x;
            if (x) {
                this.afDb.object(`/customer/${this.afAuth.auth.currentUser.uid}/info`).subscribe(x => {
                    this.name = x.name;
                });
            }

            this.afDb.object(`/customer/${this.afAuth.auth.currentUser.uid}/convert`).subscribe(x => {
                this.setKeyArray = x.$value.split(',').slice(1);

                for (let i = 0; i < this.setKeyArray.length; i++) {
                    this.afDb.object(`/set/${this.setKeyArray[i]}`).subscribe(x => {
                        this.convertData.push({
                            'name' : x.name,
                            'R' : x.R
                        });
                    });
                }

            });

            
        });


    }


    pu() {


        //刪除
        //this.afDb.object("/List-set/st-001-03/test").remove();

        //修改或新增
        //this.afDb.object("/List-set/st-001-03/").update({ "test": "555" });



        //this.afDb.object("/set/08vFTSz90HUQ6tPjF3w1yksUOLd2-1/").set({
        //    "Q1": {
        //        "A1": "10/29",
        //        "A2": "10/30",
        //        "A3": "10/31",
        //        "title": "活動日期在幾月幾號?"
        //    },
        //    "Q2": {
        //        "A1": "50",
        //        "A2": "100",
        //        "A3": "150",
        //        "title": "限量幾份?"
        //    },
        //    "Q3": {
        //        "A1": "一周年",
        //        "A2": "兩周年",
        //        "A3": "三周年",
        //        "title": "天神雞排成立幾周年?"
        //    },
        //    "R": "免費薯條一份",
        //    "answer": "10/31,150,一周年",
        //    "date": "2018-10-20",
        //    "description": "跟大家說個好消息<br />天神雞排一周年囉<br />感謝這一年來各位對天神雞排的照顧與支持<br />為了答謝各位<br />10/31雞排買一送一哦<br />這麼好康的事情<br />大家還不趕快把握<br />P.S.一人每次只能使用一次優惠，限量150份",
        //    "flow": "257",
        //    "id": "08vFTSz90HUQ6tPjF3w1yksUOLd2-1",
        //    "name": "天神雞排 周年慶大放送",
        //    "popularity": "188",
        //    "poster": ""
        //}).then(() => console.log("RRRRRRRRR"));


    }


    login() {
        this.navCtrl.setRoot(LoginPage);
    }

    logout() {
        this.afAuth.auth.signOut();
        console.log(this.afAuth.auth.currentUser);
        //this.app.getRootNav().setRoot(LoginPage);
    }

    named() {
        this.edit = false;

        if (this.myInput > 0 && this.myInput.trim() != '') {
            this.afDb.object(`/customer/${this.afAuth.auth.currentUser.uid}/info`).update({ "name": this.myInput });

            this.afDb.list(`/customer/${this.afAuth.auth.currentUser.uid}/info/name`).subscribe(x => {
                this.name = x;
                console.log("x=", x);
                console.log("name=", this.name);
            });
        }
        this.myInput = '';

    }
}
