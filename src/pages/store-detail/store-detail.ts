import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StoreSetPage } from '../store-set/store-set';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
    selector: 'page-store-detail',
    templateUrl: 'store-detail.html',
})
export class StoreDetailPage {

    @ViewChild(Content) content: Content;
    storeData: any;
    arr = new Array(10);
    editing: boolean = false;
    comment: any;
    newcomment: string;
    

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afdb: AngularFireDatabase) {
        this.storeData = this.navParams.data;
        this.comment = this.storeData.comment.substring(2).split('∫');
    }

    edit() {
        this.editing = !this.editing;
        this.newcomment = '';
        this.content.scrollToBottom();
    }

    goQanda(item) {
        this.navCtrl.push(StoreSetPage, item);
    }

    send(key) {
        this.editing = false
        if (this.newcomment.length > 0 && this.newcomment.trim()!='') {
            let newcom;
            if (this.storeData.comment.length == 2) {
                newcom = this.storeData.comment + this.newcomment;
            }
            else if (this.storeData.comment.length > 2) {
                newcom = this.storeData.comment + "∫" + this.newcomment;
            }

            this.afdb.object(`/store/${key}/`).update({ "comment": newcom });
            this.afdb.object(`/store/${key}/comment/`).subscribe(x => {
                this.comment = x.$value.substring(2).split("∫");
            });
        }
    }

    goTop() {
        this.content.scrollToTop();
    }
}
