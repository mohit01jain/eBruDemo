import {Component, OnInit} from '@angular/core';

import {Storage} from '@ionic/storage';

import {FormControl, FormGroup} from '@angular/forms';
/*
import {FormBuilder, Validators} from '@angular/forms';
*/
import {DatePipe} from '@angular/common';
import {OrderService} from '../Providers/order/order.service';
import {AddressService} from '../Providers/address/address.service';
import {UtilityService} from '../Providers/utility/utility.service';
import {
    AlertController,
    Events,
    LoadingController, ModalController,
    NavController,
    NavParams,
    Platform,
    PopoverController,
    ToastController
} from '@ionic/angular';
import {ActivatedRoute/*, Router*/} from '@angular/router';
import {IonicPage} from 'ionic-angular';
import {EditDeliveryAddressPage} from '../edit-delivery-address/edit-delivery-address.page';
import {CartPage} from '../cart/cart.page';
import {OrderSuccessfullPage} from '../order-successfull/order-successfull.page';
import {ModalPage} from '../modal/modal.page';
import {NewAddressPage} from '../new-address/new-address.page';

/**
 * Generated class for the DeliveryAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'app-delivery-address',
    templateUrl: 'delivery-address.page.html',
    styleUrls: ['./delivery-address.page.scss'],
})
export class DeliveryAddressPage /*implements OnInit*/ {
    private orderDescDSuggestion: any;

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }
    private orderSuggestion: any;
    public name: any;
    public address1: any;
    public address2: any;
    public colony: any;
    public city: any;
    public pincode: any;
    public contact_no: any;
    public pg_hide: any;
    public pg_city_hide: any;
    public pg_pincode_hide: any;
    public pg_colony_hide: any;
    public pg_row_hide: any;
    public pg_alt_add_hide: any;
    public allData: any;
    public toastReturn: any;
    public customerRegisterDetail: any;
    public addData: any = [];
    public addressesList: any = [];
    public myGroup: any;
    public userData: any;
    public defaultName: any;
    public defaultAdd1: any;
    public defaultAdd2: any;
    public defaultCity: any;
    public defaultPincode: any;
    public defaultMobileNo: any;
    public selectedAddress: any;
    public saveReturnMsg: any;
    public shippingAddressDetail: any;
    public orderDate: any;
    public orderNo: any;
    public overheadAmount: any;
    public totalAmount: any;
    public totalPayableAmount: any;
    public pageName: any;
    public selectedOrder: any;
    public companyName: any;
    public AcntId: any;
    public orderNarration: any = '';
    public deliveryCharges: any;
    public visibility: any = false;
    private isActive: any=true;

    // private unregisterBackButtonAction: any;

    constructor(public navCtrl: NavController, private storage: Storage,
                public  popoverController: PopoverController,
                private toastCtrl: ToastController, private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                public orderProvider: OrderService, public activatedRoute: ActivatedRoute,
                public loadingCtrl: LoadingController, public events: Events,
                public addressProvider: AddressService,
                /*private formBuilder: FormBuilder,*/ public platform: Platform, /*public viewCtrl: ViewController,*/
                public utilityProvider: UtilityService, public datepipe: DatePipe) {


        this.orderDescDSuggestion = this.activatedRoute.snapshot.paramMap.get('orderSuggestion');
        console.log('orderDescDSuggestion name RS------ = ' + this.orderDescDSuggestion);

        this.utilityProvider.currentdateTime = this.datepipe.transform(this.utilityProvider.myDate, 'yyyy-MM-ddTHH:mm:ss');
        console.log('----latest date ---' + this.utilityProvider.currentdateTime);

        this.storage.get('AcntId').then(data => {
            this.AcntId = data;
        });

        this.storage.get('userInfo').then((value) => {
            this.allData = value;
            this.name = value.Name;
            this.address1 = value.Address1;
            this.address2 = value.Address2;
            this.colony = value.AreaName;
            this.city = value.City;
            this.pincode = value.AreaCode;
            this.contact_no = value.MobileNo;
            console.log('User DAta -----', JSON.stringify(this.allData));
            this.retrieveSavedAddress();
        });

        this.myGroup = new FormGroup({
            selectedItem: new FormControl()
        });

        this.storage.get('companyName').then(res => {
            this.companyName = res;
        });

        console.log('selected item = ' + this.myGroup.value.selectedItem);
        this.pageName = this.activatedRoute.snapshot.paramMap.get('page');


        if (this.pageName == 'pendingOrder') {
            this.selectedOrder = this.activatedRoute.snapshot.paramMap.get('searchOrderDetail');
            this.addData = this.selectedOrder.Items;
            console.log('selected order detail ------' + JSON.stringify(this.selectedOrder));
            this.totalAmount = this.activatedRoute.snapshot.paramMap.get('orderAmount');
            console.log('order amount = ' + this.totalAmount);
            this.overheadAmount = this.activatedRoute.snapshot.paramMap.get('overheadAmount');
            console.log('overhead amount = ' + this.overheadAmount);
            this.totalPayableAmount = this.activatedRoute.snapshot.paramMap.get('payableAmount');
            console.log('total payable amount = ' + this.totalPayableAmount);
            this.shippingAddressDetail = this.selectedOrder.ShippingAddress;
            console.log('order shipping address = ' + this.shippingAddressDetail);
            this.orderDescDSuggestion = this.selectedOrder.Description;
            if (this.selectedAddress != '') {
                this.visibility = true;
            }

        } else {
            this.totalAmount = this.activatedRoute.snapshot.paramMap.get('orderAmount');
            console.log('order amount = ' + this.totalAmount);
            this.overheadAmount = this.activatedRoute.snapshot.paramMap.get('overheadAmount');
            console.log('overhead amount = ' + this.overheadAmount);
            this.totalPayableAmount = this.activatedRoute.snapshot.paramMap.get('payableAmount');
            console.log('total payable amount = ' + this.totalPayableAmount);

            this.deliveryCharges = this.activatedRoute.snapshot.paramMap.get('deliveryChargesAmount');
            console.log('Delivery Charge amount = ' + this.deliveryCharges);

            this.storage.get('addData').then((list) => {
                this.addData = list;
                console.log('----addData---' + JSON.stringify(this.addData));
            });

        }
        this.storage.get('userInfo').then(userAddress => {
            this.userData = userAddress;
            console.log('user info name = ' + JSON.stringify(this.userData.Name));
            this.defaultName = this.userData.Name;
            console.log('user info address1 = ' + JSON.stringify(this.userData.Address1));
            this.defaultAdd1 = this.userData.Address1;
            console.log('user info address2 = ' + JSON.stringify(this.userData.Address2));
            this.defaultAdd2 = this.userData.Address2;
            console.log('user info city = ' + JSON.stringify(this.userData.City));
            this.defaultCity = this.userData.City;
            console.log('user info pincode = ' + JSON.stringify(this.userData.Pincode));
            this.defaultPincode = this.userData.Pincode;
            console.log('user info mobile no = ' + JSON.stringify(this.userData.MobileNo));
            this.defaultMobileNo = this.userData.MobileNo;

        });

        this.pg_hide = true;
        this.pg_city_hide = true;
        this.pg_pincode_hide = true;
        this.pg_colony_hide = true;
        // this.pg_alt_add_hide=true;
        this.pg_row_hide = true;

        if (this.address2 == null) {
            this.pg_hide = false;
            console.log('deeps');
        }
        if (this.colony == null) {
            this.pg_colony_hide = false;

        }
        if (this.city == null) {
            this.pg_city_hide = false;
        }
        if (this.pincode == null) {
            this.pg_pincode_hide = false;
        }
        if (this.city == null && this.pincode == null) {
            this.pg_row_hide = false;
        }


    }

    ngOnInit() {
        console.log('ionViewDidLoad DeliveryAddressPage');
        this.pg_alt_add_hide = false;
    }


    retrieveSavedAddress() {
        this.addressProvider.getSavedAddresses(this.allData.AcntId).then(res => {
            this.addressesList = res;
            console.log('Address list = ' + JSON.stringify(this.addressesList));
            if (this.pageName == 'itemList') {
                if (this.addressesList.length > 1) {
                    this.selectedAddress = this.addressesList[1].ShippingId;
                    this.shippingAddressDetail = this.addressesList[1];
                    this.visibility = true;
                }

            } else {
                if (this.selectedAddress == 'ee76114e-0bc5-4da5-a4f5-c57ce721ba2e') {
                    console.log('sdgjhshshfh');
                    this.selectedAddress = this.addressesList[1].ShippingId;
                } else {
                    this.selectedAddress = this.selectedOrder.ShippingAddress.ShippingId;
                    console.log('selected address = ' + this.selectedAddress);
                }
            }

        });
    }

    rd_alternate_click() {
        this.pg_alt_add_hide = true;
    }

     edit_reg_address() {
        console.log('EDITPAGE');

                this.navCtrl.navigateRoot(['/edit-delivery-address']);





    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad DeliveryAddressPage');
        this.pg_alt_add_hide = false;


    }

    ionViewWillEnter() {
        this.storage.get('userInfo').then((value) => {
            this.allData = value;
            this.name = value.Name;
            this.address1 = value.Address1;
            this.address2 = value.Address2;
            this.colony = value.AreaName;
            this.city = value.City;
            this.pincode = value.AreaCode;
            this.contact_no = value.MobileNo;
            console.log('User DAta -----', JSON.stringify(this.allData));
            this.retrieveSavedAddress();
        });
    }


    showNewAddress(index, data) {
        console.log('seleced data = ' + JSON.stringify(data));
        console.log('seleced id = ' + data.ShippingId);
        if (index == -1) {
            this.shippingAddressDetail = null;
            console.log('default address = ' + JSON.stringify(this.shippingAddressDetail));
            this.visibility = true;
        } else {
            if (index == -2) {

            } else {
                this.shippingAddressDetail = data;
                console.log('address = ' + JSON.stringify(this.shippingAddressDetail));
                this.visibility = true;

            }

        }
    }

    async openEditPopup(index, data) {
        // this.name=name;
        // this.no_of_piece=no_of_product;
        // this.product_amount=product_price;
        // this.navCtrl.push(AddItempopupPage);
        const popover = await this.popoverController.create({
            component: EditDeliveryAddressPage,
            cssClass: 'edit-opty-popover',
            componentProps:
                {
                    'data': this.allData,
                    'index': index,
                    'selectedData': data,
                },
        }).then(popover =>
            popover.present());

        /*  await popover.onDidDismiss(data => {
               console.log('data--- ' + data);
               this.retrieveSavedAddress();
           });*/

    }

    deleteAddress(index, data) {
        this.addressProvider.savedAddress(data.ShippingId, data.AccountId, data.ContactPerson, data.Dig, data.Add1, data.Add2, data.Add3, data.City, data.State,data.StateName,data.StateCode,
            data.Zip, data.MobileNo, data.AlternateNumber, data.GSTNO, data.Distance, data.EmailId, false).then(res => {
            this.saveReturnMsg = res;
            console.log('----return msg----' + JSON.stringify(this.saveReturnMsg));
            if (this.saveReturnMsg.ReturnMessage == 'Shipping Address successfully Deleted.') {


                //console.log('--deleted--');
                this.retrieveSavedAddress();
            }
        });
    }

    async presentConfirm(index, data) {
        const alert = await this.alertCtrl.create({
            header: 'Delete Address',
            message: 'Are you sure you want to delete this address!!',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Yes clicked');
                        this.deleteAddress(index, data);
                    }
                }
            ]
        });
        await alert.present();
    }


    async openNewAddressPopup() {

        const modal = await this.modalCtrl.create({
            component: NewAddressPage,
            componentProps:
                {
                    'data': this.allData,

                }

        });

        await modal.present();
        this.retrieveSavedAddress();
    }


    presetConfirm() {
        if (this.pageName == 'pendingOrder') {
            if (this.orderDescDSuggestion == '') {
                this.presentConfirmOrder('Confirm Update Order', 'Are you sure you want to update this order without any SUGGESTIONS?');
            } else {
                this.presentConfirmOrder('Confirm Update Order', 'Are you sure you want to update this order?');
            }
        } else {
            if (this.orderDescDSuggestion == '') {
                this.presentConfirmOrder('Confirm Order', 'Are you sure you want to place this order without any SUGGESTIONS?');
            } else {
                this.presentConfirmOrder('Confirm Order', 'Are you sure you want to place this order?');
            }
        }


    }

    async presentConfirmOrder(title, msg) {
        const confirm = await this.alertCtrl.create({
            header: title,
            message: msg,
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                        this.confirmOrder();
                    }
                }
            ]
        });
        await confirm.present();
    }

    async confirmOrder() {

        console.log('---order narration---- ' + this.orderDescDSuggestion);
        const loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });
        await loading.present();
        if (this.pageName == 'pendingOrder') {
            this.orderProvider.SetUpdateOrder(this.selectedOrder, 2, this.totalAmount,
                this.overheadAmount, this.totalPayableAmount, this.shippingAddressDetail, this.AcntId,
                this.orderDescDSuggestion).then(async (data) => {
                console.log('------' + data);
                this.toastReturn = data;
                console.log(data);
                this.orderNo = this.toastReturn.OrderNo;
                this.orderDate = this.toastReturn.OrderDate;
                console.log('-----order no-----' + this.orderNo + '-----order date-----' + this.orderDate);
                if (this.toastReturn.ReturnMessage == 'Successfully Updated.' || this.toastReturn.ReturnCode == 0) {
                    // this.presentToast(this.toastReturn.ReturnMessage);
                    let list = [];
                    await this.storage.set('addData', list);
                    await this.storage.set('itemnCount', 0);
                    await this.storage.set('totalProductAmount', 0);
                    await this.storage.set('totalAmount', 0);
                    await this.events.publish('totalAmount', 0);
                    await this.storage.set('totalPayableAmount', this.totalPayableAmount);

                    await this.navCtrl.navigateRoot(['/order-successfull', {
                        'orderNo': this.orderNo,
                        'orderDate': this.orderDate,
                        page: 'pendingOrder'
                    }]);
                } else if (this.toastReturn.ReturnCode == 11) {
                    this.toastReturn.Items[0].ItemPackagingList[0].ClosingStock = 2;
                    await this.storage.set('addData', this.toastReturn.Items);
                    await this.navCtrl.navigateForward(['/cart', {page: 'itemList'}]);
                }
                await loading.dismiss();
            });
        } else {
            await this.navCtrl.navigateForward(['/payment-method', {
                "payableAmount": this.totalPayableAmount,
                "orderSuggestion": this.orderSuggestion,
                "deliveryChargesAmount": this.deliveryCharges,
                "orderAmount": this.totalAmount,
                "overheadAmount": this.overheadAmount,
                page: "itemList"
            }]);
            await loading.dismiss();

            // this.orderProvider.SetPlaceOrder('00000000-0000-0000-0000-000000000000', this.allData.UserId, this.allData.AcntId, this.addData, this.allData, this.shippingAddressDetail,
            //     this.totalAmount, this.deliveryCharges, this.totalPayableAmount, this.overheadAmount, 1, this.orderDescDSuggestion).then(async (data) => {
            //     console.log('---------RS---------' + data);
            //     this.toastReturn = data;
            //     console.log(data);
            //     this.orderNo = this.toastReturn.OrderNo;
            //     this.orderDate = this.toastReturn.OrderDate;
            //     console.log('-----order no-----' + this.orderNo + '-----order date-----' + this.orderDate);
            //     if (this.toastReturn.ReturnMessage == 'Successfully Saved.' || this.toastReturn.ReturnCode == 0) {
            //         // this.presentToast(this.toastReturn.ReturnMessage);
            //         const list = [];
            //         await this.storage.set('addData', list);
            //         await this.storage.set('itemnCount', 0);
            //         await this.storage.set('totalProductAmount', 0);
            //         await this.storage.set('totalAmount', 0);
            //         await this.events.publish('totalAmount', 0);
            //         await this.events.publish('ItemLength', 0);
            //         await this.storage.set('totalPayableAmountForDel', this.totalPayableAmount);
            //
            //         await this.navCtrl.navigateForward(['/order-successfull', {
            //             'orderNo': this.orderNo,
            //             'payableAmount': this.totalPayableAmount,
            //             'orderDate': this.orderDate,
            //             page: 'itemList'
            //         }]);
            //
            //     } else if (this.toastReturn.ReturnCode == 11) {
            //         this.presentAlertForItem();
            //
            //         // this.toastReturn.Items[0].ItemPackagingList[0].ClosingStock=2;
            //         await this.storage.set('addData', this.toastReturn.Items);
            //         await this.navCtrl.navigateForward(['/cart', {page: 'itemList'}]);
            //     }
            //     await loading.dismiss();
            // });
        }
    }

    async presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        /*   toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });*/

        await toast.present();
    }

    async presentAlertForItem() {
        const alert = await this.alertCtrl.create({
            header: 'Item Limit Exceeded!!',
            cssClass: 'alertLogCss',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                        console.log('Disagree');

                    }
                }

            ]
        });
        await alert.present();
    }


}

