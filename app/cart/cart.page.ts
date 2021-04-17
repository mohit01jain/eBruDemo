import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  Events,
  NavController,
  LoadingController,
  Platform, PopoverController,
  ToastController
} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {IonicPage} from 'ionic-angular';
import {HomePage} from "../home/home.page";
import {OrderService} from "../Providers/order/order.service";
import {DeliveryAddressPage} from "../delivery-address/delivery-address.page";
import {OrderSuccessfullPage} from "../order-successfull/order-successfull.page";
import {UtilityService} from "../Providers/utility/utility.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OrderListPage} from "../order-list/order-list.page";
import {AddressService} from "../Providers/address/address.service";
import {SearchItemPage} from "../search-item/search-item.page";
import {ChildDisplayPage} from "../child-display/child-display.page";
import {AdminDashboardPage} from "../admin-dashboard/admin-dashboard.page";
import {PartialUpdatePage} from "../partial-update/partial-update.page";
import {UserService} from "../Providers/user/user.service";
import {ActivatedRoute} from '@angular/router';
import {forEach} from '@angular-devkit/schematics';



@IonicPage()
@Component({
  selector: 'app-cart, [ngDefaultControl]',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],

  animations:
      [
        trigger('fade', [
          state('visible', style({
            opacity: 1
          })),
          state('invisible', style({
            opacity: 0.1
          })),
          transition('visible <=> invisible', animate('200ms linear'))
        ]),
      ]
})
export class CartPage implements OnInit{

  fadeState: String = 'visible';
  public isGSTApplicableExternally: any = false;
  public visible: any;
  public itemCount: any= [];
  public totalAmount: any;
  public addData: any = [];
  public quantityList: any = [];
  public clsQuantityList: any = [];
  public quantity: any;
  public compStateId: any;
  public userStateId: any;
  public overheadAmount: any = 0;
  public cgst: any;
  public sgst: any;
  public itemtotalAmount: any;
  public totalPayableAmount: any;
  public sgstVisible: any = false;
  public igstVisible: any = false;
  public sgstAmount: any;
  public customerRegisterDetail: any;
  public pageNAme: any;
  public selectedOrder: any;
  public allData: any;
  public toastReturn: any;
  public isEnabled: any = false;
  public isEnabledCr: any = false;
  public companyName: any;
  public isQuantityUpdate: any = false;
  public pendingAddData: any = [];
  public displaySection: any;
  public overheadList: any = [];
  public overheadPendingList: any = [];
  public partyAcntId: any;
  public amount: any;
  public igstAmount: any;
  public roundofValue: any = 0;
  public roundofValue1 : any=0;
  public roundOffValueEnable: any = false;
  public userType: any;
  public morefreeDeliveryAmount: any;
  public selectedOrderItems: any=[];
  public discountRate: any = 0;
  public selectAddress: any;
  public addressList: any = ["Pick from store", "Select Address"];
  public addressListResult: any;
  public shippingAddressDetail: any;
  public orderDate: any;
  public addressContactPerson: any;
  public alreadySelectedAddress: any;
  public orderSuggestion: any = '';
  public orderDescSuggestion: any;
  public rememberFlag = 0;
  public rememberFlagIncrement = 0;
  public visibleTen: any = true;
  public visibleHun: any = true;
  public visibleFiv: any = true;
  public visibleTho: any = true;
  public visibleImg: any = true;
  public CrCheck: any = false;
  public flag: any ;
  public status: any;
  public paymentID:any;
  public ourPaymentID: any;
  public paymentMode:any;
  public paymentStatus:any;
  public deliveryChargeList: any = [];
  public RefreshCustomerRegistrationData: any = [];
  public deliveryCharge: any = 0;
  public orderNo: any;
  public cID: any;
  editData = {
    name: '',
    userMobile: '',
    userEmail: '',
    address_line1: '',
    address_line2: '',
    city: '',
    pincode: '',
    ReferralCode: '',
    cContactPersonName: '',
    cContactPersonMobileNo: '',
    cContactPersonEMailID: '',
    cGSTNO: '',
    cPAN: '',
    cFoodLicNo: ''
  };
  public dataPU: any;
  public userId: any;
  public orderNoForMsg: any;
  public orderDateForMsg: any;
  public netAmountForMsg: any;
  public smsCancel: any;
  public smsData2: any;
  public selectedOrderData: any;
  public visibileDiscountRow: any = false;
  public VisibleStk: any = false;
  public visiPObtn: any = false;
  public compData: any;
  public cPhone1: any;
  public userPhone: any;
  public userPhoneForMag: any;
  public groupKeyTabsy: any;
  public mobOrEmailTabsy: any;
  public smsData: any;
  public userInfo: any;
  public CreditLimit: any;
  public CurrentClosingBalance: any;
  public PendingOrderAmount: any;
  public IsNegativeStockAllowed: any;
  public CompanySetting: any = [];
  public remCreditLimit: any;
  public UpdatedItemDetails: any;
  public closingStock: any;
  public Qty: any;
  public st_Flag: any;
  public appVersionNumber: any;
  public getValidateData: any;
  public ReturnCode: any;
  public ReturnMessage: any;
  private ev: any;
  private itemamount: any;
  private x: number;
  public visibility: boolean;


  constructor(public navCtrl: NavController,
              public activatedRoute: ActivatedRoute,
              public storage: Storage, public events: Events, public toastCtrl: ToastController, public alertCtrl: AlertController,
              public orderProvider: OrderService, public platform: Platform, public utilityProvider: UtilityService, public datepipe: DatePipe,
              public decimalPipe: DecimalPipe, public  popoverController: PopoverController, public addressProvider: AddressService,
              public userProvider: UserService, public loadingCtrl: LoadingController)
  {
    this.Basicoperations();
  }


  Basicoperations()
  {
    this.pageNAme = this.activatedRoute.snapshot.paramMap.get("page");
    console.log("page name =" + this.pageNAme);
    if (this.pageNAme == "pendingOrder") {
      this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
      console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
    } else {
      console.log("orderSuggestion name RS---null---");

    }


    this.orderProvider.RetrieveDeliveryCharges().then(res => {
      this.deliveryChargeList = res;
      console.log("Retrieve Delivery Charges List----RS---- " + JSON.stringify(this.deliveryChargeList));
    });

    this.visible = false;
    this.userType = this.utilityProvider.userType;
    console.log("---user type---- " + this.userType);

    this.utilityProvider.currentdateTime = this.datepipe.transform(this.utilityProvider.myDate, 'yyyy-MM-ddTHH:mm:ss ');
    console.log('----latest date ---' + this.utilityProvider.currentdateTime);

    this.pageNAme = this.activatedRoute.snapshot.paramMap.get("page");
    console.log("page name =" + this.pageNAme);
    if (this.userType == 5) {
      if (this.pageNAme == "pendingOrder") {
        this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
        console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
        this.selectedOrder = JSON.parse(this.activatedRoute.snapshot.paramMap.get("orderData"));
        this.pendingAddData = this.selectedOrder.Items;
        this.storage.set("pendingData", this.pendingAddData);
        this.events.publish('pendingData', this.pendingAddData);
        this.addressContactPerson = this.selectedOrder.ShippingAddress.ContactPerson;
        console.log("Contact Person" + this.addressContactPerson );

        console.log("selected address contact person = " + this.selectAddress);
        this.storage.get('userInfo').then((value) => {
          this.allData = value;
          console.log('User DAta -----', this.allData);
          if (this.selectedOrder.ShippingAddress.ShippingId == "ee76114e-0bc5-4da5-a4f5-c57ce721ba2e") {
            this.selectAddress = "Pick from store";
            this.alreadySelectedAddress = "Pick from store";
            this.selectedAddress("Pick from store");
          } else {
            console.log("selected address id = " + this.selectedOrder.ShippingAddress.ShippingId);
            this.selectAddress = "Select Address";
            this.alreadySelectedAddress = "Select Address";
            this.selectedAddress("Select Address");
          }
        });


        this.events.subscribe('pendingData', list => {
          this.pendingAddData = list;
          console.log("pending data list = " + JSON.stringify(this.pendingAddData));
        });
        console.log("selected pending order items -------" + JSON.stringify(this.pendingAddData));

        console.log("selected order Amount -------" + JSON.stringify(this.selectedOrder.OrderAmt));
        this.itemCount = this.pendingAddData.length;
        this.totalAmount = this.selectedOrder.OrderAmt;

        this.calculateDeliveryCharge();
        console.log("total amount od pending order = " + this.totalAmount);
        if (this.isGSTApplicableExternally == true) {
          this.calculatePendingOverheadAmount(this.pendingAddData);
        } else {
          this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        }
        if (this.userType == 5) {
          this.chckForFreeDelivery();
        }
        this.calculateRoundOff();

      }
      else {
        this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
        console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);



        this.storage.get('userInfo').then((value) => {
          this.allData = value;
          console.log('User DAta -----', this.allData);
          this.selectAddress = 'Select Address';
          this.selectedAddress(this.selectAddress);
        });

        this.storage.get("ChildData").then(data => {
          this.displaySection = data;
          console.log("-----dispaly section----" + this.displaySection);
        });
        this.storage.get('itemnCount').then(count => {
          this.itemCount = count;
          console.log("item count = " + this.itemCount);
        });

        this.events.subscribe('addData', list => {
          this.addData = list;
          console.log("data list = " + JSON.stringify(this.addData));
        });

        this.events.subscribe('totalAmount', (isShow) => {
          this.totalAmount = isShow;
          console.log(this.itemCount);
        });

        this.storage.get('addData').then((list) => {
          this.addData = list;
          console.log("----addData---" + JSON.stringify(this.addData));
          this.closingStock = this.addData[0].ItemPackagingList[0].ClosingStock;
          console.log(this.closingStock);
          this.Qty = this.addData[0].ItemPackagingList[0].Quantity;
          console.log(this.Qty);
          for (var i = 0; i < list.length; i++) {
            this.quantityList[i] = list[i].ItemPackagingList[0].Quantity;

          }
          console.log("---quantity list----" + this.quantityList);
        });

        this.storage.get('userInfo').then((data) => {
          this.customerRegisterDetail = data;
          console.log('--userDetail--' + JSON.stringify(data));
        });

        this.storage.get('totalProductAmount').then((isLoginResult) => {
          console.log('---total amount ---' + isLoginResult);
          if (this.itemCount == null || this.itemCount == 0) {
            console.log("No item found");
            this.totalAmount = 0;
          } else {


            console.log("selected order Amount -------" + isLoginResult);
            this.totalAmount = isLoginResult;

            this.calculateDeliveryCharge();
            this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
            if (this.userType == 5) {
              this.chckForFreeDelivery();
            }
            this.calculateRoundOff();

          }
        });


        if (this.isGSTApplicableExternally == true) {
          this.storage.get('CompStateID').then(id => {
            this.compStateId = id;
            console.log("company state id = " + this.compStateId);
          });
          this.storage.get('stateID').then(id => {
            this.userStateId = id;
            console.log("user state id = " + this.userStateId);
            this.calculateOverhead();
          });
        }

      }
    } else if (this.userType == 2) {
      if (this.pageNAme == "viewOrder") {
        this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
        console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
        this.selectedOrder = JSON.parse(this.activatedRoute.snapshot.paramMap.get("orderData"));
        this.selectedOrderItems = this.selectedOrder.Items;


        this.itemCount = this.selectedOrderItems.length;
        this.totalAmount = this.selectedOrder.OrderAmt;

        for (var i = 0; i < this.deliveryChargeList.length; i++) {
          console.log("-----BillAmountFrom----- " + this.deliveryChargeList[i].BillAmountFrom);
          console.log("-----BillAmountUpto----- " + this.deliveryChargeList[i].BillAmountUpto);

          if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
            if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
              console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
              this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
              this.calculateRoundOffDc(this.deliveryCharge);
              console.log("---after--Percent----- " + this.deliveryCharge);
            } else {
              console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
              this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
              this.calculateRoundOffDc(this.deliveryCharge);
              console.log("---after--Fixed----- " + this.deliveryCharge)

            }

            console.log("-----total amount----- " + this.totalAmount);
            console.log("-----delivery charge value-----" + this.deliveryCharge);
          }
        }
        if (this.isGSTApplicableExternally == true) {
          this.calculatePendingOverheadAmount(this.pendingAddData);
        } else {
          console.log("total amount after modification = " + this.totalAmount);
          this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        }
        this.calculateRoundOff();

