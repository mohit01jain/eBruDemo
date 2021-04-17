import {Component, OnInit, ViewChild} from '@angular/core';
import {Searchbar} from 'ionic-angular';
import {CartPage} from '../cart/cart.page';
import {HomePage} from '../home/home.page';
import {ItemDetailsPage} from '../item-details/item-details.page';
import {
    AlertController,
    Events,
    LoadingController,
    NavController,
    Platform,
    PopoverController,
    ToastController
} from '@ionic/angular';
import {UserService} from '../Providers/user/user.service';
import {UtilityService} from '../Providers/utility/utility.service';
import {ProductServiceService} from '../Providers/product-service/product-service.service';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {stringify} from '@angular/compiler/src/util';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.page.html',
    styleUrls: ['./search-item.page.scss'],
})
export class SearchItemPage implements OnInit {
    // @ts-ignore
    @ViewChild('si') searchInput: Searchbar;

    public arraylength: any;
    item: string[];
    public ItemList: any = [];
    public itemNotFound: any;
    public addIndexList: any = [];
    public addDataList: any;
    public itemCount: any;
    public name: any;
    public addData: any;
    public no_of_piece: any;
    public product_amount: any;
    public totalAmount: any;
    public spinner: any;
    public searchItem: any;
    public no_of_items: any;
    public quantities: number[];
    public item_index: any;
    public j = 0;
    public itemFound: any = false;
    public searchStr: any;
    public pageName: any;
    public userType: any;
    public visibility: any = false;
    public userInfo: any;
    public CreditLimit: any;
    public CurrentClosingBalance: any;
    public PendingOrderAmount: any;
    public IsNegativeStockAllowed: any;
    public CompanySetting: any = [];
    public RefreshCustomerRegistrationData: any = [];
    public RateCategory :any;

    constructor(public navCtrl: NavController, public productServiceProvider: ProductServiceService,
                public loadingCtrl: LoadingController, public  popoverController: PopoverController, public storage: Storage,
                private toastCtrl: ToastController, public userProvider: UserService, public activatedRoute: ActivatedRoute,
                public utilityProvider: UtilityService, public events: Events, public platform: Platform, public alertCtrl: AlertController) {
        console.log('ionViewWillEnter SearchItemPage');

        this.storage.get('userInfo').then((isLoginResult) => {
            if (isLoginResult != null) {
                this.userInfo = isLoginResult;
                console.log('userInfo------RS' + JSON.stringify(this.userInfo));
                this.userProvider.getRefreshCustomerRegistrationData(this.userInfo).then(res => {
                    this.RefreshCustomerRegistrationData = res;
                    console.log('RefreshCustomerRegistrationData List----RS---- ' + JSON.stringify(this.RefreshCustomerRegistrationData));
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

        this.userType = this.utilityProvider.userType;
        console.log('---user type---- ' + this.userType);

        this.pageName = this.activatedRoute.snapshot.paramMap.get('pageName');
        console.log('page name = ' + this.pageName);
        this.spinner = false;
        this.events.subscribe('ItemLength', (isShow) => {
            this.itemCount = isShow;
            console.log('----itemList------' + this.itemCount);
        });
        this.storage.get('addData').then((list) => {
            this.addData = list;
            console.log(list);
        });
        this.storage.get('itemnCount').then((count) => {
            this.itemCount = count;
            console.log(this.itemCount);
        });
        this.events.subscribe('totalAmount', (isShow) => {
            this.totalAmount = isShow;
            console.log(this.itemCount);
        });
        this.storage.get('totalProductAmount').then((isLoginResult) => {
            console.log(isLoginResult);
            this.totalAmount = isLoginResult;
        });

        this.storage.get('RateCategory').then((ratcat) => {
            this.RateCategory = ratcat;
            console.log(ratcat);
        });
        this.no_of_items = 0;
        this.item_index = 0;

        this.quantities = new Array(this.ItemList.length);
// console.log(this.quantities);
        this.quantities = this.quantities.map((el: any) => 0);

    }

    ngOnInit() {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchItemPage');
        this.visibility = true;
        // this.searchInput.setFocus();
    }

    /* ionViewWillEnter()
     {
       console.log('ionViewWillEnter SearchItemPage');

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

       this.userType = this.utilityProvider.userType;
       console.log("---user type---- " + this.userType);

       this.pageName = this.navParams.get('pageName');
       console.log("page name = " + this.pageName);
       this.spinner = false;
       this.events.subscribe('ItemLength', (isShow) => {
         this.itemCount = isShow;
         console.log('----itemList------' + this.itemCount);
       });
       this.storage.get('addData').then((list) => {
         this.addData = list;
         console.log(list);
       });
       this.storage.get('itemnCount').then((count) => {
         this.itemCount = count;
         console.log(this.itemCount);
       });
       this.events.subscribe('totalAmount', (isShow) => {
         this.totalAmount = isShow;
         console.log(this.itemCount);
       });
       this.storage.get('totalProductAmount').then((isLoginResult) => {
         console.log(isLoginResult);
         this.totalAmount = isLoginResult;
       });
       this.no_of_items = 0;
       this.item_index = 0;

       this.quantities = new Array(this.ItemList.length);
       // console.log(this.quantities);
       this.quantities = this.quantities.map((el: any) => 0);

     }*/
    ionViewDidEnter() {
        setTimeout(() => {
            this.searchInput.setFocus();
        }, 150);
        console.log('ionViewDidEnter SearchItemPage');

    }

    async initializeItems(val) {
        this.spinner = true;
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // loading.present();
        // this.productServiceProvider.getSearchedItem(val).then(res => {

        this.productServiceProvider.getItemListBySearch(val, 'Long', 1, 20,this.RateCategory).then(res => {
            console.log(res);
            this.searchStr = val;
            this.ItemList = res;
            // this.itemNotFound = this.ItemList.length;
            if (this.ItemList.length > 0) {
                this.itemFound = true;
                this.storage.get('addData').then(itemlist => {
                    if (itemlist != null) {
                        for (var i = 0; i < itemlist.length; i++) {
                            for (var j = 0; j < this.ItemList.length; j++) {
                                if (itemlist[i].ItemId == this.ItemList[j].ItemId) {
                                    this.ItemList[j].ItemPackagingList[0].Quantity = itemlist[i].ItemPackagingList[0].Quantity;
                                }
                            }
                        }
                    }
                });

            } else {
                this.itemFound = false;
                // loading.dismiss();

            }
            console.log(this.ItemList);
            this.spinner = false;
            // this.ItemList.forEach((item, index) => {
            //   for (let j of item.ItemPackagingList){
            //     this.quantities[index]=j.Quantity;
            //     console.log('----quantity--'+j.Quantity);
            //   }
            // });

        });
    }

    getItems(ev: any) {
        let val = ev.target.value;
        if (val.length > 2) {
            this.initializeItems(val);

        }
    }

  gotoCartPage() {
    if (this.itemCount > 0) {
      this.navCtrl.navigateRoot(['/cart', {page: 'itemList'}]);
    } else {
      this.presentToast();
    }
  }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'The cart is empty. Please add items to cart.',
            duration: 3000,
            position: 'bottom'
        });
        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });
        toast.onDidDismiss();
        toast.present();
    }

