import {Component, OnInit} from '@angular/core';
import {Events,LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {ProductServiceService} from '../Providers/product-service/product-service.service';
import {UserService} from '../Providers/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';

/*
import {ViewController} from '@ionic/angular';
*/

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  public item_name:any;
  public itemDetail:any =[];
  public ourRate:any;
  public mrpRate:any;
  public closingStock:any;
  public itemCount:any;
  public addData: any = [];
  public itemsQuantity: any;
  public no_of_items: any;
  public totalAmount: any;
  public addIndexList: any = [];
  public ItemList: any = [];
  public itemIndex:any;
  public itemPresent:any = false;
  public companyName:any;
  public mrpVisible:any=true;
  public imageList:any=[];
  public ItemPackagingList: any = [];
  public ItemImageList: any = [];
  spinner: boolean;

  constructor(public navCtrl: NavController,/*public viewCtrl : ViewController,*/ public events: Events,
              public storage: Storage, /*public productServiceProvider: ProductServiceService,*/ public global: UserService,
              public loadingCtrl: LoadingController, private toastCtrl: ToastController, public platform:Platform,
              public router:Router,public activatedRoute: ActivatedRoute) {

    this.ItemList = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    // this.ItemList = this.activatedRoute.snapshot.paramMap.get('data');
    console.log("item detail = "+JSON.stringify(this.ItemList));

    this.imageList = this.ItemList.ItemPackagingList[0].ItemImageList;
    console.log("-----image list---RS-"+JSON.stringify(this.imageList));

    this.itemIndex = this.activatedRoute.snapshot.paramMap.get('index');
    console.log("item index = "+JSON.stringify(this.itemIndex));

    events.subscribe('ItemLength', (isShow) => {
      this.itemCount = isShow;
      if (this.itemCount == null || this.itemCount == 0){
        console.log("No items found");
      } else {
        console.log('----itemList------' + this.itemCount);
      }

    });

    this.storage.get('companyName').then(res=>{
      this.companyName = res;
    });

    this.storage.get('addData').then((list) => {
      this.addData = list;
      console.log("------add list------ "+JSON.stringify(list));
      if (this.addData == ""){

      } else {
        for (var i=0;i<this.addData.length;i++){
          console.log("item id = "+this.addData[i].ItemId);
          if (this.addData[i].ItemId == this.ItemList.ItemId){
            console.log("item found");
            this.itemPresent = true;
          }
        }
      }
    });
    this.storage.get('itemnCount').then((list) => {
      this.itemCount = list;
      // this.quantities=list;
      console.log('---quantities---' + this.itemCount);
      if (this.itemCount == null || this.itemCount == 0) {
        console.log("No item found");
        this.totalAmount = 0;
      }
    });


    this.storage.get('globalArray').then((list) => {
      this.global.getItemCount = list;
      console.log('---global---' + this.global.getItemCount);

    });
    events.subscribe('totalAmount', (isShow) => {
      this.totalAmount = isShow;
      console.log(this.itemCount);
    });
    storage.get('totalProductAmount').then((isLoginResult) => {
      console.log('---total amount ---'+isLoginResult);
      if (this.itemCount == null || this.itemCount == 0) {
        console.log("No item found");
        this.totalAmount = 0;
      }else {
        this.totalAmount = isLoginResult;
      }
    });
    storage.get('noOfItems').then((isLoginResult) => {
      console.log(isLoginResult);
      this.no_of_items = isLoginResult;
    });
    storage.get('getIndex').then((isLoginResult) => {
      console.log(isLoginResult);
      this.addIndexList = isLoginResult;

    });
    events.subscribe('packingValue', (isShow) => {
      this.no_of_items = isShow;
      console.log('---event-----' + this.no_of_items);
    });

    this.itemsQuantity = 0;


  }

  ngOnInit() {
    console.log('ionViewDidLoad ItemDetailsPage');

    // JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    this.itemDetail = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    console.log("-----------"+this.itemDetail);
    this.ourRate = this.itemDetail.ItemPackagingList[0].OurRate; //////////////////////
    console.log(this.ourRate);
    this.mrpRate = this.itemDetail.ItemPackagingList[0].MRPRate;
    console.log(this.mrpRate);
    this.closingStock = this.itemDetail.ItemPackagingList[0].ClosingStock;
    console.log(this.closingStock);

    if(this.mrpRate <= this.ourRate)
    {
      this.mrpVisible=false;
    }
  }

  ionViewDidLoad() {
    // this.initializeBackButtonCustomHandler();



  }

  openSearchPage(){
    this.navCtrl.navigateForward(['/search-item']);
  }

  /*closeModal(){
    this.viewCtrl.dismiss();
  }*/

  gotoCartPage() {
    if (this.itemCount > 0) {
      // for(let i=0;i<this.ItemList.length;i++)
      // {
      //   this.ItemList[i].ItemPackagingList[0].Quantity =0;
      // }
      this.navCtrl.navigateForward(['/cart',{page:'itemList'}]);
    }
    else {

      this.presentToast();
    }
  }

  goToCart(){
    this.navCtrl.navigateForward(['/cart',{page:'itemList'}]);
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'The cart is empty. Please add items to cart.',
      duration: 3000,
      position: 'bottom'
    });
  /*  toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });*/
    await toast.present();
  }

    async addToCart(){


    //this.itemDetail.ActionFlag = 1;      // nitin
    this.storage.get('addData').then(async (list) => {
      var itemFound = false;
      console.log('list :' + JSON.stringify(list));

      if (list != null) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].ItemId == this.ItemList.ItemId) {
            itemFound = true;
            list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + 1;
            list[i].ActionFlag = 1;
            console.log("quantity = " + list[i].ItemPackagingList[0].Quantity);
            const loading = await this.loadingCtrl.create({
              message: 'Please wait...'
            });
            await loading.present();
            this.totalAmount = this.totalAmount + this.ItemList.ItemPackagingList[0].OurRate;
            await loading.dismiss();
          }
        }

        if (list.length == 0)                //Vishal Sir
          this.itemCount = list.length;
      }

      else {
        list = [];
        this.itemCount = 0;                 //Vishal Sir
      }

      console.log("item serial no 5 item-details  = " + this.itemCount);

      console.log("item sale rate item-details = " + this.itemDetail.ItemPackagingList[0].SaleRate);



      if (!itemFound) {
        this.itemDetail.ItemPackagingList[0].Quantity = 1;
        this.itemDetail.ActionFlag = 1;
        //this.itemCount++;
        console.log("item serial no = " + this.itemCount);
        this.itemDetail.SrNo = this.itemCount + 1;
         this.ItemList.ItemPackagingList[0].Quantity = 1;
         this.ItemList.ActionFlag=1; // nitin
        this.ItemList.ActionFlag = 1;
        list.push(this.ItemList);
        this.totalAmount = this.totalAmount + this.ourRate;
        this.itemCount++;
        console.log(this.itemCount);
      }
      console.log('list: ' + JSON.stringify(list));
      await this.storage.set('addData', list);
      this.events.publish('ItemLength', this.itemCount);
      await this.storage.set('itemnCount', this.itemCount);

      await this.storage.set('totalProductAmount', this.totalAmount);
      this.events.publish('totalAmount', this.totalAmount);
      //this.navCtrl.navigateForward(['/cart',{page:'itemList'}]);
      // this.navCtrl.navigateForward(['/cart',{page:'item-details'}]); comment by nitin
      //await this.navCtrl.navigateForward(['/cart', {page: 'itemList'}]);
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();
      await this.navCtrl.navigateForward(['/cart', {

        "ItemLength": this.itemCount,
        "itemnCount": this.itemCount,
        "totalProductAmount": this.totalAmount,
        page: 'itemList'
      }]);
      await loading.dismiss();
    });

  }

