import {Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {AlertController, NavController, /*NavParams,*/ Platform} from '@ionic/angular';
import {LedgerServiceService} from '../Providers/ledger-service/ledger-service.service';


@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
})
export class LedgerPage implements OnInit {

  public ledgerResult: any = [];
  public ledgerResultModel: any = [];
  public partyName: any;
  public partyDetail: any;
  public partyAcntId: any;
  public OpeningBalance: any;
  public ClosingBalance: any;
  public AcntName: any;
  public AcntId: any;
  public data = {DebitAmount: '', CreditAmount: '', ATrnDate: '', AtrnTypeText: '', BalanceAmt: '', VoucherNo: ''};
  private Acntname: any;
  private TotalDr: any;
  private pageIndex: any = 1;
  private extendedledgerResult: any = [];
  private pageSize: any = 20;
  private Flag1: boolean = true;
  public  spinner: boolean;
  private val: any;
  public abcd1: any;

  constructor(public navCtrl: NavController,
              // public navParams: NavParams,
              public storage: Storage,
              public alertCtrl: AlertController, public platform: Platform,
              public ledgerProvider: LedgerServiceService) {

    this.storage.get('AcntId').then(data => {
      this.AcntId = data;
      console.log("part detail = " + JSON.stringify(this.AcntId));
      if (this.AcntId == null) {
        this.presentConfirm();         // this.navCtrl.push(PartySelectionPage,{"pageName":"LedgerPage"});
      } else {
        this.storage.get("companyName").then(res => {
          this.partyName = res;
          this.RetrieveLedgerAccount(this.pageIndex, this.pageSize);
        });
      }

    });

  }

  ZeroClosingBalanceAccounts() {
    this.pageIndex = 1;
    if (this.Flag1 == true) {
      this.Flag1 = false;
    } else {
      this.Flag1 = true;
    }
    //this.Flag1= 1;


    this.storage.get('AcntId').then(data => {
      this.AcntId = data;
      console.log("part detail = " + JSON.stringify(this.AcntId));
      if (this.AcntId == null) {
        this.presentConfirm();         // this.navCtrl.push(PartySelectionPage,{"pageName":"LedgerPage"});
      } else {
        this.storage.get("companyName").then(res => {
          this.partyName = res;
          this.RetrieveLedgerAccount(this.pageIndex, this.pageSize);
        });
      }

    });

  }



  ngOnInit() {
    console.log('ionViewDidLoad LedgerPage');

  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Warning!! ',
      message: 'Please Select Party',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.navigateRoot(['/home', {"pageName": "LedgerPage"}]);
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            // this.navCtrl.setRoot(PartySelectionPage,{"pageName":"LedgerPage"});
            console.log('Buy clicked');
          }
        }
      ]
    });
    await alert.present();
  }


  RetrieveLedgerAccount(pageIndex, pageSize) {

    this.ledgerProvider.RetrieveLedgerAccountList(pageIndex, pageSize, this.Flag1, "" ).then(res => {
      this.ledgerResult = res;
      console.log("ledger Result=" + JSON.stringify(this.ledgerResult));
      this.Acntname = this.ledgerResult.Acntname;
      this.OpeningBalance = this.ledgerResult.OpeningBalance;
      this.ClosingBalance = this.ledgerResult.ClosingBalance;
      this.ledgerResultModel = this.ledgerResult.LedgerAccountModel;

      console.log("===model list===" + this.ledgerResultModel);

    })


  }


  doInfinite(event) {
    console.log('Scroll operation');

    console.log("--page no--" + this.pageIndex);

    setTimeout(() => {
      this.pageIndex = this.pageIndex + 1;
      console.log("idhar aa raha hai ddd");
      this.ledgerProvider.RetrieveLedgerAccountList(this.pageIndex, this.pageSize, this.Flag1, "").then((data) => {
        console.log(data);
        this.extendedledgerResult = data;
        console.log("---extendable listview----" + this.extendedledgerResult);
        for (var i = 0; i < this.extendedledgerResult.LedgerAccountModel.length; i++) {
          this.ledgerResultModel.push(this.extendedledgerResult.LedgerAccountModel[i]);
        }
      });
      console.log("idhar aa raha hai");
      event.target.complete();
    }, 500);
  }


  showDetails(data) {
    this.navCtrl.navigateForward(['/accountdetails', {

      'AcntId': data.AcntId,

      //console.log("AcntId " + JSON.stringify(data.AcntId));
      'AcntName': data.AcntName,
      'OpeningBalance' :data.OpeningBalance,
      'ClosingBalance' :data.ClosingBalance,


      page: 'ledger'

    }
      //this.abcd1 = data.AcntId;
    ]);


    console.log("AcntId " + JSON.stringify(this.ledgerResult.LedgerAccountModel.AcntId));
    console.log("Acntname " + JSON.stringify(this.ledgerResult.LedgerAccountModel.AcntName));

    //console.log("AcntId " + JSON.stringify(this.ledgerResult.ledgerResultModel.AcntId));
    //console.log("Acntname " + JSON.stringify(this.ledgerResult.ledgerResultModel.AcntName));

    //console.log("AcntId " + JSON.stringify(this.ledgerResult.AcntId));
    //console.log("Acntname " + JSON.stringify(this.ledgerResult.AcntName));


  }


 // getItems(ev: any) {
  //  let val = ev.target.value;

  getItems(ev: any) {
     this.val = ev.target.value;
    if (this.val.length > 2) {
      this.openSearchPage(this.pageIndex, this.pageSize, this.val);
    }

  }

  openSearchPage(pageIndex, pageSize, val) {

      this.ledgerProvider.RetrieveLedgerAccountList(pageIndex, pageSize,this.Flag1 ,val ).then(res => {

        this.ledgerResult = res;
        console.log("ledger Result=" + JSON.stringify(this.ledgerResult));
        this.Acntname = this.ledgerResult.Acntname;
        this.OpeningBalance = this.ledgerResult.OpeningBalance;
        this.ClosingBalance = this.ledgerResult.ClosingBalance;
        this.ledgerResultModel = this.ledgerResult.LedgerAccountModel;
        console.log("===model list===" + JSON.stringify(this.ledgerResultModel));

      })

    }

}




