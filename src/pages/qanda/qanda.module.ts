import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QandaPage } from './qanda';

@NgModule({
  declarations: [
    QandaPage,
  ],
  imports: [
    IonicPageModule.forChild(QandaPage),
  ],
})
export class QandaPageModule {}
