import {Component, OnInit /*ViewChild*/} from '@angular/core';
import {NavController, /*NavParams,*/ ToastController} from '@ionic/angular';
import {UserService} from '../Providers/user/user.service';
import {IonicPage, Searchbar} from 'ionic-angular';
/*
import {el} from "@angular/platform-browser/testing/src/browser_util";
*/

@IonicPage()

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.page.html',
  styleUrls: ['./customer-registration.page.scss'],
})
export class CustomerRegistrationPage implements OnInit {
 /* @ViewChild('si')*/ searchInput: Searchbar;
  public pageNo:any = 1;
  public selectDate:any = false;
  public recordCount:any = 15;
  public listResult:any = [];
  public extendedList:any = [];
  public searchByType:any;
  public searchByStr:any;
  public fromDate:any;
  public toDate:any;
  public myDate:any;


  constructor(public navCtrl: NavController, /*public navParams: NavParams,*/public userProvider: UserService,
              public toastCtrl:ToastController)
   {
     this.myDate = new Date().toISOString();
     this.searchByType = 1;
     this.searchByStr = "";
     this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,"","");
   }

  ngOnInit() {
    console.log('ionViewDidLoad CustomerRegistrationPage');
    console.log("setFocus()", this.searchInput);
  }

  getRegisteredUserList(pageNo,recordCount,searchByType,strValue,fromDate,toDate){
    this.userProvider.getRegisteredUserList(pageNo,recordCount,searchByType,strValue,fromDate,toDate).then(res=>{
      this.listResult = res;
      console.log("---list result--- "+JSON.stringify(this.listResult));
    })
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNo = this.pageNo +1;
    console.log("--page no--"+this.pageNo);

    setTimeout(() => {
      this.userProvider.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,this.fromDate,this.toDate).then(res=>{
        this.extendedList = res;
        console.log("---list result--- "+JSON.stringify(this.listResult));
        for (var i=0;i<this.extendedList.length;i++){
          this.listResult.push(this.extendedList[i]);
        }
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  searchBy(selectBy){
    console.log("search by = "+selectBy);
    if (selectBy == 1){
      this.searchByType = 1;
      this.selectDate = false;
      this.searchByStr = "";
      this.pageNo = 1;
      this.listResult = [];
      this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,"","");

    }else {
      this.selectDate = true;
      this.searchByType = 2;
      console.log("from date = "+this.fromDate);
      this.pageNo = 1;
      this.listResult = [];
      this.searchByStr = "";
      this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,"","");
    }
  }

  searchCustomer(ev: any){
    let val = ev.target.value;
    this.searchByStr = val;
    console.log("---search by---- "+this.searchByStr);
    this.pageNo = 1;
    this.listResult = [];
    if (typeof this.searchByStr == "undefined"){
      this.searchByStr = "";
      val = "";
    }
    if (val.length > 0) {
      this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,"","");
    }else {
      this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,"","","");

    }
  }

  searchBytoDate(){
    this.pageNo = 1;
    if (typeof this.fromDate == "undefined" || typeof this.toDate == "undefined"){
      console.log("Cannot be null");
    } else {
      if (this.toDate < this.fromDate){
        console.log("toDate cannot be less than from date");
        this.presentToast("To Date cannot be less than From date")
        this.toDate = "";
      }else {
        this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,this.fromDate,this.toDate);
      }
    }
  }

  searchByfromDate(){
    console.log("dfsfidf");
    this.pageNo = 1;
    if (typeof this.toDate == "undefined"){
      this.toDate = this.fromDate;
      this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,this.fromDate,this.toDate);
    } else {
      if (this.toDate < this.fromDate){
        this.toDate = this.fromDate;
        this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,this.fromDate,this.toDate);
      } else {
        this.getRegisteredUserList(this.pageNo,this.recordCount,this.searchByType,this.searchByStr,this.fromDate,this.toDate);
      }
    }

  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });

    /*toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });*/

    await toast.present();
  }


}
