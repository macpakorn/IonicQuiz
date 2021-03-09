import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class Question { quizNo: string; que: string; chA: string; chB: string; chC: string; chD: string; correct: string; }

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.page.html',
  styleUrls: ['./addpage.page.scss'],
})
export class AddpagePage implements OnInit {
  private QuizCollection: AngularFirestoreCollection<Question>;
  quiz: Observable<Question[]>;
  addlist: any = { que: '', chA: '', chB: '', chC: '', chD: '', correct: {}};
  Anstatus: any = { boolA: false, boolB: false, boolC: false, boolD: false};
  CorAns = [];
  No: string;

  constructor(
    public navctrl: NavController,
    private fs: AngularFirestore,
    public actroute: ActivatedRoute,
    private alertCtrl: AlertController,
    )
  {
    this.QuizCollection = fs.collection<Question>('quiz');
    this.quiz =  this.QuizCollection.valueChanges({ idField: 'customID'});
  }

  ngOnInit() {
    this.No = this.actroute.snapshot.paramMap.get('No');
  }

  back() {
    this.navctrl.pop();
  }

  addquiz() {
    this.CorAns = [];
    if (this.Anstatus.boolA === true) {
      this.CorAns.push(this.addlist.chA);
    }
    if (this.Anstatus.boolB === true) {
      this.CorAns.push(this.addlist.chB);
    }
    if (this.Anstatus.boolC === true) {
      this.CorAns.push(this.addlist.chC);
    }
    if (this.Anstatus.boolD === true) {
      this.CorAns.push(this.addlist.chD);
    }
    this.addlist.correct = this.CorAns;
    const quizNo = this.No;
    const que = this.addlist.que;
    const chA = this.addlist.chA;
    const chB = this.addlist.chB;
    const chC = this.addlist.chC;
    const chD = this.addlist.chD;
    const correct = this.addlist.correct;
    const addQ: Question = {quizNo, que, chA, chB, chC, chD, correct};
    if (que === '' || chA === '' || chB === '' || chC === '' || chD === '') {
      this.addalert('Please complete the form');
    } else if (correct.length === 0 ) {
      this.addalert('Please select your correct answer at least one');
    } else if ( chA == chB || chA == chC || chA == chD || chB == chC || chB == chD || chC == chD ) {
      this.addalert('Please do not give the same answer');
    } else {
      this.QuizCollection.doc(quizNo).set(addQ);
      this.clear();
      this.addalert('Suceesfully');
    }

  }

  clear(){
    this.addlist.que = '';
    this.addlist.chA = '';
    this.addlist.chB = '';
    this.addlist.chC = '';
    this.addlist.chD = '';
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
