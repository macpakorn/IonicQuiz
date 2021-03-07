import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpagePageRoutingModule } from './addpage-routing.module';

import { AddpagePage } from './addpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpagePageRoutingModule
  ],
  declarations: [AddpagePage]
})
export class AddpagePageModule {}
