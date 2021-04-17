import { Component } from '@angular/core';

import {AlertController, Events, MenuController, ModalController, NavController, Platform, ToastController} from '@ionic/angular';
import {SplashPage} from './splash/splash.page';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {UserService} from './Providers/user/user.service';
import {UtilityService} from './Providers/utility/utility.service';
/* import {App} from 'ionic-angular'; */
import {AppVersion} from '@ionic-native/app-version/ngx';
import {HomePage} from './home/home.page';
import {ListPage} from './list/list.page';
import {EditProfilePage} from './edit-profile/edit-profile.page';
import {Storage} from '@ionic/storage';
import {CartPage} from './cart/cart.page';
  import {timer} from 'rxjs';
  import {SplashScreen} from '@ionic-native/splash-screen/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',

})
export class AppComponent {
  
  pages: Array<{ title: string, component: any }>;
  public base64Image: string;
  public userName: any;
  public userEmail: any;
  public userMobile: any;
  public addDataList: any;
  public itemCount: any;
  public totalAmount: any;
  public userInfo: any;
  public userType:any;
  public appVersionNumber: any;
  public themecolor: any = "yellow";
  public st_Flag: any = false;
  showSplash = true;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'list'
    },
    {
      title: 'SignIN',
      url: '/sign-in',
      icon: 'list'
    },
    {
      title: 'LogIn With Option',
      url: '/login-with-option',
      icon: 'list'
    },
    {
      title: 'Splash',
      url: '/splash',
      icon: 'list'
    },

  ];
    rootPage: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private splashPage:SplashPage,
    private statusBar: StatusBar,
    public router: Router,
    public navCtrl: NavController,
    public viewController: ModalController,
    public storage: Storage,
    public alertCtrl:AlertController,
    public menuCtrl: MenuController,
    public events: Events,
    private toastCtrl: ToastController,
    public userProvider: UserService,
    public utilityProvider: UtilityService,
    public cartpage : CartPage,
