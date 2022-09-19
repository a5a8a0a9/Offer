import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
    selector: 'page-exam',
    templateUrl: 'exam.html',
})
export class ExamPage {

    examData: any;
    current = 0;          //頁數
    selected: any = [null, null, null];     //使用者選的選項index
    isSelect: boolean[] = [false, false, false];  //此頁是否選過了
    count: number = 0;    //回答題數
    answer: string[] = [];



    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public afDb: AngularFireDatabase)
    {
        this.examData = this.navParams.data;        
    }
    
    
    selAns(Q, ansIndex,ans) {
        switch (Q) {
            case 1: {
                this.answer[0] = ans;
                this.selected[0] = ansIndex;
                if (!this.isSelect[0]) {
                    this.count++;
                    this.isSelect[0] = true;
                }
                break;
            }
            case 2: {
                this.answer[1] = ans;
                this.selected[1] = ansIndex;
                if (!this.isSelect[1]) {
                    this.count++;
                    this.isSelect[1] = true;
                }
                break;
            }
            case 3: {
                this.answer[2] = ans;
                this.selected[2] = ansIndex;
                if (!this.isSelect[2]) {
                    this.count++;
                    this.isSelect[2] = true;
                }
                break;
            }
        }
    }

    selcStyle(selected, i) {
        if (selected == i) {
            return { 'background-color': '#4db6ac' };
            
        }
        else {
            return { 'background-color': '#f4f4f4' };
        }
    }

    pagerStyle(cur, i) {
        if (cur == i) {
          return { 'background-color': '#26a69a' };
        }
        else {
          return { 'background-color': '#b2dfdb' };
        }
    }

    result() {
        console.log("sel = ", this.selected);

        let res: any = [false, false, false];
        let right = this.examData.answer.split(',');

        for (let i = 0; i < res.length; i++) {
            if (this.answer[i] == right[i]) {
                res[i] = true;
            }
        }

        console.log("res=", res);
        console.log("this.ans", this.answer);
        
        //this.afDb.object(`/set/${this.examData.name}/`).update({ "finished": true });

        this.navCtrl.push(
            ResultPage,
            {
                res: res,
                rightAns: right,
                reward: this.examData.R,
                selAns: this.answer,
                key: this.examData.$key
            });
    }

}
