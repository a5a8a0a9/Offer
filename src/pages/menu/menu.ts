import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {

    @ViewChild(Nav) nav: Nav;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public app: App,
        public menu: MenuController
    ) {
        menu.enable(true);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuPage');
    }

}
