import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Content } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild(Content) content: Content;

    storeData: any;
    loader = this.loadingCtrl.create({
        content: "載入中"
    });

    constructor(
        public navCtrl: NavController,
        private afdb: AngularFireDatabase,
        public loadingCtrl: LoadingController 
    ) {
        this.loader.present();
        this.initializeItems();
    }

    initializeItems() {
        this.afdb.list("/store/").subscribe(x => {
            this.storeData = x;
            this.loader.dismiss();
        });
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.storeData = this.storeData.filter(item => item.name.indexOf(val) > -1 || item.descript.indexOf(val) > -1 || item.tag.indexOf(val) > -1);
        }
    }


    goStore(item) {
        this.navCtrl.push(StoreDetailPage, item);
    }

    goTop() {
        this.content.scrollToTop();
    }
}
