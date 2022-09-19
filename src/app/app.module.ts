import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//pipe
import { LongText30, LongText15, LongText6, OrderBy } from '../pages/pipe/pipe';
//import { LongText15 } from '../pages/pipe/pipe';
//import { OrderBy } from '../pages/pipe/pipe';

//---page
import { MenuPage } from '../pages/menu/menu';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ExamPage } from '../pages/exam/exam';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResultPage } from '../pages/result/result';
import { DetailPage } from '../pages/detail/detail';
import { StoreDetailPage } from '../pages/store-detail/store-detail';
import { QandaPage } from '../pages/qanda/qanda';
import { StoreSetPage } from '../pages/store-set/store-set';
//page^^

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        LongText30,
        LongText15,
        LongText6,
        OrderBy,
        MyApp,
        MenuPage,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        ExamPage,
        LoginPage,
        RegisterPage,
        ResultPage,
        DetailPage,
        StoreDetailPage,
        QandaPage,
        StoreSetPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MenuPage,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        ExamPage,
        LoginPage,
        RegisterPage,
        ResultPage,
        DetailPage,
        StoreDetailPage,
        QandaPage,
        StoreSetPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
