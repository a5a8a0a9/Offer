import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetailPage } from "../detail/detail";

@IonicPage()
@Component({
    selector: 'page-qanda',
    templateUrl: 'qanda.html',
})
export class QandaPage {

    @ViewChild(Content) content: Content;

    orderOption: string = 'date';
    setData: any;
    ascending = false;
    loader = this.loadingCtrl.create({
        content: "載入中"
    });
    fab = false;
    subcribedData: any = [];
    subcribedString: any;
    popularityString: any;
    likeIcon = 'ios-thumbs-up-outline';
    subIcon = 'md-heart-outline';

    substr2: any;



    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
        public loadingCtrl: LoadingController
    ) {
        this.loader.present();
        this.initializeItems();
        this.afAuth.authState.subscribe(x => {
            if (x) {

                this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/subscribed`).subscribe(x => {
                    this.subcribedString = x.$value.split(',');
                    //this.subcribedData = this.setData.filter(item => item.id.indexOf(this.subcribedString[1]) > -1);
                    //console.log(this.setData.filter(item => item.id.indexOf(this.subcribedString[1]) > -1)[0]);

                    this.subInit();
                    //for (let i = 1; i < this.subcribedString.length; i++) {
                    //    this.subcribedData.push(this.setData.filter(item => item.id.indexOf(this.subcribedString[i]) > -1)[0]);
                    //}
                });


                //喜歡的數量
                this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/like`).subscribe(z => {
                    this.popularityString = z.$value.split(',');
                });
            }
        });
    }


    initializeItems() {
        this.afdb.list("/set/").subscribe(x => {
            this.setData = x;
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
            this.setData = this.setData.filter(item => item.name.indexOf(val) > -1 || item.description.indexOf(val) > -1);
        }
    }

    goDetail(item) {
        this.navCtrl.push(DetailPage, item);
    }

    subInit() {
        this.subcribedData = [];
        for (let i = 1; i < this.subcribedString.length; i++) {
            this.subcribedData.push(this.setData.filter(item => item.id.indexOf(this.subcribedString[i]) > -1)[0]);
        }
    }


    subscribe(id) {

        if (this.subcribedString.includes(id)) {
            let n = this.subcribedString.indexOf(id);
            let temp1 = this.subcribedString.slice(0, n);
            let temp2 = this.subcribedString.slice(n + 1);
            let temp3 = temp1.concat(temp2);
            let result = temp3.toString();
            this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/`).update({ 'subscribed': result });
            this.subInit();
            //this.subcribedData = [];
            //for (let i = 1; i < this.subcribedString.length; i++) {
            //    this.subcribedData.push(this.setData.filter(item => item.id.indexOf(this.subcribedString[i]) > -1)[0]);
            //}
        }
        else {
            let result = this.subcribedString + "," + id;
            this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/`).update({ 'subscribed': result });
            this.subInit();
            //this.subcribedData = [];
            //for (let i = 1; i < this.subcribedString.length; i++) {
            //    this.subcribedData.push(this.setData.filter(item => item.id.indexOf(this.subcribedString[i]) > -1)[0]);
            //}
        }


    }

    like(id) {
        let popNum;
        this.afdb.object(`/set/${id}/popularity`).subscribe(x => {
            popNum = x.$value;
        });

        if (this.popularityString.includes(id)) {
            let n = this.popularityString.indexOf(id);
            let temp1 = this.popularityString.slice(0, n);
            let temp2 = this.popularityString.slice(n + 1);
            let temp3 = temp1.concat(temp2);
            this.popularityString = temp3.toString();
            this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/`).update({ 'like': this.popularityString });
            popNum--;
            this.afdb.object(`/set/${id}/`).update({ 'popularity': popNum });
        }
        else {
            this.popularityString = this.popularityString + "," + id;
            this.afdb.object(`/customer/${this.afAuth.auth.currentUser.uid}/`).update({ 'like': this.popularityString });
            popNum++;
            this.afdb.object(`/set/${id}/`).update({ 'popularity': popNum });
        }
    }


    fabChange(type) {
        switch (type) {
            case 'all': {
                this.initializeItems();
                break;
            }
            case 'sub': {
                this.setData = this.subcribedData;
                break;
            }
        }
    }

    subStyle(id) {


        if (this.subcribedString) {
            if (this.subcribedString.includes(id)) {
                this.subIcon = 'md-heart';
                return { 'background-color': '#ff6699' };
            }
            else {
                this.subIcon = 'md-heart-outline';
                return { 'background-color': '#8c8c8c' };
            }
        }
    }

    popStyle(id) {
        if (this.popularityString) {
            if (this.popularityString.includes(id)) {
                this.likeIcon = 'md-thumbs-up';
                return { 'background-color': '#488aff' };
            }
            else {
                this.likeIcon = 'ios-thumbs-up-outline';
                return { 'background-color': '#8c8c8c' };
            }
        }
    }

    goTop() {
        this.content.scrollToTop();
    }
}