        this.storage.set("orderViewData", this.selectedOrderItems);
        this.events.subscribe('orderViewData', list => {
          this.selectedOrderItems = list;
          console.log("data list = " + JSON.stringify(this.selectedOrderItems));

          for(this.x =0; i<this.selectedOrderItems; i++)
          {
            this.itemCount=i;
          }

          this.totalAmount = 0;
          for (var i = 0; i < this.itemCount; i++) {
            console.log("item amount = " + this.selectedOrderItems[i].ItemPackagingList[0].SaleRate * this.selectedOrderItems[i].ItemPackagingList[0].Quantity);

            this.itemamount = this.selectedOrderItems[i].ItemPackagingList[0].SaleRate * this.selectedOrderItems[i].ItemPackagingList[0].Quantity;

            this.totalAmount = this.totalAmount + (this.selectedOrderItems[i].ItemPackagingList[0].SaleRate * this.selectedOrderItems[i].ItemPackagingList[0].Quantity);
          }

          console.log("selected order items admin panel = " + JSON.stringify(this.selectedOrderItems));

          this.calculateRoundOffDc(this.deliveryCharge);

          for (var i = 0; i < this.deliveryChargeList.length; i++) {
            console.log("-----BillAmountFrom----- " + this.deliveryChargeList[i].BillAmountFrom);
            console.log("-----BillAmountUpto----- " + this.deliveryChargeList[i].BillAmountUpto);

            if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
              if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
                console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
                this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
                this.calculateRoundOffDc(this.deliveryCharge);
                console.log("---after--Percent----- " + this.deliveryCharge);
              } else {
                console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
                this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
                this.calculateRoundOffDc(this.deliveryCharge);
                console.log("---after--Fixed----- " + this.deliveryCharge)

              }

              console.log("-----total amount----- " + this.totalAmount);
              console.log("-----delivery charge value-----" + this.deliveryCharge);
            }
          }

          if (this.isGSTApplicableExternally == true) {
            this.calculatePendingOverheadAmount(this.pendingAddData);
          } else {
            console.log("total amount after modification = " + this.totalAmount);
            this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
          }

