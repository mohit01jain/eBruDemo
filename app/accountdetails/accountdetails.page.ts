import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController, NavController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {LedgerServiceService} from '../Providers/ledger-service/ledger-service.service';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.page.html',
  styleUrls: ['./accountdetails.page.scss'],
})
export class AccountdetailsPage implements OnInit {

  public ledgerResultModel: any = [];
  public AcntId: any;
  public ledgerResult: any = [];
  public ATrnDate1: any =[];
  public AcntName: any=[];
  private VoucherNo: any = [];
  private AtrnTypeText: any=[];
  private DebitAmount: any=[];
  private CreditAmount: any =[];
  public  Amount: any=[];
  public  ATrnDate: any=[] ;
  //public  ATrnDate : any;
  public  LedgerAccountDetails: any=[];
  private pageIndex: any=1;
  private pageSize: any=20;
  public  ledgerAcntName1 : any;
  public  OpeningBalance: any;
  public  ClosingBalance: any;
  public ledgerResultModel1: any=[];
  public length: any;
  public ledgerResultModel2: any[][] =[this.ATrnDate, this.AcntName, this.VoucherNo, this.Amount];

  public multi:number[][] = [[1,2,3],[23,24,25]];
  //public data = {DebitAmount: '', CreditAmount: '', ATrnDate: '', AtrnTypeText: '', BalanceAmt: '', VoucherNo: ''};





  constructor(public activatedRoute: ActivatedRoute, public navCtrl: NavController,
              public storage: Storage,
              public alertCtrl: AlertController, public platform: Platform,
              public ledgerProvider: LedgerServiceService) {


    this.ledgerAcntName1 = this.activatedRoute.snapshot.paramMap.get("AcntName");
    this.AcntId = this.activatedRoute.snapshot.paramMap.get("AcntId");
    this.OpeningBalance = this.activatedRoute.snapshot.paramMap.get("OpeningBalance");
    this.ClosingBalance = this.activatedRoute.snapshot.paramMap.get("ClosingBalance");

    console.log("Account name " + this.ledgerAcntName1);
    console.log("Account Id " + this.AcntId);

    this.RetrieveLedgerAccountDetails( this.pageIndex, this.pageSize , this.AcntId);

  }

  ngOnInit() {
  }


  public RetrieveLedgerAccountDetails(pageIndex, pageSize, AcntId) {

    this.ledgerProvider.RetrieveLedgerAccountDetails(pageIndex, pageSize, AcntId).then(res => {
      this.ledgerResult = res;
      //console.log("All Details " + JSON.stringify(this.ledgerResult));

      this.ledgerResultModel1 = this.ledgerResult.LedgerAccountDetails;
      this.length = this.ledgerResultModel1.length;
      console.log("All Details " + JSON.stringify(this.ledgerResultModel1));



      //console.log("ledger Result=" + JSON.stringify(this.ledgerResult));
      //console.log(this.ledgerResult.AcntName);


      /*for (let i=1;i<=this.length;i++)
      {

      this.ATrnDate1[i] = this.ledgerResultModel1[i].ATrnDate;
      console.log("ATrnDate " + JSON.stringify(this.ATrnDate1[i]));


        this.AtrnTypeText[i] = this.ledgerResultModel1[i].AtrnTypeText;

      this.AcntName[i] =  this.ledgerResultModel1[i].AcntName;
      console.log("AcntName " + JSON.stringify(this.AcntName[i]));


      this.VoucherNo[i] = this.ledgerResultModel1[i].VoucherNo;
        console.log("VoucherNo " + JSON.stringify(this.VoucherNo[i]));


        this.DebitAmount[i] = this.ledgerResultModel1[i].DebitAmount;


        this.CreditAmount[i] = this.ledgerResultModel1[i].CreditAmount;


      if (this.DebitAmount[i]==0)

        {this.Amount[i] = this.CreditAmount[i] + " Cr";
          console.log("Amount " + JSON.stringify(this.Amount[i]));


        }

      else

        {this.Amount[i] = this.DebitAmount[i] + " Dr";
          console.log("Amount " + JSON.stringify(this.Amount[i]));
        }


         this.ledgerResultModel2[i] =[this.ATrnDate1[i], this.AcntName[i], this.VoucherNo[i], this.Amount[i]];
        console.log("Newly inserted details " + JSON.stringify(this.ledgerResultModel2[i]));




    }*/

      for (let i=0;i<=this.length;i++)
      {
        if(this.ledgerResultModel1[i].DebitAmount==0)
        {
          this.ledgerResultModel1[i].DebitAmount =  this.ledgerResultModel1[i].CreditAmount + " Cr";
        }
        else {
          this.ledgerResultModel1[i].DebitAmount = this.ledgerResultModel1[i].DebitAmount +" Dr"
        }

      }



      console.log("Newly inserted details " + JSON.stringify(this.ledgerResultModel1));

    });
  }
}