/*
    public  app: App,
*/
    public appVersion: AppVersion


  ) {


    this.storage.set('st_Flag',this.st_Flag);

    // private appUpdate: AppUpdate) {
    this.appVersion.getAppName();
    this.appVersion.getPackageName();
    this.appVersion.getVersionCode();
    this.appVersion.getVersionNumber();

    // const updateUrl = 'https://api.tabserp.com/VersionInfo/update.xml';
    // this.appUpdate.checkAppUpdate(updateUrl).then((res) =>
    // {
    //   console.log('Update available'+res);
    //   this.presentAlertForUpdate('Update Available','Update Available');
    // });


    // platform.ready().then(() => {
    //   splashScreen.hide();
    // }); nitin

    //this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'List', component: ListPage},
      {title: 'Profile', component: EditProfilePage},
    ];

    this.storage.get('UserType').then(res=>{
      this.userType = res;
      console.log("----user type----- "+this.userType);
    });

    this.events.subscribe('UserType',res=>{
      this.userType = res;
      console.log("----event user type ----- "+this.userType);
    });

    storage.get('ProfileImage').then((isLoginResult) => {
      this.base64Image = isLoginResult;
      console.log('----' + isLoginResult);
      if (this.base64Image == null || this.base64Image == this.utilityProvider.apiUrl) {
        this.base64Image = 'assets/imgs/ic_sign_in.png';
        console.log('----' + this.base64Image);
      }
    });


    events.subscribe('ItemLength', (isShow) => {
      this.itemCount = isShow;
      console.log(this.itemCount);
    });
    this.storage.get('itemnCount').then(count=>{
      this.itemCount = count;
      console.log("item count = "+this.itemCount);
    });

    storage.get('totalProductAmount').then((isLoginResult) => {
      console.log('---total amount ---'+isLoginResult);
      if (this.itemCount == null || this.itemCount == 0) {
        console.log("No item found");
        this.cartpage.totalAmount = 0;
      }else {
        this.cartpage.totalAmount = isLoginResult;

        this.cartpage.calculateDeliveryCharge();
        this.cartpage.totalPayableAmount = this.cartpage.totalAmount + this.cartpage.deliveryCharge;
        if (this.userType == 5) {
          this.cartpage.chckForFreeDelivery();
        }
        this.cartpage.calculateRoundOff();

      }
    });

    events.subscribe('totalAmount', (isShow) => {
      this.totalAmount = isShow;
      console.log(this.totalAmount);
      if (this.totalAmount == 0) {
        this.totalAmount = 0;
      }
    });


    storage.get('addData').then((isLoginResult) => {
      this.addDataList = isLoginResult;
      console.log(isLoginResult);
      if (this.itemCount == 0) {
        this.itemCount = 0;
      }
      //this.AmounCount(this.addDataList);
    });
    storage.get('itemnCount').then((isLoginResult) => {
      console.log(isLoginResult);
      this.itemCount = isLoginResult;
      if (this.itemCount == 0) {
        this.itemCount = 0;
      } else if (this.itemCount == null) {
        console.log("No item found");
        this.totalAmount = 0;
      }
      //this.AmounCount(this.addDataList);
    });

    storage.get('totalProductAmount').then((isLoginResult) => {
      // this.totalAmount = isLoginResult;
      console.log(this.totalAmount);
      // if (this.totalAmount == 0) {
      //   this.totalAmount = 0;
      // }
      //this.AmounCount(this.addDataList);
    });

    storage.get('userInfo').then((isLoginResult) => {
      if (isLoginResult != null) {
        this.userInfo = isLoginResult;
        this.userName = this.userInfo.Name;
        this.userEmail = this.userInfo.Email;
        this.userMobile = this.userInfo.MobileNo;
        console.log('----' + isLoginResult);
      }
    });

    events.subscribe('userDetails', (isShow) => {
      this.userName = isShow.Name;
      this.userEmail = isShow.Email;
      this.userMobile = isShow.MobileNo;
      this.base64Image = this.utilityProvider.apiUrl + isShow.ImageUrl;
      console.log(isShow);
    });


    // platform.registerBackButtonAction(() => {
    //
    //   let nav = app.getActiveNavs()[0];
    //   let activeView = nav.getActive();
    //
    //   // if(activeView.name === "HomePage") {
    //   if(activeView) {
    //     if (nav.canGoBack()){ //Can we go back?
    //       nav.pop();
    //     } else {
    //       const alert = this.alertCtrl.create({
    //         title: 'Exit App',
    //         message: 'Do you want to close the app?',
    //         buttons: [{
    //           text: 'No',
    //           role: 'cancel',
    //           handler: () => {
    //             console.log('Application exit prevented!');
    //           }
    //         },{
    //           text: 'Yes',
    //
    //           handler: () => {
    //             this.platform.exitApp(); // Close this application
    //           }
    //         }]
    //       });
    //       alert.present();
    //     }
    //   }else {
    //     nav.canGoBack();
    //      nav.pop();
    //
    //   }
    // });

    var lastTimeBackPress = 0;
    var timePeriodToExit = 2000;


    /*platform.registerBackButtonAction(async () => {
      // get current active page
      const view = await this.nav.getActive();
      if (view.component.name == "HomePage") {
        //Double check to exit app
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          platform.exitApp(); //Exit from app
        } else {
          let toast = this.toastCtrl.create({
            message: 'Press back again to exit App',
            duration: 3000,
            position: 'bottom'
          });
          await toast.present();
          lastTimeBackPress = new Date().getTime();
        }
      } else {
        // go to previous page
        this.nav.pop({});
      }
    });*/


    this.appVersion.getVersionNumber().then(value => {
      this.appVersionNumber = value;
    }).catch(err => {
      alert(err);
    });


    this.initializeApp();

  }

/*  calculateDeliveryCharge() {

    if (this.cartpage.selectAddress == "Pick from store") {
      this.cartpage.deliveryCharge = 0;
    } else {

      console.log("-----ANil is heare");
      for (var i = 0; i < this.cartpage.deliveryChargeList.length; i++) {
        console.log("-----first RS----- " + this.cartpage.deliveryChargeList[i].FixedOrPerc);

        if (this.totalAmount >= this.cartpage.deliveryChargeList[i].BillAmountFrom && this.totalAmount <= this.cartpage.deliveryChargeList[i].BillAmountUpto) {
          if (this.cartpage.deliveryChargeList[i].FixedOrPerc == (('021EE4F0-5D4C-449E-BED9-6D80AA135626').toLowerCase()).toLowerCase()) {
            console.log("-----Percent----- " + this.cartpage.deliveryChargeList[i].FixedOrPerc);
            this.cartpage.deliveryCharge = (this.totalAmount * this.cartpage.deliveryChargeList[i].DeliveryAmount) / 100;
            this.cartpage.calculateRoundOffDc(this.cartpage.deliveryCharge);
            console.log("  " + this.cartpage.deliveryCharge);
          } else {
            console.log("-----Fixed----- " + this.cartpage.deliveryChargeList[i].FixedOrPerc);
            this.cartpage.deliveryCharge = this.cartpage.deliveryChargeList[i].DeliveryAmount;
            this.cartpage.calculateRoundOffDc(this.cartpage.deliveryCharge);

            console.log("---after--Fixed----- " + this.cartpage.deliveryCharge)

          }

          console.log("-----total amount----- " + this.totalAmount);
          console.log("-----delivery charge value-----" + this.cartpage.deliveryCharge);
        }
      }
    }

    // this.totalPayableAmount = this.totalAmount + this.deliveryCharge;
    // this.chckForFreeDelivery();
  }*/


  hideSplashScreen() {
    if (this.splashPage) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 10);
    }
  }


  async presentAlertForUpdate(title, msg) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Disagree');
            this.menuCtrl.close();

          }
        }
      ]
    });
    await alert.present();
  }


