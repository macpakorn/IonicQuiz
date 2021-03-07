import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() list: any;
  constructor(private pop: PopoverController, private fs: AngularFirestore, public router: Router) { }

  ngOnInit() {
  }

  delete() {
    this.fs.doc('quiz/' + this.list.id).delete();
    this.pop.dismiss();
  }

  edit() {
    const list = JSON.stringify(this.list);
    this.router.navigate(['editpage', list]);
    this.pop.dismiss();
  }
}
