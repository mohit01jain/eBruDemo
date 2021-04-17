import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {LedgerServiceService} from '../Providers/ledger-service/ledger-service.service';

@Component({
  selector: 'app-accountdetailsmonthly',
  templateUrl: './accountdetailsmonthly.page.html',
  styleUrls: ['./accountdetailsmonthly.page.scss'],
})
export class AccountdetailsmonthlyPage implements OnInit {
  public AcntName1: any;
  public ledgerResultModel:any=[];
  public ledgerResult: any;
  public AcntId: string;
  public AcntName: any;

  constructor(public activatedRoute: ActivatedRoute, public navCtrl: NavController,
              public storage: Storage, public ledgerProvider: LedgerServiceService ) {

    this.AcntName1 = this.activatedRoute.snapshot.paramMap.get("AcntName");
    this.AcntId = this.activatedRoute.snapshot.paramMap.get("AcntId");

    console.log("Account name " + this.AcntName);
    console.log("Account Id " + this.AcntId);

  }

  ngOnInit() {
  }

  showDetails(data: any) {

    this.navCtrl.navigateForward(['/accountdetails', {

      'AcntId': data.AcntId,
      'AcntName' : data.AcntName,
      page: 'ledger'

    }]);

    console.log("AcntId " + this.ledgerResult.AcntId);
    console.log("Acntname " + this.ledgerResult.AcntName);

  }
}
