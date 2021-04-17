import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  Events,
  /*ModalController,*/
  NavController,
  /*NavParams,*/
  Platform,
  /*PopoverController,*/
  ToastController
} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {UserService} from '../Providers/user/user.service';
import {ProductServiceService} from '../Providers/product-service/product-service.service';
import {Storage} from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {IonicPage, Searchbar} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  users: Observable<any>;

  // @ViewChild('si') searchInput: Searchbar;
  public ItemList: any = [];
  public headerTitle: any;
  itemFound: any = false;
  public addData: any = [];
  public itemCount: any;
  public totalAmount: any;
  public addIndexList: any = [];
  public total_product_amount: any;
  public no_of_items: any;
  public companyName: any;
  public itemsQuantity: any;
  public quantities: any = [];
  public displayId: any;
  public quantity: any;
  public discount:any;
  public ItemPackaging:any =[];
  public ourRate : any;
  public mrpRate:any;
  public userName:any;
  tooltipEvent: 'click' | 'press' = 'click';
  showArrow: boolean = true;
  duration: number = 2000;
  public isItemAlreadyInCart:any = false;
  spinner: boolean;
  public CurrentClosingBalance: any;
  public PendingOrderAmount: any;
  public IsNegativeStockAllowed: any;
  public CompanySetting: any = [];
  public RefreshCustomerRegistrationData: any = [];
  public userInfo: any;
  public CreditLimit: any;
  public RateCategory :any;


  constructor(public navCtrl: NavController,
              public events: Events, public storage: Storage, private httpClient: HttpClient,
              public productServiceProvider: ProductServiceService,
              public loadingCtrl:LoadingController , private toastCtrl: ToastController,
              /*public modalCtrl: ModalController,*/public userProvider: UserService,
              public global: UserService,public platform: Platform,
              public alertCtrl:AlertController,public router:Router,public activatedRoute: ActivatedRoute   ) {

    this.storage.get('userInfo').then((isLoginResult) => {
      if (isLoginResult != null) {
        this.userInfo = isLoginResult;
        console.log("userInfo------RS" + JSON.stringify(this.userInfo));
        this.userProvider.getRefreshCustomerRegistrationData(this.userInfo).then(res => {
          this.RefreshCustomerRegistrationData = res;
          console.log("RefreshCustomerRegistrationData List----RS---- " + JSON.stringify(this.RefreshCustomerRegistrationData));
          this.CompanySetting = this.RefreshCustomerRegistrationData.CompanySetting;
          this.IsNegativeStockAllowed = this.RefreshCustomerRegistrationData.CompanySetting.IsNegativeStockAllowed;
          if (this.IsNegativeStockAllowed == false) {
            console.log('----this.IsNegativeStockAllowed == false------');
          } else {
            console.log('----this.IsNegativeStockAllowed == true------');

          }


        });
      }
    });

    // this.users = this.httpClient.get('https://randomuser.me/api/?results=20')
    //     .map(res => res['results'])

    this.headerTitle = this.activatedRoute.snapshot.paramMap.get('name');
    this.setItemList(this.activatedRoute.snapshot.paramMap.get('id'));
    const abcde = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Value of Id is'+abcde );

    this.displayId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.itemCount = 0;

    // this.no_of_items=0;
    this.events.subscribe('ItemLength', (isShow) => {
      this.itemCount = isShow;
      console.log('----itemList------' + this.itemCount);
    });

    this.storage.get('addData').then((list) => {
      this.addData = list;
      console.log(list);
    });
    this.storage.get('RateCategory').then((ratcat) => {
      this.RateCategory = ratcat;
      console.log(ratcat);
    });

    this.events.subscribe('addData', (result)=>{
      this.addData = result;
      console.log(result);
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
    this.storage.get('totalProductAmount').then((isLoginResult) => {
      console.log('---total amount ---'+isLoginResult);
      if (this.itemCount == null || this.itemCount == 0) {
        console.log("No item found");
        this.totalAmount = 0;
      }else {
        this.totalAmount = isLoginResult;
      }
    });

    this.storage.get('userName').then(res=>{
      this.userName = res;
      console.log("username = "+this.userName);
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
    this.itemsQuantity = 0;                          //Vishal sir

    this.storage.get('companyName').then(res=>{
      this.companyName = res;
    });


  }

  ionViewDidLoad() {
    // this.initializeBackButtonCustomHandler();
    console.log('ionViewDidLoad ItemListPage');
    console.log("total amount = "+this.totalAmount);
  }

  ionViewDidEnter() {
    // setTimeout(()=>{
    //   this.searchInput.setFocus();
    // }, 150);
  }

  openSearchPage(){
    this.navCtrl.navigateForward(['/search-item']);
  }

  async setItemList(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.productServiceProvider.getItemList(id,this.RateCategory).then(res => {
      console.log(res);
      if (res == ""){
        this.itemFound = false;
        console.log("No items available");
        loading.dismiss();
      }
      else {
        this.itemFound = true;
        this.ItemList = res;
        this.ItemPackaging = this.ItemList[0].ItemPackagingList;

        console.log("---------"+this.ItemPackaging[0].OurRate);

        this.storage.get("addData").then(itemlist=>{
          if (itemlist != null){
            for (var i=0;i < itemlist.length;i++){
              for (var j=0; j<this.ItemList.length;j++){
                if (itemlist[i].ItemId == this.ItemList[j].ItemId){

                  this.
                      ItemList[j].ItemPackagingList[0].Quantity = itemlist[i].ItemPackagingList[0].Quantity;

                }
              }
            }
          }
        });
        // this.ourRate = this.ItemPackaging[0].OurRate;
        // this.mrpRate = this.ItemPackaging[0].MRPRate;
        // this.discount = ((this.mrpRate - this.ourRate)/this.mrpRate)*100;
        // console.log("discount = "+this.discount);
        loading.dismiss();
      }

    })
  }

  gotoCartPage() {
    if (this.itemCount > 0) {
      // for(let i=0;i<this.ItemList.length;i++)
      // {
      //   this.ItemList[i].ItemPackagingList[0].Quantity =0;
      // }
      this.navCtrl.navigateForward(['/cart' ,{page:'itemList'}]);
    }
    else {

      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'The cart is empty. Please add items to cart.',
      duration: 3000,
      position: 'bottom'
    });
    /*toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });*/
    toast.present();
  }


  async openItemDetail(data,i) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.navCtrl.navigateForward(['/item-details',{data : JSON.stringify(data) ,index : i}]);
    // console.log(name);
    // var data = {name: name};
    // var modalPage = this.modalCtrl.create('ItemDetailsPage', data);
    // modalPage.present();
    loading.dismiss();
  }

  // increment(index: number, displayName, allData) {
  //   // this.itemsQuantity++;
  //   // if (typeof this.quantities[index] == "undefined") {
  //   //   this.quantities[index] = 0;
  //   // }
  //   // //this.quantities[index].qty += 1;
  //   // this.quantities[index] = this.quantities[index] + 1;
  //   // console.log('---add---' + this.quantities);
  //   //
  //   // this.storage.set('getIndex', this.addIndexList);
  //   // this.storage.set('itemQuantity', this.quantities);
  //   // if (this.itemsQuantity > 0) {
  //   //   this.store(allData);
  //   //     // this.indexValueget(index,this.quantities[index])
  //   //   // }
  //   // }

   increment(index: number, OurRate, selectedItem, step) {
    console.log('--OurRate--'+OurRate);
    if (step == 0) {


      // this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].SaleRate * selectedItem.ItemPackagingList[0].Quantity);

      // selectedItem.ItemPackagingList[0].Quantity = 0;

      console.log('--OurRate- 2-' + step);
      step = (selectedItem.ItemPackagingList[0].Quantity * -1) + 1;
    }

    if (step == -1 && selectedItem.ItemPackagingList[0].Quantity == 1) {
      this.presentConfirm(selectedItem);
    }
    else {
      selectedItem.ItemPackagingList[0].Quantity = selectedItem.ItemPackagingList[0].Quantity + step;
      console.log('ITem Quantity: ' + selectedItem.ItemPackagingList[0].Quantity);
      this.storage.get('addData').then(async (list) => {
        var itemFound = false;
        console.log('list: ' + list);
        if (list != null) {
          // console.log('-length--' + list.length + '--count----' + count);
          for (var i = 0; i < list.length; i++) {
            if (list[i].ItemId == selectedItem.ItemId) {
              itemFound = true;
              list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + step;
              console.log('---amount--' + this.totalAmount + '---multiple---' + selectedItem.ItemPackagingList[0].OurRate * step);
              const loading = await this.loadingCtrl.create({
                message: 'Please wait...'
              });
              await loading.present();
              this.totalAmount = this.totalAmount + (selectedItem.ItemPackagingList[0].OurRate * step);
              loading.dismiss();
              if (itemFound && list[i].ItemPackagingList[0].Quantity == 0) {

                const index: number = list.indexOf(i);
                if (index !== 0) {
                  list.splice(i, 1);
                  this.itemCount--;
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
  }

/*
  barCodeScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }
*/

  addToCart(selectedItem) {

    console.log("selected item = "+ JSON.stringify(selectedItem));

    console.log('already saved item list :'+JSON.stringify(this.addData));

    this.storage.get('addData').then(async (list) => {                     //
      var itemFound = false;                                               //
      console.log('already saved item list :' + JSON.stringify(list));     //

      if (list != null) {
        console.log('list.length : ' + list.length);
        for (var i = 0; i < list.length; i++) {
          if (list[i].ItemId == selectedItem.ItemId) {
            itemFound = true;
            list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + 1;
            list[i].ActionFlag = 1;
            console.log("quantity = " + list[i].ItemPackagingList[0].Quantity);
            const loading = await this.loadingCtrl.create({
              message: 'Please wait...'
            });
            await loading.present();

            this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
            console.log("add item to cart: this.totalAmount = " + this.totalAmount);
            loading.dismiss();

          }
        }

        if (list.length == 0)                //Vishal Sir
          this.itemCount = list.length;
      }

      else {
        list = [];
        this.itemCount = 0;                 //Vishal Sir
      }

      console.log("item serial no 5 = " + this.itemCount);

      console.log("item sale rate = " + selectedItem.ItemPackagingList[0].SaleRate);
      if (!itemFound) {
        selectedItem.ItemPackagingList[0].Quantity = 1;
        selectedItem.ActionFlag = 1;
        console.log("item serial no 10 = " + this.itemCount);
        selectedItem.SrNo = this.itemCount + 1;
        list.push(selectedItem);
        this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
        console.log("totalAmount = " + this.totalAmount);
        this.itemCount++;
      }
      console.log(' modified list: ' + JSON.stringify(list));
      this.storage.set('addData', list);
      this.events.publish('addData', list);
      this.storage.set('itemnCount', this.itemCount);
      this.events.publish('ItemLength', this.itemCount);
      this.storage.set('totalProductAmount', this.totalAmount);
      this.events.publish('totalAmount', this.totalAmount);
      // this.navCtrl.push(CartPage,{page:'itemList'});
    });
  }

 async presentConfirm(data){
    const alert = await this.alertCtrl.create({
      header: 'Remove Item',
      message: 'Do you want to Remove this item?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          handler: () => {
            console.log('Agree');
            this.deleteItem(data);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Disagree');
            // data.ItemPackagingList[0].Quantity = 1;
            // this.saveItem(1,data);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteItem(selectedItem){
    this.storage.get('addData').then(async list => {
      var itemFound = false;
      if (list != null) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].ItemId == selectedItem.ItemId) {
            itemFound = true;

            const index: number = list.indexOf(i);
            if (index !== 0) {
              list.splice(i, 1);
              this.itemCount--;
              for (var i = 0; i < list.length; i++) {
                console.log('list[2] before Asign: ' + list);

                list[i].SrNo = i + 1;
                console.log('list[2] after asign: ' + list);

              }
              const loading = await this.loadingCtrl.create({
                message: 'Please wait...'
              });
              await loading.present();
              this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].SaleRate * selectedItem.ItemPackagingList[0].Quantity);
              await loading.dismiss();

              selectedItem.ItemPackagingList[0].Quantity = 0;
              if (this.itemCount == 0) {
                this.navCtrl.navigateRoot(['/home']);
                this.totalAmount = 0;
              }
            }
          }
        }
      } else {
        list = [];
      }
      console.log('list: ' + JSON.stringify(list));
      console.log("updated total amount = " + this.totalAmount);
      this.storage.set('addData', list);
      this.events.publish('addData', list);
      this.events.publish('ItemLength', this.itemCount);
      this.storage.set('itemnCount', this.itemCount);
      this.storage.set('totalProductAmount', this.totalAmount);
      this.events.publish('totalAmount', this.totalAmount);

    });
  }

  updateQuantity(quant,index,data){
    if (quant == null || quant <= 0){
      this.presentConfirm(data);
    } else {
      // if (this.pageNAme == "pendingOrder") {
      //   console.log("-----quantity----"+quant);
      //   this.storage.get('pendingData').then(list => {
      //     for (var i = 0; i < list.length; i++) {
      //       if (data.ItemId == list[i].ItemId) {
      //         if (quant != null && list[i].ItemPackagingList[0].Quantity != quant && quant > 0){
      //           console.log("----selected item quantity------"+list[i].ItemPackagingList[0].Quantity);
      //           this.saveItem(quant,data);
      //         }
      //       }
      //     }
      //   });
      // }else {
      console.log("-----quantity----"+quant);
      this.storage.get('addData').then(list => {
        for (var i = 0; i < list.length; i++) {
          if (data.ItemId == list[i].ItemId) {
            if (quant != null && list[i].ItemPackagingList[0].Quantity != quant && quant > 0){
              console.log("----selected item quantity------"+list[i].ItemPackagingList[0].Quantity);
              this.saveItem(quant,data);
              // this.isQuantityUpdate = true;
            }
          }
        }
      });
    }
    // }
  }

  saveItem(value,data) {
    var quantityModified;
    console.log("item value = " + value);
    console.log("index = " + data.ItemId);

    // if (this.pageNAme == "pendingOrder") {
    //   this.storage.get('pendingData').then(list => {
    //     for (var i = 0; i < list.length; i++) {
    //       if (list[i].ItemId == data.ItemId) {
    //         console.log("quantity = "+ list[i].ItemId);
    //         // if (value > list[i].ItemPackagingList[0].ClosingStock) {
    //         //   this.presentToast("Only " + list[i].ItemPackagingList[0].ClosingStock + " stock is available for this item.");
    //         // } else {
    //         if (value > list[i].ItemPackagingList[0].Quantity) {
    //           quantityModified = value - list[i].ItemPackagingList[0].Quantity;
    //           console.log('quantity modified = ' + quantityModified);
    //           list[i].ItemPackagingList[0].Quantity = value;
    //           this.storage.set('pendingData', list);
    //           console.log("list data = " + JSON.stringify(list));
    //           this.totalAmount = this.totalAmount + (quantityModified * list[i].ItemPackagingList[0].SaleRate);
    //           this.isEnabled = true;
    //           //         this.events.publish('addData',list);
    //           for (var j=0;j<this.deliveryChargeList.length;j++){
    //             if (this.totalAmount >=this.deliveryChargeList[j].startPurchaseValue && this.totalAmount <= this.deliveryChargeList[j].endPurchaseValue) {
    //               this.deliveryCharge = this.deliveryChargeList[j].deliveryCharge;
    //               console.log("-----delivery charge value-----"+this.deliveryCharge);
    //             }
    //           }
    //
    //
    //
    //
    //         }
    //         else {
    //           quantityModified = list[i].ItemPackagingList[0].Quantity - value;
    //           console.log('quantity modified = ' + quantityModified);
    //           list[i].ItemPackagingList[0].Quantity = value;
    //           this.storage.set('pendingData', list);
    //           console.log("list data = " + JSON.stringify(list));
    //           this.totalAmount = this.totalAmount - (quantityModified * list[i].ItemPackagingList[0].SaleRate);
    //           // this.storage.set('totalProductAmount', this.totalAmount);
    //           // this.events.publish('totalAmount', this.totalAmount);
    //           //         this.events.publish('addData',list);
    //           this.isEnabled = true;
    //           for (var j=0;j<this.deliveryChargeList.length;j++){
    //             if (this.totalAmount >=this.deliveryChargeList[j].startPurchaseValue && this.totalAmount <=this.deliveryChargeList[j].endPurchaseValue) {
    //               this.deliveryCharge = this.deliveryChargeList[j].deliveryCharge;
    //               console.log("-----delivery charge value-----"+this.deliveryCharge);
    //             }
    //           }
    //         }
    //
    //         if (this.isGSTApplicableExternally == true){
    //           this.calculateOverheadPendingUpdatedAmount();
    //         } else {
    //           this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
    //         }
    //         if (this.userType == 5){
    //           this.chckForFreeDelivery();
    //         }
    //
    //         this.calculateRoundOff();
    //
    //         // }
    //
    //       }
    //     }
    //   });
    //
    // }else {

    this.storage.get('addData').then(async list => {
      for (var i = 0; i < list.length; i++) {
        if (list[i].ItemId == data.ItemId) {
          console.log("quantity = " + list[i].ItemId);
          // if (value > list[i].ItemPackagingList[0].ClosingStock) {
          //   this.presentToast("Only " + list[i].ItemPackagingList[0].ClosingStock + " stock is available for this item.");
          // } else {
          if (value > list[i].ItemPackagingList[0].Quantity) {
            quantityModified = value - list[i].ItemPackagingList[0].Quantity;
            console.log('quantity modified = ' + quantityModified);
            list[i].ItemPackagingList[0].Quantity = value;
            this.storage.set('addData', list);
            console.log("list data = " + JSON.stringify(list));
            const loading = await this.loadingCtrl.create({
              message: 'Please wait...'
            });
            await loading.present();
            this.totalAmount = this.totalAmount + (quantityModified * list[i].ItemPackagingList[0].SaleRate);
            loading.dismiss();

            this.storage.set('totalProductAmount', this.totalAmount);
            this.events.publish('totalAmount', this.totalAmount);
            //         this.events.publish('addData',list);
          } else {
            quantityModified = list[i].ItemPackagingList[0].Quantity - value;
            console.log('quantity modified = ' + quantityModified);
            list[i].ItemPackagingList[0].Quantity = value;
            this.storage.set('addData', list);
            console.log("list data = " + JSON.stringify(list));
            const loading = await this.loadingCtrl.create({
              message: 'Please wait...'
            });
           await loading.present();
            this.totalAmount = this.totalAmount - (quantityModified * list[i].ItemPackagingList[0].SaleRate);
            loading.dismiss();

            this.storage.set('totalProductAmount', this.totalAmount);
            this.events.publish('totalAmount', this.totalAmount);
            //         this.events.publish('addData',list);

          }
          // }

        }
      }
    });
  }

  ngOnInit() {

    console.log('ionViewDidLoad ItemListPage');
    console.log("total amount = "+this.totalAmount);
  }

  ionViewWillEnter()
  {

    this.headerTitle = this.activatedRoute.snapshot.paramMap.get('name');
    this.setItemList(this.activatedRoute.snapshot.paramMap.get('id'));
    this.displayId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.itemCount = 0;

    // this.no_of_items=0;
    this.events.subscribe('ItemLength', (isShow) => {
      this.itemCount = isShow;
      console.log('----itemList------' + this.itemCount);
    });

    this.storage.get('addData').then((list) => {
      this.addData = list;
      console.log(list);
    });

    this.events.subscribe('addData', (result)=>{
      this.addData = result;
      console.log(result);
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

    this.events.subscribe('totalAmount', (isShow) => {
      this.totalAmount = isShow;
      console.log(this.itemCount);
    });

    this.storage.get('totalProductAmount').then((isLoginResult) => {
      console.log('---total amount ---'+isLoginResult);
      if (this.itemCount == null || this.itemCount == 0) {
        console.log("No item found");
        this.totalAmount = 0;         //Vishal Sir
      }else {
        this.totalAmount = isLoginResult;
      }
    });

    this.storage.get('userName').then(res=>{
      this.userName = res;
      console.log("username = "+this.userName);
    });
    this.storage.get('noOfItems').then((isLoginResult) => {
      console.log(isLoginResult);
      this.no_of_items = isLoginResult;
    });
    this.storage.get('getIndex').then((isLoginResult) => {
      console.log(isLoginResult);
      this.addIndexList = isLoginResult;
    });
    this.events.subscribe('packingValue', (isShow) => {
      this.no_of_items = isShow;
      console.log('---event-----' + this.no_of_items);
    });
    this.itemsQuantity = 0;                       //////Vishal Sir

    this.storage.get('companyName').then(res=>{
      this.companyName = res;
    });


  }




  getItems($event: CustomEvent<any>) {

  }

}
