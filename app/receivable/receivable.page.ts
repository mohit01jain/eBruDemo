import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {ArapServiceService} from '../Providers/arap-service/arap-service.service';

@Component({
  selector: 'app-receivable',
  templateUrl: './receivable.page.html',
  styleUrls: ['./receivable.page.scss'],
})
export class ReceivablePage implements OnInit {

  public arapReceiverList:any =[];
  public totalRecAmount:any;
  public dueAmount:any;
  public notDue:any;
  public arapModelList:any =[];
  public selectedAccount:any;
  public pageNo:any;
  public searchStr:any;
  public extentedAcntList:any =[];
  public extentedAcntModelList:any =[];
  public visible:any = false;
  private content: any;

/*
  @ViewChild(Content) content: Content;
*/


  constructor(public navCtrl: NavController,public arapProvider:ArapServiceService,
              public myElement: ElementRef,public platform: Platform,) {
    this.pageNo = 1;
    this.retrieveArapAllReceivable("00000000-0000-0000-0000-000000000000",1,"",20);
  }

  ngOnInit() {
    console.log('ionViewDidLoad ReceivablePage');

  }

  getScrollPosition(){
    console.log("scroll position = "+this.content.scrollHeight);
  }

  scrollToTop() {
    this.content.scrollToTop();
    this.visible = false;
  }

  AccountDetail(selectedDAta)
  {
    this.selectedAccount = selectedDAta;
    // console.log("---selected data----"+JSON.stringify(this.selectedAccount));
    this.navCtrl.navigateForward(['/account-details',{selectedAccount:this.selectedAccount}]);
  }

  retrieveArapAllReceivable(acntId,pageNo,str,pageSize){
    this.arapProvider.RetrieveArapRecievablePayable(acntId, pageNo,str, pageSize).then(res=>{
      this.arapReceiverList = res;
      console.log("---list----"+JSON.stringify(this.arapReceiverList));
      this.totalRecAmount = this.arapReceiverList.ClosingTotal;
      this.dueAmount = this.arapReceiverList.DueClosingTotal;
      this.notDue = this.totalRecAmount - this.dueAmount;
      this.arapModelList = this.arapReceiverList.ArapRecievablePayableModel
      console.log("===model list==="+this.arapModelList);
    })
  }

  getAccount(ev: any){
    this.searchStr = ev.target.value;
    // if the value is an empty string don't filter the items
    if (this.searchStr && this.searchStr.trim() != '') {
      this.retrieveArapAllReceivable("00000000-0000-0000-0000-000000000000","1",this.searchStr,20);
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNo = this.pageNo +1;
    console.log("--page no--"+this.pageNo);
    this.visible = true;

    setTimeout(() => {
      this.arapProvider.RetrieveArapRecievablePayable("00000000-0000-0000-0000-000000000000", this.pageNo,this.searchStr, 20).then(res=>{
        console.log(res);
        this.extentedAcntList = res;
        this.extentedAcntModelList = this.extentedAcntList.ArapRecievablePayableModel;
        console.log("---extendable listview----"+this.extentedAcntModelList.length);
        for (var i=0;i<this.extentedAcntModelList.length;i++){
          this.arapModelList.push(this.extentedAcntModelList[i]);
        }
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
