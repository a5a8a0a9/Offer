import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs';



@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    segmentButton: string = 'all';
    setData: any;
    subdata: any;
    opt = "popu";
    like: boolean = false;
    subIsC: any;

    constructor(
        public navCtrl: NavController,
        public afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
    ) {
        
        this.afdb.list("/set/").subscribe(x => {
            this.setData = x;
            this.subIsC = new Array(x.length).fill(false);
            console.log(this.subClick);
            console.log("setData = ",this.setData);
            
        });


        this.afdb.list("/subscribed/").subscribe(y => {
            this.subdata = y;
        });


    }

    goDetail(exam) {
        this.navCtrl.push(DetailPage, exam);
    }




    subClick(i) {
        //this.subIsC[i] = !this.subIsC[i];
        //if (this.subIsC[i]) {
        //    this.afdb.object(`/set/${this.data[i].name}/`).update({ "subscribed": true });
        //    this.afdb.object(`/subscribed/${this.data[i].name}/`).set(this.data[i]);
        //}
        //else {
        //    this.afdb.object(`/set/${this.data[i].name}/`).update({ "subscribed": false });
        //    this.afdb.object(`/subscribed/${this.data[i].name}/`).remove();
        //}

        //this.afdb.list("/subscribed/").subscribe(y => {
        //    this.subdata = y;
        //});
    }

    getStyle(type, subcribed, i) {
        switch (type) {
            case 'sub': {
                if (subcribed) {
                    return { 'background-color': '#ff6699' };
                }
                else {
                    return { 'background-color': '#8c8c8c' };
                }
            }
        }


        //if (type == 'sub' && this.subClick[i]) {
        //    if (!subcribed) {
        //        this.afdb.object(`/set/${this.data[i].name}/`).update({ "subscribed": true });
        //        return { 'background-color': '#ff6699' };
        //    }
        //    else {
        //        return { 'background-color': '#ff6699' };
        //    }
        //}
        //else if (this.like && type == "like") {
        //    return { 'background-color': '#488aff' };
        //}
        //else {
        //    return { 'background-color': '#8c8c8c' };
        //}

    }

}
