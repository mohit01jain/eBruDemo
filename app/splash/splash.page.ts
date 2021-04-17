import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor() {
    console.log("SplashPage");
  }
  public showSplash = true ;

  ngOnInit() {
  }

}