/*  openMap() {
    this.menuCtrl.close();
    this.nav.push(GoogleMapsPage);
  }*/


  logout() {
    // Remove API token
    this.utilityProvider.CrCn = null;
    this.utilityProvider.CompId = null;
    this.storage.set('CrCn',this.utilityProvider.CrCn);
    this.storage.set('CompId',this.utilityProvider.CompId);
    this.navCtrl.navigateRoot(['/login-with-option']);
  }

  async presentConfirm(title, msg) {
      const alert = await this.alertCtrl.create({
          header: title,
          message: msg,
          buttons: [
              {
                  text: 'NO',
                  role: 'cancel',
                  handler: () => {
                      console.log('Disagree');
                      this.menuCtrl.close();

                  }
              },
              {
                  text: 'YES',
                  handler: () => {
                      console.log('Agree');
                      this.menuCtrl.close();
                      this.logout();
                  }
              }
          ]
      });
      await alert.present();
  }

  // openTranstionHistory() {
  //   this.menuCtrl.close();
  //   this.nav.setRoot(TranstionHistoryPage);
  // }


  openInvite() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/invite-friends']);
  }


  openPendingOrders() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/pending-orders']);
  }

  openCart() {

    this.menuCtrl.close();
    if (this.itemCount > 0) {
      this.navCtrl.navigateRoot(['/cart',{page:'itemList'}]);
    }
    else {
      this.presentToast();
    }

  }


  openHome() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/home']);
  }

  openProfile() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/edit-profile']);

  }
  openAdmin() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/admin-dashboard']);

  }

  // openInvoiceDetail() {
  //   this.menuCtrl.close();
  //   this.nav.push(InvoiceDetailPage);
  // }

  openDeliveryDetail() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/deliverytimeslot']);
  }

  openOrderList(){
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/order-list1']);
  }


  /*  openLedgerReport() {
      this.menuCtrl.close();
      this.nav.setRoot(LedgerPage);
    }*/

  openReceivable(){
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/receivable']);
  }

  openContactUs() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/contact-us']);
  }

  /*openPrint() {
    this.menuCtrl.close();
    this.nav.setRoot(DemoPrintPage);
  }*/

  openDeliverySlot() {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(['/deliverytimeslot']);
  }


  async presentToast() {
      let toast = await this.toastCtrl.create({
          message: 'The cart is empty. Please add items to cart.',
          duration: 3000,
          position: 'bottom'
      });

      /*toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });*/

      await toast.present();
  }

  /*makePayment(){
    this.menuCtrl.close();
    this.nav.push(MakePaymentPage);
  }*/

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      const hideFooterTimeout = setTimeout( () => {
        this.navCtrl.navigateRoot(['/login-with-option']).then(() => {
          const index = this.viewController;
        });
      }, 150);
    });
  }

//   initializeApp() {
// this.platform.ready().then(() => {
// this.statusBar.styleDefault();
// this.splashScreen.hide();
// timer(3000).subscribe(() => this.showSplash=false  )
//
// }).then(()=>{
//   this.navCtrl.navigateRoot(['/login-with-option']).then(() => {
//     const index = this.viewController;
//   });
// });
//
//   }


  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.navCtrl.navigateRoot(['/splash']);
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //     const hideFooterTimeout = setTimeout( () => {
  //       this.navCtrl.navigateRoot(['/login-with-option']).then(() => {
  //         const index = this.viewController;
  //       });
  //     }, 100);
  //   });
  // } nitin
}