    /*
    openAddPopup(name, no_of_product, product_price, allDAta, itemlist) {
      this.name = name;
      this.no_of_piece = no_of_product;
      this.product_amount = product_price;

      // this.navCtrl.push(AddItempopupPage);
      let popover = this.popoverController.create(AddItempopupPage, {
        'data': this.name,
        'pieces': this.no_of_piece,
        'amount': this.product_amount,
        allDAta: allDAta,
        page: itemlist
      });
      popover.present({});
    }*/

    /*increment(index: number, OurRate, selectedItem, step) {
      console.log('--OurRate--' + OurRate);

      if (step == -1 && selectedItem.ItemPackagingList[0].Quantity == 1) {
        this.presentConfirm(selectedItem);
      }
      else {
        selectedItem.ItemPackagingList[0].Quantity = selectedItem.ItemPackagingList[0].Quantity + step;
        console.log('ITem Quantity: ' + selectedItem.ItemPackagingList[0].Quantity);
        this.storage.get('addData').then((list) => {
          var itemFound = false;
          console.log('list: ' + list);
          if (list != null) {
            // console.log('-length--' + list.length + '--count----' + count);
            for (var i = 0; i < list.length; i++) {
              if (list[i].ItemId == selectedItem.ItemId) {
                itemFound = true;
                list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + step;
                console.log('---amount--' + this.totalAmount + '---multiple---' + selectedItem.ItemPackagingList[0].OurRate * step);
                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                });
                loading.present();
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
    }*/
    increment(index: number, OurRate, selectedItem, step) {
        console.log('--OurRate--' + OurRate);
        if (step == 0) {


            // this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].SaleRate * selectedItem.ItemPackagingList[0].Quantity);

            // selectedItem.ItemPackagingList[0].Quantity = 0;

            console.log('--OurRate- 2-' + step);
            step = (selectedItem.ItemPackagingList[0].Quantity * -1) + 1;
        }

        if (step == -1 && selectedItem.ItemPackagingList[0].Quantity == 1) {
            this.presentConfirm(selectedItem);
        } else {
            selectedItem.ItemPackagingList[0].Quantity = selectedItem.ItemPackagingList[0].Quantity + step;
            console.log('ITem Quantity: ' + selectedItem.ItemPackagingList[0].Quantity);
            this.storage.get('addData').then((list) => {
                var itemFound = false;
                console.log('list: ' + list);
                if (list != null) {
                    // console.log('-length--' + list.length + '--count----' + count);
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].ItemId == selectedItem.ItemId) {
                            itemFound = true;
                            list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + step;
                            console.log('---amount--' + this.totalAmount + '---multiple---' + selectedItem.ItemPackagingList[0].OurRate * step);
                            /*let loading = this.loadingCtrl.create({
                              content: 'Please wait...'
                            });
                            loading.present();*/
                            this.totalAmount = this.totalAmount + (selectedItem.ItemPackagingList[0].OurRate * step);
                            // loading.dismiss();
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

   async openItemDetail(data, i) {
       const loading = await this.loadingCtrl.create({
           message: 'Please wait...'
       });
       await loading.present();
        this.navCtrl.navigateForward(['/item-details', { data:JSON.stringify(data), index:i}]);        // console.log(name);
        // var data = {name: name};
        // var modalPage = this.modalCtrl.create('ItemDetailsPage', data);
        // modalPage.present();
loading.dismiss();
    }

    addToCart(selectedItem) {

        console.log('selected item = ' + JSON.stringify(selectedItem));

        console.log('already saved item list :' + JSON.stringify(this.addData));

        if (this.pageName == 'AdminOrderView') {                   //
            this.storage.get('orderViewData').then(async (list) => {     //
                var itemFound = false;                             //
                console.log('already saved item list :' + JSON.stringify(list));   //

                if (list != null) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].ItemId == selectedItem.ItemId) {
                            itemFound = true;
                            list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + 1;
                            list[i].ActionFlag = 1;
                            console.log('quantity = ' + list[i].ItemPackagingList[0].Quantity);
                            const loading = await this.loadingCtrl.create({
                               message: 'Please wait...'
                             });
                            await loading.present();
                            this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
                             loading.dismiss();
                        }
                    }

                   // if (list.length == 0)                //Vishal Sir
                   // this.itemCount = list.length;

                } else {
                    list = [];
                   // this.itemCount = 0;                 //Vishal Sir
                }
                if (!itemFound) {
                    selectedItem.ItemPackagingList[0].Quantity = 1;
                    selectedItem.ActionFlag = 1;
                    list.push(selectedItem);
                    // let loading = this.loadingCtrl.create({
                    //   content: 'Please wait...'
                    // });
                    // loading.present();
                    this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].SaleRate;
                    // loading.dismiss();
                    console.log('totalAmount = ' + this.totalAmount);
                    // this.itemCount++;
                }
                console.log(' modified list: ' + JSON.stringify(list));
                this.storage.set('orderViewData', list);
                this.events.publish('orderViewData', list);
                // this.events.publish('ItemLength', this.itemCount);
                // this.storage.set('itemnCount', this.itemCount);
                // this.storage.set('totalProductAmount', this.totalAmount);
                // this.events.publish('totalAmount', this.totalAmount);
                // this.navCtrl.push(CartPage,{page:'itemList'});
            });
        } else {
            this.storage.get('addData').then((list) => {
                var itemFound = false;
                console.log('already saved item list :' + JSON.stringify(list));

                if (list != null) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].ItemId == selectedItem.ItemId) {
                            itemFound = true;
                            list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + 1;
                            list[i].ActionFlag = 1;
                            console.log('quantity = ' + list[i].ItemPackagingList[0].Quantity);
                            // let loading = this.loadingCtrl.create({
                            //   content: 'Please wait...'
                            // });
                            // loading.present();
                            this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
                            // loading.dismiss();
                        }
                    }
                } else {
                    list = [];
                    this.itemCount = 0;
                }
                console.log('item serial no 5 = ' + this.itemCount);

                if (!itemFound) {
                    selectedItem.ItemPackagingList[0].Quantity = 1;
                    selectedItem.ActionFlag = 1;
                    console.log('item serial no 10 = ' + this.itemCount);
                    selectedItem.SrNo = this.itemCount + 1;

                    list.push(selectedItem);
                    // let loading = this.loadingCtrl.create({
                    //   content: 'Please wait...'
                    // });
                    // loading.present();
                    this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
                    // loading.dismiss();
                    console.log('totalAmount = ' + this.totalAmount);
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
        // this.storage.get('addData').then((list)=>{
        //   var itemFound = false;
        //   console.log('already saved item list :'+JSON.stringify(list));
        //
        //   if (list != null){
        //     for (var i=0;i < list.length;i++){
        //       if (list[i].ItemId == selectedItem.ItemId){
        //         itemFound = true;
        //         list[i].ItemPackagingList[0].Quantity = list[i].ItemPackagingList[0].Quantity + 1;
        //         list[i].ActionFlag = 1;
        //         console.log("quantity = "+list[i].ItemPackagingList[0].Quantity);
        //         this.totalAmount=this.totalAmount + selectedItem.ItemPackagingList[0].OurRate;
        //       }
        //     }
        //   }else {
        //     list = [];
        //   }
        //   if (!itemFound ) {
        //     selectedItem.ItemPackagingList[0].Quantity = 1;
        //     selectedItem.ActionFlag = 1;
        //     list.push(selectedItem);
        //     this.totalAmount = this.totalAmount + selectedItem.ItemPackagingList[0].SaleRate;
        //     console.log("totalAmount = "+this.totalAmount);
        //     this.itemCount++;
        //   }
        //   console.log(' modified list: ' + JSON.stringify(list));
        //   this.storage.set('addData', list);
        //   this.events.publish('addData',list);
        //   this.events.publish('ItemLength', this.itemCount);
        //   this.storage.set('itemnCount', this.itemCount);
        //   this.storage.set('totalProductAmount', this.totalAmount);
        //   this.events.publish('totalAmount', this.totalAmount);
        //   // this.navCtrl.push(CartPage,{page:'itemList'});
        // });
    }

    async presentConfirm(data) {
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
        alert.present();
    }

    deleteItem(selectedItem) {
        this.storage.get('addData').then(list => {
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
                            // let loading = this.loadingCtrl.create({
                            //   content: 'Please wait...'
                            // });
                            // loading.present();
                            this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].SaleRate * selectedItem.ItemPackagingList[0].Quantity);
                            // loading.dismiss();
                            selectedItem.ItemPackagingList[0].Quantity = 0;
                            if (this.itemCount == 0) {
                                this.navCtrl.navigateRoot('/home');
                                this.totalAmount = 0;
                            }
                        }
                    }
                }
            } else {
                list = [];
            }
            console.log('list: ' + JSON.stringify(list));
            console.log('updated total amount = ' + this.totalAmount);
            this.storage.set('addData', list);
            this.events.publish('addData', list);
            this.events.publish('ItemLength', this.itemCount);
            this.storage.set('itemnCount', this.itemCount);
            this.storage.set('totalProductAmount', this.totalAmount);
            this.events.publish('totalAmount', this.totalAmount);

        });
    }

    updateQuantity(quant, index, data) {
        if (quant == null || quant <= 0) {
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
            console.log('-----quantity----' + quant);
            this.storage.get('addData').then(list => {
                for (var i = 0; i < list.length; i++) {
                    if (data.ItemId == list[i].ItemId) {
                        if (quant != null && list[i].ItemPackagingList[0].Quantity != quant && quant > 0) {
                            console.log('----selected item quantity------' + list[i].ItemPackagingList[0].Quantity);
                            this.saveItem(quant, data);
                            // this.isQuantityUpdate = true;
                        }
                    }
                }
            });
        }
        // }
    }

    saveItem(value, data) {
        var quantityModified;
        console.log('item value = ' + value);
        console.log('index = ' + data.ItemId);

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

        this.storage.get('addData').then(list => {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ItemId == data.ItemId) {
                    console.log('quantity = ' + list[i].ItemId);
                    // if (value > list[i].ItemPackagingList[0].ClosingStock) {
                    //   this.presentToast("Only " + list[i].ItemPackagingList[0].ClosingStock + " stock is available for this item.");
                    // } else {
                    if (value > list[i].ItemPackagingList[0].Quantity) {
                        quantityModified = value - list[i].ItemPackagingList[0].Quantity;
                        console.log('quantity modified = ' + quantityModified);
                        list[i].ItemPackagingList[0].Quantity = value;
                        this.storage.set('addData', list);
                        console.log('list data = ' + JSON.stringify(list));
                        // let loading = this.loadingCtrl.create({
                        //   content: 'Please wait...'
                        // });
                        // loading.present();
                        this.totalAmount = this.totalAmount + (quantityModified * list[i].ItemPackagingList[0].SaleRate);
                        // loading.dismiss();
                        this.storage.set('totalProductAmount', this.totalAmount);
                        this.events.publish('totalAmount', this.totalAmount);
                        //         this.events.publish('addData',list);
                    } else {
                        quantityModified = list[i].ItemPackagingList[0].Quantity - value;
                        console.log('quantity modified = ' + quantityModified);
                        list[i].ItemPackagingList[0].Quantity = value;
                        this.storage.set('addData', list);
                        console.log('list data = ' + JSON.stringify(list));
                        // let loading = this.loadingCtrl.create({
                        //   content: 'Please wait...'
                        // });
                        // loading.present();
                        this.totalAmount = this.totalAmount - (quantityModified * list[i].ItemPackagingList[0].SaleRate);
                        // loading.dismiss();
                        this.storage.set('totalProductAmount', this.totalAmount);
                        this.events.publish('totalAmount', this.totalAmount);
                        //         this.events.publish('addData',list);
                    }
                    // }
                }
            }
        });
    }
}