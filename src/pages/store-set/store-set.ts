import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetailPage } from "../detail/detail";

@IonicPage()
@Component({
    selector: 'page-store-set',
    templateUrl: 'store-set.html',
})
export class StoreSetPage {

    setData: any = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
    ) {
        let key1: string = this.navParams.data.$key + "-1";
        
        this.afdb.object(`/set/${key1}/`).subscribe(x => {
            this.setData.push(x);
            //console.log('setData = ', this.setData);
        });

        if (this.navParams.data.ad_quantity == 2) {
            let key2: string = this.navParams.data.$key + "-2";
            this.afdb.object(`/set/${key2}/`).subscribe(y => {
                this.setData.push(y);
                //console.log('setData = ', this.setData);
            });
        }
    }

    goDetail(item) {
        this.navCtrl.push(DetailPage, item);
    }

}
