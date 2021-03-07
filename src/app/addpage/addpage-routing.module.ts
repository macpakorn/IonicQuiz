import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpagePage } from './addpage.page';

const routes: Routes = [
  {
    path: '',
    component: AddpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpagePageRoutingModule {}
