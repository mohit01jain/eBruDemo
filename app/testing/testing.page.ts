import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
  private users: Observable<any>;

  constructor(public navCtrl: NavController, private httpClient: HttpClient,
  private plt: Platform, private alertCtrl: AlertController)

  {
    this.users = this.httpClient.get('https://randomuser.me/api/?results=20')
        .map(res => res['results'])


  }

  ngOnInit() {
  }

}
