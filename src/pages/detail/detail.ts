import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExamPage } from '../exam/exam';
import { StoreDetailPage } from '../store-detail/store-detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {

    examData: any;
    arr = new Array(12);

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase, ) {
        this.examData = this.navParams.data;
        console.log(this.examData.R);
    }

    goStore(item) {

        let key = item.$key.split('-');
        //console.log(key[0]);
        this.afdb.object(`/store/${key[0]}/`).subscribe(x => {
            //console.log(x);
            if (x) {                
                this.navCtrl.push(StoreDetailPage, x);
            }           
        });

        
    }

    goExam() {
        this.navCtrl.push(ExamPage, this.examData);
    }
}