/*
  increment(index: number, OurRate, selectedItem) {
    console.log('--OurRate--'+OurRate);

    // selectedItem.ItemPackagingList[0].Quantity = selectedItem.ItemPackagingList[0].Quantity + step;
    // console.log('ITem Quantity: ' + selectedItem.ItemPackagingList[0].Quantity);
    this.storage.get('addData').then(async (list) => {
      var itemFound = false;
      console.log('list: ' + list);
      if (list != null) {
        // console.log('-length--' + list.length + '--count----' + count);
        for (var i = 0; i < list.length; i++) {
          if (list[i].ItemId == selectedItem.ItemId) {
            itemFound = true;
            // list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + step;
            // console.log('---amount--'+this.totalAmount+'---multiple---'+selectedItem.ItemPackagingList[0].OurRate *step);
            const loading = await this.loadingCtrl.create({
              message: 'Please wait...'
            });
            await loading.present();
            this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
            loading.dismiss();
            if (itemFound && list[i].ItemPackagingList[0].Quantity == 0) {

              const index: number = list.indexOf(i);
              if (index !== 0) {
                list.splice(i, 1);
                this.itemCount--;
                const loading = await this.loadingCtrl.create({
                  message: 'Please wait...'
                });
                await loading.present();
                this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].OurRate * selectedItem.ItemPackagingList[0].Quantity);
                loading.dismiss();
              }
            }
          }
        }
      } else {
        list = [];
      }

      if (!itemFound) {
        list.push(selectedItem);
        this.totalAmount = this.totalAmount + OurRate;
        this.itemCount++;
      }
      console.log('list: ' + JSON.stringify(list));
      this.storage.set('addData', list);
      this.events.publish('ItemLength', this.itemCount);
      this.storage.set('itemnCount', this.itemCount);

      this.storage.set('totalProductAmount', this.totalAmount);
      this.events.publish('totalAmount', this.totalAmount);
    });

  }
*/

  getItems($event: CustomEvent<any>) {

  }
}