          this.calculateRoundOff();


        });
        this.addressContactPerson = this.selectedOrder.ShippingAddress.ContactPerson;
        console.log("selected address contact person = " + this.selectAddress);
        this.storage.get('userInfo').then((value) => {
          this.allData = value;
          console.log('User DAta -----', this.allData);
          if (this.addressContactPerson == null) {
            this.selectAddress = "Pick from store";
            this.alreadySelectedAddress = "Pick from store";
            this.selectedAddress("Pick from store");
          } else {
            this.selectAddress = "Select Address";
            this.alreadySelectedAddress = "Select Address";
            this.selectedAddress("Select Address");
          }
        });
      }
    }

    this.storage.get('companyName').then(res => {
      this.companyName = res;
    });

    this.storage.get('userInfo').then((isLoginResult) => {
      this.editData.name = isLoginResult.Name;
      this.editData.userEmail = isLoginResult.Email;
      this.editData.userMobile = isLoginResult.MobileNo;
      this.editData.address_line1 = isLoginResult.Address1;
      this.editData.address_line2 = isLoginResult.Address2;
      this.editData.city = isLoginResult.City;
      this.editData.pincode = isLoginResult.Pincode;
      this.editData.ReferralCode = isLoginResult.ReferralCode;

      this.cID = isLoginResult.ID;
      this.editData.cContactPersonName = isLoginResult.ContactPersonName;
      this.editData.cContactPersonMobileNo = isLoginResult.ContactPersonMobileNo;
      this.editData.cContactPersonEMailID = isLoginResult.ContactPersonEMailID;
      this.editData.cGSTNO = isLoginResult.GSTNO;
      this.editData.cPAN = isLoginResult.PAN;
      this.editData.cFoodLicNo = isLoginResult.FoodLicNo;

      console.log('-CDetails--RS-' + this.cID);
      console.log('-CDetails--RS-' + this.editData.cContactPersonName);
      console.log('-CDetails--RS-' + this.editData.cContactPersonMobileNo);
      console.log('-CDetails--RS-' + this.editData.cContactPersonEMailID);
      console.log('-CDetails--RS-' + this.editData.cGSTNO);
      console.log('-CDetails--RS-' + this.editData.cPAN);
      console.log('-CDetails--RS-' + this.editData.cFoodLicNo);

      console.log('----' + JSON.stringify(isLoginResult));

    });
    this.storage.get('userID').then((isLoginResult) => {
      this.userId = isLoginResult;
      console.log(this.userId);
    });

    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " + this.groupKeyTabsy);

    });
  }


  Basicoperations1()
  {
    this.pageNAme = this.activatedRoute.snapshot.paramMap.get("page");
    console.log("page name =" + this.pageNAme);
    if (this.pageNAme == "pendingOrder") {
      this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
      console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
    } else {
      console.log("orderSuggestion name RS---null---");

    }

    this.orderProvider.RetrieveDeliveryCharges().then(res => {
      this.deliveryChargeList = res;
      console.log("Retrieve Delivery Charges List----RS---- " + JSON.stringify(this.deliveryChargeList));
      this.calculateDeliveryCharge();
    });

    this.visible = false;
    this.userType = this.utilityProvider.userType;
    console.log("---user type---- " + this.userType);

    this.utilityProvider.currentdateTime = this.datepipe.transform(this.utilityProvider.myDate, 'yyyy-MM-ddTHH:mm:ss');
    console.log('----latest date ---' + this.utilityProvider.currentdateTime);

    this.pageNAme = this.activatedRoute.snapshot.paramMap.get("page");
    console.log("page name =" + this.pageNAme);
    if (this.userType == 5) {
      if (this.pageNAme == "pendingOrder") {
        this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
        console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
        this.selectedOrder = JSON.parse( this.activatedRoute.snapshot.paramMap.get("orderData"));
        this.pendingAddData = this.selectedOrder.Items;
        this.storage.set("pendingData", this.pendingAddData);
        this.events.publish('pendingData', this.pendingAddData);
        this.addressContactPerson = this.selectedOrder.ShippingAddress.ContactPerson;
        console.log("selected address contact person = " + this.selectAddress);
        this.storage.get('userInfo').then((value) => {
          this.allData = value;
          console.log('User DAta -----', this.allData);
          if (this.selectedOrder.ShippingAddress.ShippingId == "ee76114e-0bc5-4da5-a4f5-c57ce721ba2e") {
            this.selectAddress = "Pick from store";
            this.alreadySelectedAddress = "Pick from store";
            this.selectedAddress("Pick from store");
          } else {
            console.log("selected address id = " + this.selectedOrder.ShippingAddress.ShippingId);
            this.selectAddress = "Select Address";
            this.alreadySelectedAddress = "Select Address";
            this.selectedAddress("Select Address");
          }
        });


        this.events.subscribe('pendingData', list => {
          this.pendingAddData = list;
          console.log("pending data list = " + JSON.stringify(this.pendingAddData));
        });
        console.log("selected pending order items -------" + JSON.stringify(this.pendingAddData));

        console.log("selected order Amount -------" + JSON.stringify(this.selectedOrder.OrderAmt));
        this.itemCount = this.pendingAddData.length;
        this.totalAmount = this.selectedOrder.OrderAmt;

        this.calculateDeliveryCharge();
        console.log("total amount od pending order = " + this.totalAmount);
        if (this.isGSTApplicableExternally == true) {
          this.calculatePendingOverheadAmount(this.pendingAddData);
        } else {
          this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        }
        if (this.userType == 5) {
          this.chckForFreeDelivery();
        }

        this.calculateRoundOff();

      }
      else {
        this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
        console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
        this.storage.get('userInfo').then((value) => {
          this.allData = value;
          console.log('User DAta -----', this.allData);
          this.selectAddress = 'Select Address';
          this.selectedAddress(this.selectAddress);
        });

        this.storage.get("ChildData").then(data => {
          this.displaySection = data;
          console.log("-----dispaly section----" + this.displaySection);
        });
        this.storage.get('itemnCount').then(count => {
          this.itemCount = count;
          console.log("item count = " + this.itemCount);
        });

        this.events.subscribe('addData', list => {
          this.addData = list;
          console.log("data list = " + JSON.stringify(this.addData));
        });

        this.events.subscribe('totalAmount', (isShow) => {
          this.totalAmount = isShow;
          console.log(this.itemCount);
        });

        this.storage.get('addData').then((list) => {
          this.addData = list;
          console.log("----addData---" + JSON.stringify(this.addData));
          this.closingStock = this.addData[0].ItemPackagingList[0].ClosingStock;
          console.log(this.closingStock);
          this.Qty = this.addData[0].ItemPackagingList[0].Quantity;
          console.log(this.Qty);
          for (var i = 0; i < list.length; i++) {
            this.quantityList[i] = list[i].ItemPackagingList[0].Quantity;

          }
          console.log("---quantity list----" + this.quantityList);
        });

        this.storage.get('userInfo').then((data) => {
          this.customerRegisterDetail = data;
          console.log('--userDetail--' + JSON.stringify(data));
        });

        this.storage.get('totalProductAmount').then((isLoginResult) => {
          console.log('---total amount ---' + isLoginResult);
          if (this.itemCount == null || this.itemCount == 0) {
            console.log("No item found");
            this.totalAmount = 0;
          } else {

            console.log("selected order Amount -------" + isLoginResult);
            this.totalAmount = isLoginResult;

            this.calculateDeliveryCharge();
            this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
            if (this.userType == 5) {
              this.chckForFreeDelivery();
            }
            this.calculateRoundOff();

          }
        });


        if (this.isGSTApplicableExternally == true) {
          this.storage.get('CompStateID').then(id => {
            this.compStateId = id;
            console.log("company state id = " + this.compStateId);
          });
          this.storage.get('stateID').then(id => {
            this.userStateId = id;
            console.log("user state id = " + this.userStateId);
            this.calculateOverhead();
          });
        }

      }
    } else if (this.userType == 2) {
      if (this.pageNAme == "viewOrder") {
        this.orderDescSuggestion = this.activatedRoute.snapshot.paramMap.get("orderSuggestionDesc");
        console.log("orderSuggestion name RS------ = " + this.orderDescSuggestion);
        this.selectedOrder = JSON.parse(this.activatedRoute.snapshot.paramMap.get("orderData"));
        this.selectedOrderItems = this.selectedOrder.Items;
        console.log(this.selectedOrder);


        this.itemCount = this.selectedOrderItems.length;
        this.totalAmount = this.selectedOrder.OrderAmt;

        for (var i = 0; i < this.deliveryChargeList.length; i++) {
          console.log("-----BillAmountFrom----- " + this.deliveryChargeList[i].BillAmountFrom);
          console.log("-----BillAmountUpto----- " + this.deliveryChargeList[i].BillAmountUpto);

          if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
            if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
              console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
              this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
              this.calculateRoundOffDc(this.deliveryCharge);
              console.log("---after--Percent----- " + this.deliveryCharge);
            } else {
              console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
              this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
              this.calculateRoundOffDc(this.deliveryCharge);
              console.log("---after--Fixed----- " + this.deliveryCharge)

            }

            console.log("-----total amount----- " + this.totalAmount);
            console.log("-----delivery charge value-----" + this.deliveryCharge);
          }
        }
        if (this.isGSTApplicableExternally == true) {
          this.calculatePendingOverheadAmount(this.pendingAddData);
        } else {
          console.log("total amount after modification = " + this.totalAmount);
          this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        }

        this.calculateRoundOff();

        this.storage.set("orderViewData", this.selectedOrderItems);
        this.events.subscribe('orderViewData', list => {
          this.selectedOrderItems = list;
          console.log("data list = " + JSON.stringify(this.selectedOrderItems));
          this.itemCount = this.selectedOrderItems.length;
          this.totalAmount = 0;
          for (var i = 0; i < this.itemCount; i++) {
            console.log("item amount = " + this.selectedOrderItems[i].ItemPackagingList[0].SaleRate * this.selectedOrderItems[i].ItemPackagingList[0].Quantity);
            //
            this.itemamount = this.selectedOrderItems[i].ItemPackagingList[0].SaleRate * this.selectedOrderItems[i].ItemPackagingList[0].Quantity;
            //
            this.totalAmount = this.totalAmount + (this.selectedOrderItems[i].ItemPackagingList[0].SaleRate * this.selectedOrderItems[i].ItemPackagingList[0].Quantity);
          }

          console.log("selected order items admin panel = " + JSON.stringify(this.selectedOrderItems));

          for (var i = 0; i < this.deliveryChargeList.length; i++) {
            console.log("-----BillAmountFrom----- " + this.deliveryChargeList[i].BillAmountFrom);
            console.log("-----BillAmountUpto----- " + this.deliveryChargeList[i].BillAmountUpto);

            if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
              if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
                console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
                this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
                this.calculateRoundOffDc(this.deliveryCharge);
                console.log("---after--Percent----- " + this.deliveryCharge);
              } else {
                console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
                this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
                this.calculateRoundOffDc(this.deliveryCharge);
                console.log("---after--Fixed----- " + this.deliveryCharge)

              }

              console.log("-----total amount----- " + this.totalAmount);
              console.log("-----delivery charge value-----" + this.deliveryCharge);
            }
          }

          if (this.isGSTApplicableExternally == true) {
            this.calculatePendingOverheadAmount(this.pendingAddData);
          } else {
            console.log("total amount after modification = " + this.totalAmount);
            this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
          }

          this.calculateRoundOff();


        });
        this.addressContactPerson = this.selectedOrder.ShippingAddress.ContactPerson;

        console.log("selected address contact person = " + this.selectAddress);
        this.storage.get('userInfo').then((value) => {
          this.allData = value;

          console.log('User DAta -----', this.allData);
          if (this.selectedOrder.ShippingAddress.ShippingId == "ee76114e-0bc5-4da5-a4f5-c57ce721ba2e") {
            this.selectAddress = "Pick from store";
            this.alreadySelectedAddress = "Pick from store";
            this.selectedAddress("Pick from store");
          } else {
            this.selectAddress = "Select Address";
            this.alreadySelectedAddress = "Select Address";
            this.selectedAddress("Select Address");
          }
        });
      }
    }
    this.storage.get('companyName').then(res => {
      this.companyName = res;
    });

    this.storage.get('userInfo').then((isLoginResult) => {
      this.editData.name = isLoginResult.Name;
      this.editData.userEmail = isLoginResult.Email;
      this.editData.userMobile = isLoginResult.MobileNo;
      this.editData.address_line1 = isLoginResult.Address1;
      this.editData.address_line2 = isLoginResult.Address2;
      this.editData.city = isLoginResult.City;
      this.editData.pincode = isLoginResult.Pincode;
      this.editData.ReferralCode = isLoginResult.ReferralCode;

      this.cID = isLoginResult.ID;
      this.editData.cContactPersonName = isLoginResult.ContactPersonName;
      this.editData.cContactPersonMobileNo = isLoginResult.ContactPersonMobileNo;
      this.editData.cContactPersonEMailID = isLoginResult.ContactPersonEMailID;
      this.editData.cGSTNO = isLoginResult.GSTNO;
      this.editData.cPAN = isLoginResult.PAN;
      this.editData.cFoodLicNo = isLoginResult.FoodLicNo;

      console.log('-CDetails--RS-' + this.cID);
      console.log('-CDetails--RS-' + this.editData.cContactPersonName);
      console.log('-CDetails--RS-' + this.editData.cContactPersonMobileNo);
      console.log('-CDetails--RS-' + this.editData.cContactPersonEMailID);
      console.log('-CDetails--RS-' + this.editData.cGSTNO);
      console.log('-CDetails--RS-' + this.editData.cPAN);
      console.log('-CDetails--RS-' + this.editData.cFoodLicNo);

      console.log('----' + JSON.stringify(isLoginResult));

    });
    this.storage.get('userID').then((isLoginResult) => {
      this.userId = isLoginResult;
      console.log(this.userId);
    });

    this.storage.get("groupKeyTabsy").then(res => {
      this.groupKeyTabsy = res;
      console.log("groupKeyTabsy---- " + this.groupKeyTabsy);

    });
  }



  async presentAlertForUpdateVer(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Download',
          handler: () => {
            console.log('Agree');
            open("https://tabserp.com/Home/DownloadApp", '_system', 'location=yes')
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {

    //this.ngtiveCheck();
    this.ionViewDidEnter1();
    // this.calculateRoundOff();
    this.platform.backButton.subscribeWithPriority(9999, () => {
      // todo something
      this.navCtrl.pop();
      this.totalCrCheck();

    });
    this.ngtiveCheck();
    this.totalCrCheck();

  }

  totalCrCheck() {

    this.storage.get('userInfo').then((isLoginResult) => {
      if (isLoginResult != null) {
        this.userInfo = isLoginResult;
        console.log("userInfo------RS" + JSON.stringify(this.userInfo));
        this.userProvider.getRefreshCustomerRegistrationData(this.userInfo).then(res => {
          this.RefreshCustomerRegistrationData = res;
          console.log("RefreshCustomerRegistrationData List----RS---- " + JSON.stringify(this.RefreshCustomerRegistrationData));


          this.CompanySetting = this.RefreshCustomerRegistrationData.CompanySetting;
          this.CreditLimit = this.RefreshCustomerRegistrationData.CreditLimit;
          console.log(this.CreditLimit + "--CreditLimit");
          this.CurrentClosingBalance = this.RefreshCustomerRegistrationData.CurrentClosingBalance;
          console.log(this.CurrentClosingBalance + " --CurrentClosingBalance");
          this.PendingOrderAmount = this.RefreshCustomerRegistrationData.PendingOrderAmount;
          console.log(this.PendingOrderAmount + "--PendingOrderAmount");

          this.remCreditLimit = (this.CreditLimit + this.CurrentClosingBalance) - this.PendingOrderAmount;
          this.storage.set('remCreditLimit', this.remCreditLimit);

          // console.log("CreditLimit - " + this.CreditLimit + "--CurrentClosingBalance - " + this.CurrentClosingBalance + "--PendingOrderAmount" + this.PendingOrderAmount + "==" + this.remCreditLimit);
          console.log(this.totalPayableAmount + "--totalPayableAmount");
          console.log(this.remCreditLimit + "--remCreditLimit");


          this.storage.get('st_Flag').then((result) => {
            this.st_Flag = result;
            console.log(this.st_Flag);
            var my_Flag = false;
            if (this.totalPayableAmount > this.remCreditLimit) {
              my_Flag = true;
            }
            if (my_Flag != this.st_Flag) {
              if (my_Flag == true) {
              }
              this.storage.set('st_Flag', my_Flag);
            }
          });

          this.IsNegativeStockAllowed = this.RefreshCustomerRegistrationData.CompanySetting.IsNegativeStockAllowed;
          console.log(this.IsNegativeStockAllowed);
          if (this.IsNegativeStockAllowed == true) {
            console.log("True");

          } else {
            console.log("False");

          }
        });
      }
    });
  }

  ngtiveCheck() {

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
            console.log("False");
            this.storage.get('addData').then((list) => {
              this.addData = list;
              console.log("----addData---" + JSON.stringify(this.addData));
              this.isEnabledCr = true;
              for (var i = 0; i < list.length; i++) {
                if (list[i].ItemPackagingList[0].ClosingStock < list[i].ItemPackagingList[0].Quantity) {
                  this.isEnabledCr = false;
                }
              }
            });
          }
        });
      }
    });
  }


  ionViewDidLoad() {

    this.Basicoperations();

    this.ionViewDidEnter1();

    this.ngtiveCheck();


  }


  ionViewDidEnter()
  {
    console.log('ionViewDidEnter CartPage');

    this.Basicoperations1();

    this.ionViewDidEnter1();

    this.ngtiveCheck();

  }


  ionViewDidEnter1()
  {
    console.log('ionViewWillEnter CartPage');

    this.Basicoperations1();


  }

  selectedAddress(selectedAdd) {
    console.log("selected address = " + this.selectAddress);
    console.log("already selecetd address = " + this.alreadySelectedAddress);
    if (this.pageNAme == "pendingOrder") {
      if (this.alreadySelectedAddress != selectedAdd) {
        this.isEnabled = true;
      } else {
        this.isEnabled = false;
      }
    }
    if (selectedAdd == "Pick from store") {
      const loading =  this.loadingCtrl.create({
        message: 'Please wait...'
      });
      //  loading.present();
      console.log("pick from store selected");
      this.selectAddress = "Pick from store";
      this.addressProvider.getSavedAddresses(this.allData.AcntId).then(res => {
        this.addressListResult = res;
        console.log("Address list = " + JSON.stringify(this.addressListResult));
        this.shippingAddressDetail = this.addressListResult[0];
        console.log("Shipping Address Detail = " + JSON.stringify(this.shippingAddressDetail));
        this.deliveryCharge = 0;
        this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        this.calculateRoundOff();
        this.totalCrCheck();
        this.ngtiveCheck()

      });
      //  loading.dismiss();
    }
    else if (selectedAdd == "Select Address") {
      const loading =  this.loadingCtrl.create({
        message: 'Please wait...'
      });
      // await loading.present();
      console.log("Select Address selected");
      this.selectAddress = "Select Address";
      for (var i = 0; i < this.deliveryChargeList.length; i++) {
        console.log("-----BillAmountFrom----- " + this.deliveryChargeList[i].BillAmountFrom);
        console.log("-----BillAmountUpto----- " + this.deliveryChargeList[i].BillAmountUpto);

        if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
          if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {

            this.calculateDeliveryCharge();

            this.totalCrCheck();
            this.ngtiveCheck();

          } else {
            this.calculateDeliveryCharge();
            this.totalCrCheck();
            this.ngtiveCheck();


          }

          console.log("-----total amount----- " + this.totalAmount);
          console.log("-----delivery charge value-----" + this.deliveryCharge);
        }
      }


      this.totalPayableAmount = this.totalAmount + this.deliveryCharge;

      this.calculateRoundOff();

    }
  }

  calculateOverhead() {
    this.overheadList = [];
    this.storage.get('addData').then(list => {
      if (list != null) {
        console.log("=======addData======= " + JSON.stringify(list));
        for (var i = 0; i < list.length; i++) {
          console.log("value of i = " + i);
          if (this.userStateId == this.compStateId) {
            var igstObj: any = new Object();
            var flag = 0;
            if (this.overheadList != "") {
              for (var j = 0; j < this.overheadList.length; j++) {
                if (this.overheadList[j].taxRate == (list[i].TaxPercentage / 2)) {
                  // this.overheadList[j].taxRate = list[i].TaxPercentage;
                  this.overheadList[j].amount = this.overheadList[j].amount + list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity;
                  this.igstAmount = (list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity) * ((list[i].TaxPercentage / 2) / 100);
                  this.overheadList[j].overheadAmount = parseFloat(this.overheadList[j].overheadAmount) + parseFloat(this.igstAmount);
                  console.log("item found");
                  flag = 1;
                }
              }
              if (flag == 0) {
                console.log("add a new item");
                igstObj.taxRate = list[i].TaxPercentage / 2;
                igstObj.amount = list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity;
                igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity) * ((list[i].TaxPercentage / 2) / 100), '1.2-2'));
                this.overheadList.push(igstObj);
              }
            } else {
              console.log("List is empty");
              igstObj.taxRate = list[i].TaxPercentage / 2;
              igstObj.amount = list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity;
              igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity) * ((list[i].TaxPercentage / 2) / 100), '1.2-2'));
              this.overheadList.push(igstObj);
            }
            this.sgstVisible = true;

          } else {
            var igstObj: any = new Object();
            var flag = 0;
            if (this.overheadList != "") {
              for (var j = 0; j < this.overheadList.length; j++) {
                if (this.overheadList[j].taxRate == list[i].TaxPercentage) {
                  this.overheadList[j].amount = this.overheadList[j].amount + list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity;
                  this.igstAmount = (list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity) * (list[i].TaxPercentage / 100);
                  this.overheadList[j].overheadAmount = parseFloat(this.overheadList[j].overheadAmount) + parseFloat(this.igstAmount);
                  flag = 1;
                }
              }
              if (flag == 0) {
                igstObj.taxRate = list[i].TaxPercentage;
                igstObj.amount = list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity;
                igstObj.overheadAmount = this.decimalPipe.transform((list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity) * (list[i].TaxPercentage / 100), '1.2-2');
                this.overheadList.push(igstObj);
              }
            } else {
              igstObj.taxRate = list[i].TaxPercentage;
              igstObj.amount = list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity;
              igstObj.overheadAmount = this.decimalPipe.transform((list[i].ItemPackagingList[0].OurRate * list[i].ItemPackagingList[0].Quantity) * (list[i].TaxPercentage / 100), '1.2-2');
              this.overheadList.push(igstObj);
            }
            this.igstVisible = true;
          }
        }
      }
      console.log("overhead list = " + JSON.stringify(this.overheadList));
      this.totalPayableAmount = this.totalAmount;
      if (this.userStateId == this.compStateId) {
        for (var i = 0; i < this.overheadList.length; i++) {
          this.amount = this.overheadList[i].overheadAmount * 2;
          this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.amount);
        }
      } else {
        console.log("overhead list = " + JSON.stringify(this.overheadList));
        this.totalPayableAmount = this.totalAmount;
        for (var i = 0; i < this.overheadList.length; i++) {
          this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.overheadList[i].overheadAmount);
        }
      }

      console.log("payable amount = " + this.totalPayableAmount);
    });
  }

  calculatePendingOverheadAmount(selecedOrderData) {

    console.log("=======addData======= " + JSON.stringify(selecedOrderData));
    for (var i = 0; i < selecedOrderData.length; i++) {
      if (this.userStateId == this.compStateId) {
        var igstObj: any = new Object();
        var flag = 0;
        if (this.overheadPendingList != "") {
          for (var j = 0; j < this.overheadPendingList.length; j++) {
            if (this.overheadPendingList[j].taxRate == (selecedOrderData[i].TaxPercentage / 2)) {
              this.overheadPendingList[j].amount = this.overheadPendingList[j].amount + selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity;
              this.igstAmount = (selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity) * ((selecedOrderData[i].TaxPercentage / 2) / 100);
              this.overheadPendingList[j].overheadAmount = parseFloat(this.overheadPendingList[j].overheadAmount) + parseFloat(this.igstAmount);
              console.log("item found");
              flag = 1;
            }
          }
          if (flag == 0) {
            console.log("add a new item");
            igstObj.taxRate = selecedOrderData[i].TaxPercentage / 2;
            igstObj.amount = selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity;
            igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity) * ((selecedOrderData[i].TaxPercentage / 2) / 100), '1.2-2'));
            this.overheadPendingList.push(igstObj);
          }
        } else {
          console.log("List is empty");
          igstObj.taxRate = selecedOrderData[i].TaxPercentage / 2;
          igstObj.amount = selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity;
          igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity) * ((selecedOrderData[i].TaxPercentage / 2) / 100), '1.2-2'));
          this.overheadPendingList.push(igstObj);
        }

        this.sgstVisible = true;

      } else {
        var igstObj: any = new Object();
        var flag = 0;
        if (this.overheadPendingList != "") {
          for (var j = 0; j < this.overheadPendingList.length; j++) {
            if (this.overheadPendingList[j].taxRate == selecedOrderData[i].TaxPercentage) {
              this.overheadPendingList[j].amount = this.overheadPendingList[j].amount + selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity;
              this.igstAmount = (selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity) * (selecedOrderData[i].TaxPercentage / 100);
              this.overheadPendingList[j].overheadAmount = parseFloat(this.overheadPendingList[j].overheadAmount) + parseFloat(this.igstAmount);
              flag = 1;
            }
          }
          if (flag == 0) {
            igstObj.taxRate = selecedOrderData[i].TaxPercentage;
            igstObj.amount = selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity;
            igstObj.overheadAmount = this.decimalPipe.transform((parseFloat(selecedOrderData[i].ItemPackagingList[0].SaleRate) * selecedOrderData[i].ItemPackagingList[0].Quantity) * (parseFloat(selecedOrderData[i].TaxPercentage) / 100), '1.2-2');
            this.overheadPendingList.push(igstObj);
          }
        } else {
          igstObj.taxRate = selecedOrderData[i].TaxPercentage;
          console.log("tax percent = " + selecedOrderData[i].TaxPercentage);
          igstObj.amount = selecedOrderData[i].ItemPackagingList[0].SaleRate * selecedOrderData[i].ItemPackagingList[0].Quantity;
          igstObj.overheadAmount = this.decimalPipe.transform((parseFloat(selecedOrderData[i].ItemPackagingList[0].SaleRate) * selecedOrderData[i].ItemPackagingList[0].Quantity) * (parseFloat(selecedOrderData[i].TaxPercentage) / 100), '1.2-2');
          this.overheadPendingList.push(igstObj);
        }

        this.igstVisible = true;
      }
    }
    console.log("overhead list = " + JSON.stringify(this.overheadPendingList));
    this.totalPayableAmount = this.totalAmount;
    if (this.userStateId == this.compStateId) {
      for (var i = 0; i < this.overheadPendingList.length; i++) {
        this.amount = this.overheadPendingList[i].overheadAmount * 2;
        this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.amount);
      }
    } else {
      console.log("overhead list = " + JSON.stringify(this.overheadPendingList));
      this.totalPayableAmount = this.totalAmount;
      for (var i = 0; i < this.overheadPendingList.length; i++) {
        this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.overheadPendingList[i].overheadAmount);
      }
    }
  }

  calculateOverheadAmount() {
    this.overheadAmount = 0;
    this.overheadList = [];
    if (this.addData.length != null) {
      console.log("----" + this.addData.length);
      for (var i = 0; i < this.addData.length; i++) {
        if (this.userStateId == this.compStateId) {
          var igstObj: any = new Object();
          var flag = 0;
          if (this.overheadList != "") {
            for (var j = 0; j < this.overheadList.length; j++) {
              if (this.overheadList[j].taxRate == (this.addData[i].TaxPercentage / 2)) {
                this.overheadList[j].amount = this.overheadList[j].amount + this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity;
                this.igstAmount = (this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity) * ((this.addData[i].TaxPercentage / 2) / 100);
                this.overheadList[j].overheadAmount = parseFloat(this.overheadList[j].overheadAmount) + parseFloat(this.igstAmount);
                console.log("item found");
                flag = 1;
              }
            }
            if (flag == 0) {
              console.log("add a new item");
              igstObj.taxRate = this.addData[i].TaxPercentage / 2;
              igstObj.amount = this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity;
              igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity) * ((this.addData[i].TaxPercentage / 2) / 100), '1.2-2'));
              this.overheadList.push(igstObj);
            }
          } else {
            console.log("List is empty");
            igstObj.taxRate = this.addData[i].TaxPercentage / 2;
            igstObj.amount = this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity;
            igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity) * ((this.addData[i].TaxPercentage / 2) / 100), '1.2-2'));
            this.overheadList.push(igstObj);
          }
          this.sgstVisible = true;
        } else {
          var igstObj: any = new Object();
          var flag = 0;
          if (this.overheadList != "") {
            for (var j = 0; j < this.overheadList.length; j++) {
              if (this.overheadList[j].taxRate == this.addData[i].TaxPercentage) {
                this.overheadList[j].amount = this.overheadList[j].amount + this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity;
                this.igstAmount = (this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity) * (this.addData[i].TaxPercentage / 100);
                this.overheadList[j].overheadAmount = parseFloat(this.overheadList[j].overheadAmount) + parseFloat(this.igstAmount);
                flag = 1;
              }
            }
            if (flag == 0) {
              igstObj.taxRate = this.addData[i].TaxPercentage;
              igstObj.amount = this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity;
              igstObj.overheadAmount = this.decimalPipe.transform((this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity) * (this.addData[i].TaxPercentage / 100), '1.2-2');
              this.overheadList.push(igstObj);
            }
          } else {
            igstObj.taxRate = this.addData[i].TaxPercentage;
            igstObj.amount = this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity;
            igstObj.overheadAmount = this.decimalPipe.transform((this.addData[i].ItemPackagingList[0].OurRate * this.addData[i].ItemPackagingList[0].Quantity) * (this.addData[i].TaxPercentage / 100), '1.2-2');
            this.overheadList.push(igstObj);
          }
          this.igstVisible = true;
        }
      }
    }
    console.log("overhead list = " + JSON.stringify(this.overheadList));
    this.totalPayableAmount = this.totalAmount;
    if (this.userStateId == this.compStateId) {
      for (var i = 0; i < this.overheadList.length; i++) {
        this.amount = this.overheadList[i].overheadAmount * 2;
        this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.amount);
      }
    } else {
      console.log("overhead list = " + JSON.stringify(this.overheadList));
      this.totalPayableAmount = this.totalAmount;
      for (var i = 0; i < this.overheadList.length; i++) {
        this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.overheadList[i].overheadAmount);
      }
    }
    console.log("payable amount = " + this.totalPayableAmount);
  }

  calculateOverheadPendingUpdatedAmount() {
    this.overheadPendingList = [];
    if (this.pendingAddData.length != null) {
      console.log("----" + JSON.stringify(this.pendingAddData));
      for (var i = 0; i < this.pendingAddData.length; i++) {
        if (this.userStateId == this.compStateId) {
          var igstObj: any = new Object();
          var flag = 0;
          if (this.overheadPendingList != "") {
            for (var j = 0; j < this.overheadPendingList.length; j++) {
              if (this.overheadPendingList[j].taxRate == (this.pendingAddData[i].TaxPercentage / 2)) {
                // this.overheadList[j].taxRate = list[i].TaxPercentage;
                this.overheadPendingList[j].amount = this.overheadPendingList[j].amount + this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity;
                this.igstAmount = (this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity) * ((this.pendingAddData[i].TaxPercentage / 2) / 100);
                this.overheadPendingList[j].overheadAmount = parseFloat(this.overheadPendingList[j].overheadAmount) + parseFloat(this.igstAmount);
                console.log("item found");
                flag = 1;
              }
            }
            if (flag == 0) {
              console.log("add a new item");
              igstObj.taxRate = this.pendingAddData[i].TaxPercentage / 2;
              igstObj.amount = this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity;
              igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity) * ((this.pendingAddData[i].TaxPercentage / 2) / 100), '1.2-2'));
              this.overheadPendingList.push(igstObj);
            }
          } else {
            console.log("List is empty");
            igstObj.taxRate = this.pendingAddData[i].TaxPercentage / 2;
            igstObj.amount = this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity;
            igstObj.overheadAmount = parseFloat(this.decimalPipe.transform((this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity) * ((this.pendingAddData[i].TaxPercentage / 2) / 100), '1.2-2'));
            this.overheadPendingList.push(igstObj);
          }
          this.sgstVisible = true;
        } else {
          var igstObj: any = new Object();
          var flag = 0;
          if (this.overheadPendingList != "") {
            for (var j = 0; j < this.overheadPendingList.length; j++) {
              if (this.overheadPendingList[j].taxRate == this.pendingAddData[i].TaxPercentage) {
                // this.overheadList[j].taxRate = list[i].TaxPercentage;
                this.overheadPendingList[j].amount = this.overheadPendingList[j].amount + this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity;
                this.igstAmount = (this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity) * (this.pendingAddData[i].TaxPercentage / 100);
                this.overheadPendingList[j].overheadAmount = parseFloat(this.overheadPendingList[j].overheadAmount) + parseFloat(this.igstAmount);
                flag = 1;
              }
            }
            if (flag == 0) {
              igstObj.taxRate = this.pendingAddData[i].TaxPercentage;
              igstObj.amount = this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity;
              igstObj.overheadAmount = this.decimalPipe.transform((this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity) * (this.pendingAddData[i].TaxPercentage / 100), '1.2-2');
              this.overheadPendingList.push(igstObj);
            }
          } else {
            igstObj.taxRate = this.pendingAddData[i].TaxPercentage;
            console.log("tax percent = " + this.pendingAddData[i].TaxPercentage);
            igstObj.amount = this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity;
            igstObj.overheadAmount = this.decimalPipe.transform((this.pendingAddData[i].ItemPackagingList[0].SaleRate * this.pendingAddData[i].ItemPackagingList[0].Quantity) * (this.pendingAddData[i].TaxPercentage / 100), '1.2-2');
            this.overheadPendingList.push(igstObj);
          }
          this.igstVisible = true;
        }
      }
    }
    console.log("overhead list = " + JSON.stringify(this.overheadPendingList));
    this.totalPayableAmount = this.totalAmount;
    if (this.userStateId == this.compStateId) {
      for (var i = 0; i < this.overheadPendingList.length; i++) {
        this.amount = this.overheadPendingList[i].overheadAmount * 2;
        this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.amount);
      }
    } else {
      console.log("overhead list = " + JSON.stringify(this.overheadPendingList));
      this.totalPayableAmount = this.totalAmount;
      for (var i = 0; i < this.overheadPendingList.length; i++) {
        this.totalPayableAmount = parseFloat(this.totalPayableAmount) + parseFloat(this.overheadPendingList[i].overheadAmount);
      }
    }
    console.log("payable amount = " + this.totalPayableAmount);
  }

  deletePendingItem(selectedItem) {
    console.log(' deletePendingItem(selectedItem) ');

    this.storage.get('pendingData').then(list => {
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
              this.totalAmount = this.totalAmount - selectedItem.ItemPackagingList[0].SaleRate;
              if (this.itemCount == 0) {
                this.cancelOrder();
                this.totalAmount = 0;
              }
            }
          }
        }
      } else {
        list = [];
      }
      console.log('list: ' + JSON.stringify(list));
      this.storage.set('pendingData', list);
      this.events.publish('pendingData', list);
      this.isEnabled = true;
      if (this.isGSTApplicableExternally == true) {
        this.calculateOverheadAmount();
      }

      this.calculateDeliveryCharge();
      this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
      this.chckForFreeDelivery();
    });
  }

  deleteItem(selectedItem)
  {
    console.log('deleteItem(selectedItem): ');

    if (this.pageNAme == "viewOrder") {
      this.storage.get('orderViewData').then(list => {
        var itemFound = false;
        if (list != null) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].ItemId == selectedItem.ItemId) {
              itemFound = true;

              const index: number = list.indexOf(i);
              if (index !== 0) {
                list.splice(i, 1);
                this.itemCount--;
                this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].SaleRate * selectedItem.ItemPackagingList[0].Quantity);
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
        this.storage.set('orderViewData', list);
        this.events.publish('orderViewData', list);
        if (this.isGSTApplicableExternally == true) {
          this.calculateOverheadAmount();
        }
        this.calculateDeliveryCharge();
        this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        this.calculateRoundOff();

        this.chckForFreeDelivery();
      });
    } else {
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
                this.totalAmount = this.totalAmount - (selectedItem.ItemPackagingList[0].SaleRate * selectedItem.ItemPackagingList[0].Quantity);
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

        console.log('Mohit Jain Item Count :' +JSON.stringify(this.itemCount));

        this.storage.set('totalProductAmount', this.totalAmount);
        this.events.publish('totalAmount', this.totalAmount);
        if (this.isGSTApplicableExternally == true) {
          this.calculateOverheadAmount();
        }

        console.log("selected address = " + this.selectAddress);
        this.isEnabledCr = true;

        this.calculateDeliveryCharge();

        this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
        this.calculateRoundOff();

        this.chckForFreeDelivery();
      });
    }

  }

  async placeOrder() {
    this.storage.get('userInfo').then((isLoginResult) => {
      if (isLoginResult != null) {
        this.userInfo = isLoginResult;
        console.log("userInfo------RS" + JSON.stringify(this.userInfo));
        this.userProvider.getRefreshCustomerRegistrationData(this.userInfo).then(res => {
          this.RefreshCustomerRegistrationData = res;
          console.log("RefreshCustomerRegistrationData List----RS---- " + JSON.stringify(this.RefreshCustomerRegistrationData));
          this.status = this.RefreshCustomerRegistrationData.Status;
          if (this.status == 1) {
            this.logout();
            this.presentToast('User is not Active.');
          } else {

            console.log("selected address (place oredr) = " + this.selectAddress);
            var flag = 0;
            console.log("--------place order click add data------" + JSON.stringify(this.addData));


            for (var i = 0; i < this.addData.length; i++) {
              console.log("----list quant------" + this.addData[i].ItemPackagingList[0].Quantity);
              if (this.addData[i].ItemPackagingList[0].Quantity == 0 || this.addData[i].ItemPackagingList[0].Quantity == null) {
                this.presentToast('Item quantity cannot be null or 0');
                flag = 1;
              }
            }
            if (flag == 0) {
              console.log("flag = " + flag);
              if (typeof this.selectAddress == "undefined") {
                this.presentToast("Please choose delivery Address");
              } else {
                console.log("-----RS-----  = " + this.selectAddress);
                this.storage.set('totalPayableAmountmsg', this.totalPayableAmount);

                if (this.selectAddress == "Pick from store") {
                  const loading = /*await*/ this.loadingCtrl.create({
                    message: 'Please wait...'
                  });


                  this.navCtrl.navigateForward(['/payment-method', {
                    "payableAmount": this.totalPayableAmount,
                    "orderSuggestion": this.orderSuggestion,
                    "deliveryChargesAmount": this.deliveryCharge,
                    "orderAmount": this.totalAmount,
                    "overheadAmount": this.overheadAmount,
                    page: "itemList"
                  }]);


                } else if (this.selectAddress == "Select Address") {
                  /*await*/ this.navCtrl.navigateForward(['/delivery-address', {
                    "payableAmount": this.totalPayableAmount,
                    "orderSuggestion": this.orderSuggestion,
                    "deliveryChargesAmount": this.deliveryCharge,
                    "orderAmount": this.totalAmount,
                    "overheadAmount": this.overheadAmount,
                    page: "itemList"
                  }]);

                }
              }

            }



          }
        });
      }
    });




  }

  logout() {
    this.utilityProvider.CrCn = null;
    this.utilityProvider.CompId = null;
    this.storage.set('CrCn',this.utilityProvider.CrCn);
    this.storage.set('CompId',this.utilityProvider.CompId);
    this.navCtrl.navigateRoot(['/login-with-option']);
  }

  async presentUpdateOrderConfirm() {
    if (this.isEnabled == false) {
      console.log("update order Disable");
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Self Pick Order',
        message: 'Are you sure you want to pick this order from Store?',
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
              if (this.pageNAme == 'pendingOrder') {
                this.updateOrder();
              } else {
                this.placeOrder();
              }

            }
          }
        ]
      });
      await alert.present();
    }
  }

  async presentPlaceOrderConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Self Pick Order',
      message: 'Are you sure you want to pick this order from Store?',
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
            if (this.pageNAme == 'pendingOrder') {
              this.updateOrder();
            } else {
              this.placeOrder();
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertForUpdate() {
    const alert = await this.alertCtrl.create({
      header: "Credit Limit Exceeding!",
      message: "This order is exceeding your Credit Limit. Please contact the company for acceptance of the order.",
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

  async presentAlertForItem() {
    const alert = await this.alertCtrl.create({
      header: "Item Limit Exceeded!!",
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

  updateQuantity(quant, index, data) {
    if (quant == null || quant <= 0) {
      this.isEnabled = false;
      this.isQuantityUpdate = false;
      this.presentRemoveUpdateConfirm(data);
    } else {
      if (this.pageNAme == "pendingOrder") {
        console.log("-----quantity----" + quant);
        this.storage.get('pendingData').then(list => {
          for (var i = 0; i < list.length; i++) {
            if (data.ItemId == list[i].ItemId) {
              if (quant != null && list[i].ItemPackagingList[0].Quantity != quant && quant > 0) {
                console.log("----selected item quantity------" + list[i].ItemPackagingList[0].Quantity);
                this.saveItem(quant, data);
              }
            }
          }
        });
      } else {
        if (this.pageNAme == 'viewOrder') {
          console.log("-----quantity----" + quant);
          this.storage.get('orderViewData').then(list => {
            for (var i = 0; i < list.length; i++) {
              if (data.ItemId == list[i].ItemId) {
                if (quant != null && list[i].ItemPackagingList[0].Quantity != quant && quant > 0) {
                  console.log("----selected item quantity------" + list[i].ItemPackagingList[0].Quantity);
                  this.saveItem(quant, data);
                }
              }
            }
          });
        } else {
          console.log("-----quantity----" + quant);
          this.storage.get('addData').then(list => {
            for (var i = 0; i < list.length; i++) {
              if (data.ItemId == list[i].ItemId) {
                if (quant != null && list[i].ItemPackagingList[0].Quantity != quant && quant > 0) {
                  console.log("----selected item quantity------" + list[i].ItemPackagingList[0].Quantity);
                  this.saveItem(quant, data);
                }
              }
            }
          });
        }

      }
    }


  }

  async updateOrder() {
    if (this.isEnabled == false) {
      console.log("update order Disable");
    } else {
      if (this.selectAddress == "Pick from store") {
        const loading = await this.loadingCtrl.create({
          message: 'Please wait...'
        });
        await loading.present();
        this.orderProvider.SetUpdateOrder(this.selectedOrder, 2, this.totalAmount, this.overheadAmount,
            this.totalPayableAmount, this.shippingAddressDetail, this.allData.AcntId, this.orderSuggestion).then((data) => {
          console.log("------" + data);
          this.toastReturn = data;
          console.log(data);
          this.orderNo = this.toastReturn.OrderNo;
          this.orderDate = this.toastReturn.OrderDate;
          console.log("-----order no-----" + this.orderNo + "-----order date-----" + this.orderDate);
          if (this.toastReturn.ReturnMessage == 'Successfully Updated.' || this.toastReturn.ReturnCode == 0) {
            // this.presentToast(this.toastReturn.ReturnMessage);
            let list = [];
            this.storage.set('addData', list);
            this.storage.set('itemnCount', 0);
            this.storage.set('totalProductAmount', 0);
            this.storage.set('totalAmount', 0);
            this.events.publish('totalAmount', 0);
            this.events.publish('ItemLength', 0);
            this.navCtrl.navigateRoot(['/order-successfull', {
              "orderNo": this.orderNo,
              "orderDate": this.orderDate,
              page: 'pendingOrder'
            }]);
          }
          loading.dismiss();
        });

      } else {
        this.navCtrl.navigateForward(['/delivery-address', {
          payableAmount: this.totalPayableAmount, orderAmount: this.totalAmount, overheadAmount: this.overheadAmount,
          searchOrderDetail: this.selectedOrder, page: "pendingOrder"
        }]);
      }
    }

  }

  async cancelOrder() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.orderProvider.SetPlaceOrder(this.selectedOrder.ID, this.allData.UserId, this.allData.AcntId,
        this.pendingAddData, this.allData, this.selectedOrder.ShippingAddress,
        this.selectedOrder.OrderAmt, this.deliveryCharge, this.selectedOrder.NetAmount,
        this.selectedOrder.OverheadAmt, 3, "",this.ourPaymentID,this.paymentID,this.paymentStatus,this.paymentMode).then((data) => {
      console.log("-----------RS----------" + data);
      this.toastReturn = data;
      console.log(data);
      if (this.toastReturn.ReturnMessage == "Successfully Canceled." || this.toastReturn.ReturnCode == 0) {

        if (this.userType == 5) {
          this.navCtrl.navigateRoot(['/home']);
        } else {
          this.navCtrl.navigateRoot(['/admin-dashboard']);
        }
      }
      loading.dismiss();
    });
  }

  async presentRemoveUpdateConfirm(data) {
    if (this.pendingAddData.length > 1 || this.addData.length >= 1) {
      const alert = await this.alertCtrl.create({
        header: 'Remove Item',
        message: 'Do you want to Remove this item?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Disagree');
              data.ItemPackagingList[0].Quantity = 1;
              this.saveItem(1, data);

            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Agree');
              if (this.pageNAme == "pendingOrder") {
                this.deletePendingItem(data);
              } else {
                this.deleteItem(data);
              }

            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Cancel Order',
        message: 'Do you want to Cancel this order?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log(' Disagree');
              data.ItemPackagingList[0].Quantity = 1;
              this.saveItem(1, data);

            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Agree');
              this.cancelOrder();

            }
          }
        ]
      });
      await alert.present();
    }
  }

  async presentRemoveItem(data) {
    const alert = await this.alertCtrl.create({
      header: 'Remove Item',
      message: 'Do you want to Remove this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Disagree');

          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree');
            this.deleteItem(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });


    await toast.present();
  }

  async presentToastCr(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'top'
    });

    await toast.present();
  }

  saveItem(value, data) {
    var quantityModified;
    console.log("item value = " + value);
    console.log("index = " + data.ItemId);

    if (this.pageNAme == "pendingOrder") {
      this.storage.get('pendingData').then(list => {
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
              this.storage.set('pendingData', list);
              console.log("list data = " + JSON.stringify(list));
              this.totalAmount = this.totalAmount + (quantityModified * list[i].ItemPackagingList[0].SaleRate);
              this.isEnabled = true;
              //         this.events.publish('addData',list);
              this.calculateDeliveryCharge();
            } else {
              quantityModified = list[i].ItemPackagingList[0].Quantity - value;
              console.log('quantity modified = ' + quantityModified);
              list[i].ItemPackagingList[0].Quantity = value;
              this.storage.set('pendingData', list);
              console.log("list data = " + JSON.stringify(list));
              this.totalAmount = this.totalAmount - (quantityModified * list[i].ItemPackagingList[0].SaleRate);
              this.isEnabled = true;
              this.calculateDeliveryCharge();
            }

            if (this.isGSTApplicableExternally == true) {
              this.calculateOverheadPendingUpdatedAmount();
            } else {
              this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
            }
            if (this.userType == 5) {
              this.chckForFreeDelivery();
            }
            this.calculateRoundOff();

          }
        }
      });

    } else {
      if (this.pageNAme == "viewOrder") {
        this.storage.get('orderViewData').then(list => {
          for (var i = 0; i < list.length; i++) {
            if (list[i].ItemId == data.ItemId) {
              console.log("quantity = " + list[i].ItemId);
              if (value > list[i].ItemPackagingList[0].Quantity) {
                quantityModified = value - list[i].ItemPackagingList[0].Quantity;
                console.log('quantity modified = ' + quantityModified);
                list[i].ItemPackagingList[0].Quantity = value;
                this.storage.set('orderViewData', list);
                this.events.publish('orderViewData', list);
                console.log("list data = " + JSON.stringify(list));
                if (this.isGSTApplicableExternally == true) {
                  this.calculateOverheadAmount();
                }

              } else {
                quantityModified = list[i].ItemPackagingList[0].Quantity - value;
                console.log('quantity modified = ' + quantityModified);
                list[i].ItemPackagingList[0].Quantity = value;
                this.storage.set('addData', list);
                console.log("list data = " + JSON.stringify(list));
                this.totalAmount = this.totalAmount - (quantityModified * list[i].ItemPackagingList[0].SaleRate);
                this.storage.set('totalProductAmount', this.totalAmount);
                this.events.publish('totalAmount', this.totalAmount);
                //         this.events.publish('addData',list);
                if (this.isGSTApplicableExternally == true) {
                  this.calculateOverheadAmount();
                }

              }

              this.calculateRoundOffDc(this.deliveryCharge);

              for (var i = 0; i < this.deliveryChargeList.length; i++) {
                console.log("-----BillAmountFrom----- " + this.deliveryChargeList[i].BillAmountFrom);
                console.log("-----BillAmountUpto----- " + this.deliveryChargeList[i].BillAmountUpto);

                if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
                  if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
                    console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
                    this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
                    this.calculateRoundOffDc(this.deliveryCharge);
                    console.log("---after--Percent----- " + this.deliveryCharge);
                  } else {
                    console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
                    this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
                    this.calculateRoundOffDc(this.deliveryCharge);
                    console.log("---after--Fixed----- " + this.deliveryCharge)

                  }

                  console.log("-----total amount----- " + this.totalAmount);
                  console.log("-----delivery charge value-----" + this.deliveryCharge);
                }
              }

              this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
              this.chckForFreeDelivery();

            }
          }
        });
      } else {
        this.storage.get('addData').then(list => {
          for (var i = 0; i < list.length; i++) {
            if (list[i].ItemId == data.ItemId) {
              console.log("quantity = " + list[i].ItemId);

              if (value > list[i].ItemPackagingList[0].Quantity) {
                quantityModified = value - list[i].ItemPackagingList[0].Quantity;
                console.log('quantity modified = ' + quantityModified);
                list[i].ItemPackagingList[0].Quantity = value;
                this.storage.set('addData', list);
                console.log("list data = " + JSON.stringify(list));
                this.totalAmount = this.totalAmount + (quantityModified * list[i].ItemPackagingList[0].SaleRate);
                this.storage.set('totalProductAmount', this.totalAmount);
                this.events.publish('totalAmount', this.totalAmount);
                //         this.events.publish('addData',list);
                if (this.isGSTApplicableExternally == true) {
                  this.calculateOverheadAmount();
                }

              } else {
                quantityModified = list[i].ItemPackagingList[0].Quantity - value;
                console.log('quantity modified = ' + quantityModified);
                list[i].ItemPackagingList[0].Quantity = value;
                this.storage.set('addData', list);
                console.log("list data = " + JSON.stringify(list));
                this.totalAmount = this.totalAmount - (quantityModified * list[i].ItemPackagingList[0].SaleRate);
                this.storage.set('totalProductAmount', this.totalAmount);
                this.events.publish('totalAmount', this.totalAmount);
                if (this.isGSTApplicableExternally == true) {
                  this.calculateOverheadAmount();
                }
              }

              this.calculateDeliveryCharge();
              this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
              this.chckForFreeDelivery();

            }
          }
        });
      }
    }
  }

  chckForFreeDelivery() {
    for (var i = 0; i < this.deliveryChargeList.length; i++) {
      if (this.deliveryChargeList[i].DeliveryAmount == 0) {
        if (this.totalAmount < this.deliveryChargeList[i + 1].BillAmountUpto) {
          console.log("end purchase amount = " + this.deliveryChargeList[i + 1].BillAmountUpto);
          console.log("total amount = " + this.totalAmount);
          console.log("Round off = " + Math.round(8.89));
          this.morefreeDeliveryAmount = (this.deliveryChargeList[i + 1].BillAmountUpto - this.totalAmount) + 1;
          console.log(" free delivery amount to be added = " + this.morefreeDeliveryAmount);
          this.visible = true;
        } else {
          this.visible = false;
        }
      }
    }
  }

  addMoreItem() {
    this.navCtrl.navigateForward(['/home']);

  }

  createBill() {
    this.pageNAme = "viewBill";
  }

  addNewItem() {
    this.navCtrl.navigateForward(['/search-item', {pageName: 'AdminOrderView'}]);
  }


  calculateDeliveryCharge() {
    console.log("TotalPayable amount" + this.totalPayableAmount);
    if (this.selectAddress == "Pick from store") {
      this.deliveryCharge = 0;
    } else {

      console.log("TotalPayable amount"+this.totalPayableAmount);
      for (var i = 0; i < this.deliveryChargeList.length; i++) {
        console.log("-----first RS----- " + this.deliveryChargeList[i].FixedOrPerc);

        if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
          if (this.deliveryChargeList[i].FixedOrPerc == (('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()).toLowerCase()) {
            console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
            this.deliveryCharge = Math.round(this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;

            console.log("for delivery charge" + this.deliveryCharge);
            console.log(this.deliveryCharge);
            this.calculateRoundOffDc(this.deliveryCharge);
            console.log("  " + this.deliveryCharge);
          } else {
            console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
            this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
            this.calculateRoundOffDc(this.deliveryCharge);
            console.log("---after--Fixed----- " + this.deliveryCharge)
          }

          console.log("-----total amount----- " + this.totalAmount);
          console.log("-----delivery charge value-----" + this.deliveryCharge);
        }
      }
    }
  }

  calculateRoundOffDc(deliveryCharge) {
    var roundedValue1=0;
    roundedValue1 = Math.round(deliveryCharge);
    if (roundedValue1 >= deliveryCharge) {
      this.roundofValue1 = roundedValue1 - deliveryCharge;
      this.deliveryCharge = deliveryCharge+this.roundofValue1;

      this.roundOffValueEnable = false;
    } else {
      this.roundofValue1 = deliveryCharge - roundedValue1;
      this.deliveryCharge = deliveryCharge-this.roundofValue1;
      this.roundOffValueEnable = true;
    }
  }

  calculateRoundOff() {
    this.roundOffValueEnable = true;
    var roundedValue=0;
    roundedValue = Math.round(this.totalPayableAmount);
    if (roundedValue >= this.totalPayableAmount) {
      this.roundofValue = roundedValue - this.totalPayableAmount;
      this.totalPayableAmount = this.totalPayableAmount + this.roundofValue;
      this.roundOffValueEnable = false;
    } else {
      this.roundofValue = this.totalPayableAmount - roundedValue;
      this.totalPayableAmount = this.totalPayableAmount - this.roundofValue;
      this.roundOffValueEnable = true;
    }
  }


  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Cancel Order',
      message: 'Do you want to Cancel this order?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Disagree');

          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree');
            this.cancelOrder();

            this.orderNoForMsg = this.selectedOrder.OrderNo;
            this.netAmountForMsg = this.selectedOrder.NetAmount;
            this.orderDateForMsg = this.selectedOrder.OrderDate;


            this.smsCancel = "Order Cancelled!!   Order No. " + this.orderNoForMsg + " Amount: Rs." + this.netAmountForMsg + " Date " + this.orderDateForMsg.toString().replace('T', ' ') + " for details please check Mobile App.";
            console.log(this.orderNoForMsg);
            console.log(this.smsCancel);
            console.log(this.netAmountForMsg);


            this.storage.get('userInfo').then((value) => {
              this.compData = value;

              this.cPhone1 = value.CompanyPhone1;
              console.log("cPhone1  = " + this.cPhone1);

              this.userPhone = value.UserId;
              console.log("UserId  = " + this.userPhone);

              this.storage.get("mobOrEmailTabsy").then(res => {
                this.mobOrEmailTabsy = res;
                console.log("mobOrEmailTabsy---- " + this.mobOrEmailTabsy);

                if (this.mobOrEmailTabsy == "EMAIL") {
                  this.userProvider.CustomerRequest_SendEmailForCode(this.groupKeyTabsy, this.userPhone, this.smsCancel).then(res => {
                    this.smsData = res;
                    console.log('Msg Sent Sussessfully -cst--Email----1' + JSON.stringify(res));

                  });

                } else {

                  this.userProvider.apiSendSmS(this.groupKeyTabsy, this.userPhone, this.smsCancel).then(res => {
                    this.smsData = res;
                    console.log('Msg Sent Sussessfully -cst--Mobile --1' + JSON.stringify(res));

                  });
                }
              });
            });

            this.storage.get('selectedOrderData').then(res => {
              this.selectedOrderData = res;
              this.orderNoForMsg = this.selectedOrderData.OrderNo;
              this.netAmountForMsg = this.selectedOrderData.NetAmount;
              this.orderDateForMsg = this.selectedOrderData.OrderDate;

              console.log('Disagree -ad-RS--' + this.orderDateForMsg);
              console.log('Disagree -ad-RS--' + this.orderNoForMsg);
              console.log('Disagree -ad-RS--' + this.netAmountForMsg);
              console.log('Disagree ad--RS--' + JSON.stringify(this.selectedOrderData));


              this.smsCancel = "Order Cancelled!!   Order No. " + this.orderNoForMsg + " Amount: Rs." + this.netAmountForMsg + " Date " + this.orderDateForMsg.toString().replace('T', ' ') + " for details please check Mobile App.";
              console.log(this.orderNoForMsg);
              console.log(this.smsCancel);
              console.log(this.netAmountForMsg);

              this.storage.get('userInfo').then((value) => {
                this.compData = value;

                this.cPhone1 = value.CompanyPhone1;
                console.log("cPhone1  = " + this.cPhone1);

                this.userPhone = value.UserId;
                console.log("UserId  = " + this.userPhone);
                this.userPhoneForMag = this.userPhone;


                this.userProvider.apiSendSmS(this.groupKeyTabsy, this.cPhone1, this.smsCancel).then(res1 => {
                  this.smsData2 = res1;
                  console.log('Msg Sent Sussessfully --ad---2' + JSON.stringify(res1));

                });
              });
            });

          }
        }
      ]
    });
    await alert.present();
  }

  async cDetailspage() {

    if (this.rememberFlag == 0) {
      console.log("Clicked");
      console.log('-CDetails--RS-' + this.cID);
      console.log('-CDetails--RS-' + this.editData.cContactPersonName);
      console.log('-CDetails--RS-' + this.editData.cContactPersonMobileNo);
      console.log('-CDetails--RS-' + this.editData.cContactPersonEMailID);
      console.log('-CDetails--RS-' + this.editData.cGSTNO);
      console.log('-CDetails--RS-' + this.editData.cPAN);
      console.log('-CDetails--RS-' + this.editData.cFoodLicNo);
      const popover = await this.popoverController.create({
        component : PartialUpdatePage,
        event:this.ev,
        cssClass: 'edit-opty-popover2',
      });
      await popover.present();



      this.rememberFlag = 1;
    } else {
      console.log("UnClicked");

      this.rememberFlag = 0;

    }
  }

  incrementFlag() {

    if (this.rememberFlagIncrement == 0) {
      console.log("Clicked");

      this.visibleTen = false;
      this.visibleHun = false;
      this.visibleFiv = false;
      this.visibleTho = false;
      this.visibleImg = false;

      this.rememberFlagIncrement = 1;
    } else {
      console.log("UnClicked");
      this.visibleTen = true;
      this.visibleHun = true;
      this.visibleFiv = true;
      this.visibleTho = true;
      this.visibleImg = true;

      this.rememberFlagIncrement = 0;

    }
  }

  async increment(index: number, OurRate, selectedItem, step) {

    this.storage.get('userInfo').then((isLoginResult) => {
      if (isLoginResult != null) {
        this.userInfo = isLoginResult;
        console.log("userInfo------RS" + JSON.stringify(this.userInfo));
        this.userProvider.getRefreshCustomerRegistrationData(this.userInfo).then(res => {
          this.RefreshCustomerRegistrationData = res;
          console.log("RefreshCustomerRegistrationData List----RS---- " + JSON.stringify(this.RefreshCustomerRegistrationData));
          this.status = this.RefreshCustomerRegistrationData.Status;
          if (this.status == 1) {
            this.logout();
            this.presentToast('User is not Active.');
          }
          else
          {
            console.log('--OurRate--' + OurRate);

            if (step == 0) {
              console.log('--OurRate- 2-' + step);
              step = (selectedItem.ItemPackagingList[0].Quantity * -1) + 1;
            }

            if (step == -1 && selectedItem.ItemPackagingList[0].Quantity == 1) {
              if (this.pageNAme == "pendingOrder") {
                this.presentRemoveUpdateConfirm(selectedItem);
              } else {
                this.presentRemoveItem(selectedItem);
              }
            } else {

              console.log('ITem Quantity: ' + selectedItem.ItemPackagingList[0].Quantity);
              if (this.pageNAme == "pendingOrder") {
                this.storage.get('pendingData').then(async list => {
                  var itemFound = false;
                  console.log('list  pendingOrder: ' + list);
                  if (list != null) {
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].ItemId == selectedItem.ItemId) {
                        itemFound = true;
                        console.log('---amount--' + this.totalAmount + '---multiple---' + selectedItem.ItemPackagingList[0].SaleRate * step);
                        const loading = await this.loadingCtrl.create({
                          message: 'Please wait...'
                        });
                        // await loading.present();
                        console.log('loading 1 this.pageNAme == "pendingOrder" ');

                        this.totalAmount = this.totalAmount + (selectedItem.ItemPackagingList[0].SaleRate * step);
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
                  this.storage.set('pendingData', list);

                  this.isEnabled = true;
                  this.isQuantityUpdate = false;
                  if (this.selectAddress == "Pick from store") {
                    this.deliveryCharge = 0;
                  } else {

                    for (var i = 0; i < this.deliveryChargeList.length; i++) {
                      if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
                        if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
                          console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
                          this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
                          this.calculateRoundOffDc(this.deliveryCharge);
                          console.log("---after--Percent----- " + this.deliveryCharge);
                        } else {
                          console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
                          this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
                          this.calculateRoundOffDc(this.deliveryCharge);
                          console.log("---after--Fixed----- " + this.deliveryCharge)

                        }

                        console.log("-----total amount----- " + this.totalAmount);
                        console.log("-----delivery charge value-----" + this.deliveryCharge);
                      }
                    }
                  }
                  if (this.isGSTApplicableExternally == true) {
                    this.calculateOverheadPendingUpdatedAmount();
                  } else {

                    this.totalCrCheck();
                    this.ngtiveCheck()

                  }
                  if (this.userType == 5) {
                    this.chckForFreeDelivery();
                  }
                  this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
                  this.calculateRoundOff();
                  this.totalCrCheck();
                  this.ngtiveCheck()
                });

              } else {
                if (this.pageNAme == "viewOrder") {
                  this.storage.get('orderViewData').then(async (list) => {
                    var itemFound = false;
                    console.log('list viewOrder: ' + list);
                    if (list != null) {
                      for (var i = 0; i < list.length; i++) {
                        if (list[i].ItemId == selectedItem.ItemId) {
                          itemFound = true;
                          list[i].ItemPackagingList[0].Quantity = parseInt(list[i].ItemPackagingList[0].Quantity) + parseInt(step);
                          console.log('---amount--' + this.totalAmount + '---multiple---' + selectedItem.ItemPackagingList[0].SaleRate * step);
                          const loading = await this.loadingCtrl.create({
                            message: 'Please wait...'
                          });
                          await loading.present();
                          console.log('loading 2 this.pageNAme == "viewOrder" ');

                          this.totalAmount = this.totalAmount + (selectedItem.ItemPackagingList[0].SaleRate * step);
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
                    this.storage.set('orderViewData', list);
                    this.events.publish('orderViewData', list);

                    if (this.selectAddress == "Pick from store") {
                      this.deliveryCharge = 0;
                    } else {

                      for (var i = 0; i < this.deliveryChargeList.length; i++) {
                        if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
                          if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
                            console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
                            this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
                            this.calculateRoundOffDc(this.deliveryCharge);
                            console.log("---after--Percent----- " + this.deliveryCharge);
                            if (this.userType == 5) {
                              this.chckForFreeDelivery();
                            }
                          } else {
                            console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
                            this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
                            this.calculateRoundOffDc(this.deliveryCharge);
                            console.log("---after--Fixed----- " + this.deliveryCharge)
                            if (this.userType == 5) {
                              this.chckForFreeDelivery();
                            }

                          }

                          console.log("-----total amount----- " + this.totalAmount);
                          console.log("-----delivery charge value-----" + this.deliveryCharge);
                        }
                      }

                    }

                    if (this.isGSTApplicableExternally == true) {
                      this.calculateOverheadAmount();
                    } else {
                      this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
                      this.calculateRoundOff();
                      this.totalCrCheck();
                      this.ngtiveCheck()

                    }
                  });
                } else {
                  this.storage.get('addData').then(async list => {
                    var itemFound = false;
                    console.log('list get addData: ' + list);
                    if (list != null) {
                      for (var i = 0; i < list.length; i++) {
                        if (list[i].ItemId == selectedItem.ItemId) {
                          itemFound = true;
                          this.ngtiveCheck();
                          list[i].ItemPackagingList[0].Quantity = parseInt(list[i].ItemPackagingList[0].Quantity) + parseInt(step);
                          console.log('---amount--' + this.totalAmount + '---multiple---' + selectedItem.ItemPackagingList[0].SaleRate * step);
                          const loading = await this.loadingCtrl.create({
                            message: 'Please wait...'
                          });
                          await loading.present();
                          console.log('loading 3  "addData" ');
                          this.totalAmount = this.totalAmount + (selectedItem.ItemPackagingList[0].SaleRate * step);
                          await loading.dismiss();
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
                    console.log('list set addData: ' + list);

                    this.events.publish('ItemLength', this.itemCount);
                    this.storage.set('itemnCount', this.itemCount);
                    this.storage.set('totalProductAmount', this.totalAmount);
                    this.events.publish('totalAmount', this.totalAmount);
                    if (this.selectAddress == "Pick from store") {
                      this.deliveryCharge = 0;
                    } else {



                      for (var i = 0; i < this.deliveryChargeList.length; i++) {
                        if (this.totalAmount >= this.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.deliveryChargeList[i].BillAmountUpto) {
                          if (this.deliveryChargeList[i].FixedOrPerc == ('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()) {
                            console.log("-----Percent----- " + this.deliveryChargeList[i].FixedOrPerc);
                            this.deliveryCharge = (this.totalAmount * this.deliveryChargeList[i].DeliveryAmount) / 100;
                            this.calculateRoundOffDc(this.deliveryCharge);
                            console.log("---after--Percent----- " + this.deliveryCharge);
                            if (this.userType == 5) {
                              this.chckForFreeDelivery();
                            }
                          } else {
                            console.log("-----Fixed----- " + this.deliveryChargeList[i].FixedOrPerc);
                            this.deliveryCharge = this.deliveryChargeList[i].DeliveryAmount;
                            this.calculateRoundOffDc(this.deliveryCharge);
                            console.log("---after--Fixed----- " + this.deliveryCharge);
                            if (this.userType == 5) {
                              this.chckForFreeDelivery();
                            }

                          }

                          console.log("-----total amount----- " + this.totalAmount);
                          console.log("-----delivery charge value-----" + this.deliveryCharge);
                        }
                      }

                    }

                    if (this.isGSTApplicableExternally == true) {
                      this.calculateOverheadAmount();
                    } else {
                      this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
                      this.calculateRoundOff();
                      this.totalCrCheck();
                      this.ngtiveCheck()

                    }
                  });
                }
              }
              this.calculateRoundOff(); // nitin
              this.calculateDeliveryCharge(); // nitin
            }

          }
        });
      }
    });
  }


  printOrder() {

  }

  saveBill() {

  }

  PrintBill() {

  }

  showPrompt() {

  }

}