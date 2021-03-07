import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.page.html',
  styleUrls: ['./editpage.page.scss'],
})
export class EditpagePage implements OnInit {
  List: any = [];
  Anstatus: any = { boolA: false, boolB: false, boolC: false, boolD: false};
  CorAns = [];

  constructor(
    public actroute: ActivatedRoute,
    public navctrl: NavController,
    private alertCtrl: AlertController,
    private fs: AngularFirestore,
    ) { }

  ngOnInit() {
    const dataRev = this.actroute.snapshot.paramMap.get('list');
    const list = JSON.parse(dataRev);
    this.List = list;
    for (const i of this.List.correct) {
      if (i === this.List.chA) {
        this.Anstatus.boolA = true;
      } else if (i === this.List.chB) {
        this.Anstatus.boolB = true;
      } else if (i === this.List.chC) {
        this.Anstatus.boolC = true;
      } else if (i === this.List.chD) {
        this.Anstatus.boolD = true;
      }
    }
    console.log(this.List.id);
  }

  back() {
    this.navctrl.pop();
  }

  editquiz() {
    this.CorAns = [];
    if (this.Anstatus.boolA === true) {
      this.CorAns.push(this.List.chA);
    }
    if (this.Anstatus.boolB === true) {
      this.CorAns.push(this.List.chB);
    }
    if (this.Anstatus.boolC === true) {
      this.CorAns.push(this.List.chC);
    }
    if (this.Anstatus.boolD === true) {
      this.CorAns.push(this.List.chD);
    }
    this.List.correct = this.CorAns;
    if (this.List.que === '' || this.List.chA === '' || this.List.chB === '' || this.List.chC === '' || this.List.chD === '') {
      this.addalert('Please complete the form');
    } else if (this.List.correct.length === 0 ) {
      this.addalert('Please select your correct answer at least one');
    } else {
      this.fs.doc('quiz/' + this.List.id).update({
        que: this.List.que,
        chA: this.List.chA,
        chB: this.List.chB,
        chC: this.List.chC,
        chD: this.List.chD,
        correct: this.List.correct,
      });
      this.addalert('Suceesfully');
    }
  }

  clear(){
    this.List.que = '';
    this.List.chA = '';
    this.List.chB = '';
    this.List.chC = '';
    this.List.chD = '';
    this.Anstatus = { boolA: false, boolB: false, boolC: false, boolD: false};
  }

  async addalert(text: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Result',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}
