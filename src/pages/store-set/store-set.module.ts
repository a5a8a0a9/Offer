import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreSetPage } from './store-set';

@NgModule({
  declarations: [
    StoreSetPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreSetPage),
  ],
})
export class StoreSetPageModule {}
