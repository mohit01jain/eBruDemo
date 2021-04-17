import {Component, OnInit} from '@angular/core';
import * as events from 'events';
import {LoadingController, MenuController, NavController, Platform} from '@ionic/angular';
import {ChildDisplayPage} from '../child-display/child-display.page';
import {CartPage} from '../cart/cart.page';
import {ToastController} from '@ionic/angular';
import {UtilityService} from '../Providers/utility/utility.service';
import {SearchItemPage} from '../search-item/search-item.page';
import {ItemListPage} from '../item-list/item-list.page';
import {ProductServiceService} from '../Providers/product-service/product-service.service';
import { Storage } from '@ionic/storage';
import {UserService} from '../Providers/user/user.service';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public DisplayData: any;
    public addDataList: any = [];
    public sliderImagesUrlList: any = [];
    public itemCount: any = 0;
    public totalAmount: any;
    public checkTotal: any;
    public userName: any;
    tooltipEvent: 'click' | 'press' = 'click';
    showArrow: boolean = true;
    duration: number = 2000;
    public companyName: any;
    public themecolor: any = 'yellow';
    public baseImageURL: any;
    public sliderImageUrl: any = [];
    public sliderImageUr2: any = [];
    public sliderImageUr3: any = [];
    public sliderImageUr4: any = [];
    public sliderImageUr5: any = [];
    public SliderData: any;
    private slides: any;
    loaderToShow: any;
    spinner: boolean;
    public groupKeyTabsy: any;
    public appVersionNumber: any;
    public getValidateData: any;
    public ReturnCode: any;
    public ReturnMessage: any;
    public RefreshCustomerRegistrationData: any = [];
    public userInfo: any;
    public status: any;


  constructor(public userProvider: UserService, public  menuCtrl: MenuController, public storage: Storage,
                public navCtrl: NavController, public toastController: ToastController ,
                public loadingCtrl: LoadingController, public toastCtrl: ToastController, public utility: UtilityService,
              public productServiceProvider: ProductServiceService,public utilityProvider: UtilityService) {
      this.groupKeyTabsy= this.utilityProvider.groupKey;

        this.menuCtrl.enable(true);
        this.checkTotal = true;


        storage.get('addData').then((isLoginResult) => {
            console.log(isLoginResult);
            this.addDataList = isLoginResult;
        });
        this.storage.get('itemnCount').then((list) => {
            this.itemCount = list;

            console.log('Mohit Jain Item Count on HomePage 123 :' +JSON.stringify(this.itemCount));

            console.log('---itemnCount---' + this.itemCount);
            if (this.itemCount == null || this.itemCount == 0) {
                console.log('No item found');
                this.totalAmount = 0;
            } else {
                this.totalAmount = this.totalAmount;
            }
        });
        storage.get('totalProductAmount').then((isLoginResult) => {
            // this.totalAmount = isLoginResult;
            console.log(this.totalAmount);
        });

        this.setDisplaySection();
        this.setDisplaySlider();

        this.storage.get('userName').then(res => {
            this.userName = res;
            console.log('username = ' + this.userName);
        });
        this.storage.get('companyName').then(res => {
            this.companyName = res;
        });


    }
  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({
      message: 'This Loader will Not AutoHide'
    }).then((res) => {
      res.present();});
    this.hideLoader();
  }
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 4000);
  }




    changePage(event) {
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
                        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
                            this.getValidateData = res;
                            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
                            this.ReturnCode = this.getValidateData.ReturnCode;
                            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
                            this.ReturnMessage = this.getValidateData.ReturnMessage;
                            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
                            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {
                                // Change page so we can test hardware backbutton changes
                                this.navCtrl.navigateForward(['/child-display']);
                                if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
                                    console.log(' Not in Register ----RS---');
                                } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
                                    console.log(' Not in Register 2 else if -99----RS---');
                                }
                            } else {
                                console.log('UPDATE APP Please Update Application');
                            }
                        });


                    }
                });
            }
        });


    }

    logout() {
        // Remove API token
        this.utilityProvider.CrCn = null;
        this.utilityProvider.CompId = null;
        this.storage.set('CrCn',this.utilityProvider.CrCn);
        this.storage.set('CompId',this.utilityProvider.CompId);
        this.navCtrl.navigateRoot(['/login-with-option']);
    }


   async gotoCartPage() {
       const loading = await this.loadingCtrl.create({
           message: 'Please wait...'
       });
       await loading.present();
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


                        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
                            this.getValidateData = res;
                            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
                            this.ReturnCode = this.getValidateData.ReturnCode;
                            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
                            this.ReturnMessage = this.getValidateData.ReturnMessage;
                            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
                            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {

                                if (this.itemCount > 0) {

                                    this.navCtrl.navigateForward(['/cart' , {page: 'itemList'}]);

                                } else {
                                    this.presentToast('The cart is empty. Please add items to cart.');
                                }




                                if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
                                    console.log(' Not in Register ----RS---');
                                } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
                                    console.log(' Not in Register 2 else if -99----RS---');
                                }
                            } else {
                                console.log('UPDATE APP Please Update Application');
                            }
                        });

                    }
                });
            }

        });


       loading.dismiss();



    }



    setDisplaySection() {
         this.productServiceProvider.getRootDisplaySection().then(res => {
            this.DisplayData = res;
            this.baseImageURL = this.utility.apiUrl + this.DisplayData[0].ImageUrl;
            console.log(res);
            console.log('---DisplaySection Data----RV---' + JSON.stringify(this.DisplayData));
        });
     }

    setDisplaySlider() {
         this.productServiceProvider.getRootDisplaySliders().then(res => {
            this.SliderData = res;
            // this.baseImageURL = this.utilityProvider.apiUrl + this.DisplayData[0].Slider1Url;
            // console.log(res);
            console.log('---DisplaySection Data----RV---' + JSON.stringify(this.SliderData));

            this.sliderImageUrl = this.SliderData.companyOnlineModelForApp.sliderImagesUrlList[0];
            console.log('---sliderImageUrlList Data----RV---' + JSON.stringify(this.sliderImageUrl));

            this.sliderImageUr2 = this.SliderData.companyOnlineModelForApp.sliderImagesUrlList2[0];
            console.log('---sliderImageUrlList Data----RV---' + JSON.stringify(this.sliderImageUr2));

            this.sliderImageUr3 = this.SliderData.companyOnlineModelForApp.sliderImagesUrlList3[0];
            console.log('---sliderImageUrlList Data----RV---' + JSON.stringify(this.sliderImageUr3));

            this.sliderImageUr4 = this.SliderData.companyOnlineModelForApp.sliderImagesUrlList4[0];
            console.log('---sliderImageUrlList Data----RV---' + JSON.stringify(this.sliderImageUr4));

            this.sliderImageUr5 = this.SliderData.companyOnlineModelForApp.sliderImagesUrlList5[0];
            console.log('---sliderImageUrlList Data----RV---' + JSON.stringify(this.sliderImageUr5));

        });
     }

    itemSelect(data) {
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
                        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
                            this.getValidateData = res;
                            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
                            this.ReturnCode = this.getValidateData.ReturnCode;
                            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
                            this.ReturnMessage = this.getValidateData.ReturnMessage;
                            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
                            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {
                                console.log(JSON.stringify(data));
                                if (data.ItemCount > 0) {
                                    this.navCtrl.navigateForward(['/item-list', {name: data.DisplaySectionName, id: data.ID, data: this.addDataList}]);
                                } else {
                                    this.navCtrl.navigateForward(['/child-display', {
                                        name: data.DisplaySectionName,
                                        id: data.ID,
                                        data: JSON.stringify(data.sliderImagesUrlList[0])
                                    }]);
                                }

                                if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
                                    console.log(' Not in Register ----RS---');
                                } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
                                    console.log(' Not in Register 2 else if -99----RS---');
                                }
                            } else {
                                console.log('UPDATE APP Please Update Application');
                            }
                        });


                    }
                });
            }
        });

    }

       async openSearchPage() {
           const loading = await this.loadingCtrl.create({
               message: 'Please wait...'
           });
           await loading.present();
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

                        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
                            this.getValidateData = res;
                            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
                            this.ReturnCode = this.getValidateData.ReturnCode;
                            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
                            this.ReturnMessage = this.getValidateData.ReturnMessage;
                            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
                            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {

                                 this.navCtrl.navigateForward(['/search-item']);

                                if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
                                    console.log(' Not in Register ----RS---');
                                } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
                                    console.log(' Not in Register 2 else if -99----RS---');
                                }
                            } else {
                                console.log('UPDATE APP Please Update Application');
                            }
                        });
                    }
                });
            }
        });
           await loading.dismiss();

    }

    getItems($event: CustomEvent<any>) {

    }

    ionViewDidLoad() {

        this.menuCtrl.enable(true);
        this.checkTotal = true;


        this.storage.get('addData').then((isLoginResult) => {
            console.log(isLoginResult);
            this.addDataList = isLoginResult;
        });
        this.storage.get('itemnCount').then((list) => {
            this.itemCount = list;

            console.log('Mohit Jain Item Count on HomePage :' +JSON.stringify(this.itemCount));

            console.log('---itemnCount---' + this.itemCount);
            if (this.itemCount == null || this.itemCount == 0) {
                console.log('No item found');
                this.totalAmount = 0;
            } else {
                this.totalAmount = this.totalAmount;
            }
        });
        this.storage.get('totalProductAmount').then((isLoginResult) => {
            // this.totalAmount = isLoginResult;
            console.log(this.totalAmount);
        });
        // @ts-ignore
        // this.geolocation.getCurrentPosition().then((resp) => {
        //   console.log(' getting location', resp.coords.latitude + '-----' + resp.coords.longitude);
        //
        // }).catch((error) => {
        //   console.log('Error getting location', error);
        // });
        // this.showLoader();
        this.setDisplaySection();
        this.setDisplaySlider();
        // this.hideLoader();

        this.storage.get('userName').then(res => {
            this.userName = res;
            console.log('username = ' + this.userName);
        });
        this.storage.get('companyName').then(res => {
            this.companyName = res;
        });

    }

    ionViewWillEnter(){
        this.storage.get('itemnCount').then((list) => {
            this.itemCount = list;

            console.log('Mohit Jain Item Count on HomePage :' +JSON.stringify(this.itemCount));

            console.log('---itemnCount---' + this.itemCount);
            if (this.itemCount == null || this.itemCount == 0) {
                console.log('No item found');
                this.totalAmount = 0;
            } else {
                this.totalAmount = this.totalAmount;
            }
        });
    }

    ngOnInit()
    {
        this.menuCtrl.enable(true);
        this.checkTotal = true;


        this.storage.get('addData').then((isLoginResult) => {
            console.log(isLoginResult);
            this.addDataList = isLoginResult;
        });
        this.storage.get('itemnCount').then((list) => {
            this.itemCount = list;

            console.log('Mohit Jain Item Count on HomePage :' +JSON.stringify(this.itemCount));

            console.log('---itemnCount---' + this.itemCount);
            if (this.itemCount == null || this.itemCount == 0) {
                console.log('No item found');
                this.totalAmount = 0;
            } else {
                this.totalAmount = this.totalAmount;
            }
        });
        this.storage.get('totalProductAmount').then((isLoginResult) => {
            // this.totalAmount = isLoginResult;
            console.log(this.totalAmount);
        });
        // @ts-ignore
        // this.geolocation.getCurrentPosition().then((resp) => {
        //   console.log(' getting location', resp.coords.latitude + '-----' + resp.coords.longitude);
        //
        // }).catch((error) => {
        //   console.log('Error getting location', error);
        // });
        // this.showLoader();
        this.setDisplaySection();
        this.setDisplaySlider();
        // this.hideLoader();

        this.storage.get('userName').then(res => {
            this.userName = res;
            console.log('username = ' + this.userName);
        });
        this.storage.get('companyName').then(res => {
            this.companyName = res;
        });

    }
    async presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: 'top'
        });
        await toast.present();
    }

}
