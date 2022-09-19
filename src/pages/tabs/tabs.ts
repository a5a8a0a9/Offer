import { Component } from '@angular/core';

import { QandaPage } from '../qanda/qanda';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
//import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = QandaPage;
    tab2Root = HomePage;
    tab3Root = ContactPage;

  constructor() {

  }

}
