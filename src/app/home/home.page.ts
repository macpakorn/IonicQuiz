import { PopoverComponent } from './../popover/popover.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  quiz: any = [];
  No = '0';
  rdvalue: any = '';
  anscheck = false;
  constructor(
    private fs: AngularFirestore,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public pop: PopoverController
  ) {}

  ngOnInit() {
    this.readData().subscribe(data => {
      this.quiz = data.map( e => {
        return{
          id: e.payload.doc.data()['id'.toString()],
          quizNo: e.payload.doc.data()['quizNo'.toString()],
          que: e.payload.doc.data()['que'.toString()],
          chA: e.payload.doc.data()['chA'.toString()],
          chB: e.payload.doc.data()['chB'.toString()],
          chC: e.payload.doc.data()['chC'.toString()],
          chD: e.payload.doc.data()['chD'.toString()],
          correct: e.payload.doc.data()['correct'.toString()],
        };
      });
      if (this.quiz.length === 0) {
        this.No = '1';
      } else {
        for (const i of this.quiz) {
          if (Number(i.quizNo) >= Number(this.No)) {
            this.No = String(Number(i.quizNo) + 1);
          }
        }
      }
    });
  }
  gotoaddpage() {
    this.ngOnInit();
    this.navCtrl.navigateForward('/addpage/' + this.No);
  }
  readData() {
    return this.fs.collection('quiz').snapshotChanges();
  }
  submit(list: any) {
    this.anscheck = false;
    for (const i of list.correct) {
      if (i === this.rdvalue) {
        this.anscheck = true;
        break;
      }
    }
    if (this.anscheck === true) {
      this.result('Your answer is correct')
    } else {
      this.result('Your answer is incorrect')
    }
  }

  async result(text: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Result',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentPopover(recive: any, ev: any) {
    const popover = await this.pop.create({
      component: PopoverComponent,
      event: ev,
      cssClass: 'my-custom-class',
      componentProps: { list: recive},
      translucent: true
    });
    return await popover.present();
  }
}
