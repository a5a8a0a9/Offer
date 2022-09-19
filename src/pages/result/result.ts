import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
    selector: 'page-result',
    templateUrl: 'result.html',
})
export class ResultPage {

    data: any;
    ans: any = [];
    open: boolean = false;
    exchange: boolean = false;
    selAns: any;
    res: any;
    convertArray: any;
    key: any;
    conNum: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase, ) {

        this.data = this.navParams.data;
        this.ans = this.data.rightAns;
        this.selAns = this.data.selAns;
        this.res = this.data.res;
        this.key = this.data.key;

        this.afAuth.authState.subscribe(x => {
            if (x) {
                this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/convert`).subscribe(y => {
                    this.convertArray = y.$value.split(',');
                    console.log(this.convertArray);
                    if (this.convertArray.includes(this.key)) {
                        this.exchange = true;
                    }
                });
            }
        });

        this.afdb.object(`/set/${this.key}/convert`).subscribe(x => {
            this.conNum = x.$value;
            console.log(this.conNum);
        });

    }



    conv() {
        this.exchange = true;
        this.conNum++;
        let newConvert = this.convertArray.toString() + "," + this.key;
        this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/`).update({ 'convert': newConvert });
        this.afdb.object(`/set/${this.key}/`).update({ 'convert': this.conNum });
    }




    back() {
        this.navCtrl.popToRoot();
    }
}
