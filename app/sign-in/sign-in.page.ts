import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {UserService} from '../Providers/user/user.service';
import {FormsModule} from '@angular/forms';
import {RegisterPage} from '../register/register.page';
import {UtilityService} from '../Providers/utility/utility.service';
import {ProductServiceService} from '../Providers/product-service/product-service.service';
import {ForgetpasswordPage} from '../forgetpassword/forgetpassword.page';
import {HomePage} from '../home/home.page';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
    public data: any;
    public userNameError: any;
    public userPasswordError: any;
    loginData = {groupKey: '', userName: '', userPassword: ''};
    public rememberFlag = 0;
    public type = 'password';
    public showPass = false;

    public smsData: any;
    public appVersionNumber: any;
    public getValidateData: any;
    public ReturnCode: any;
    public ReturnMessage: any;
    public randomNo: any;
    public smsText: any;

    public emailIDVisible: any = false;
    public validateMobOrEmail: any;
    public validateGroupKeyData: any = [];
    public validateGroupKeyForfg: any;
    public validateMobOrEmailfg: any;
    public groupKeyTabsy: any;
    public mobOrEmailTabsy: any;
    // public RateCategory:any;
    // public RateCategoryName:any;
    loaderToShow: any;

    constructor(public userProvider: UserService, public alertController: AlertController,
                public menuCtrl: MenuController, public storage: Storage,
                public navCtrl: NavController, public toastController: ToastController,
                public loadingCtrl: LoadingController, public utilityProvider: UtilityService,
                public productServiceProvider: ProductServiceService) {
        // this.userProvider.getUsers('BHKGroup', '9928015706', '123456', '1.0.18').then(res => {
        //     this.data = res;
        //     console.log('User Data ---RS---' + JSON.stringify(this.data));
        // });
        // this.storage.set('st_Flag',this.st_Flag);

        this.fetchLoginCredentials();
    }

    ngOnInit() {
        console.log('ionViewDidLoad SingInPage');
        this.storage.get('mobOrEmailTabsy').then(res => {
            this.mobOrEmailTabsy = res;
            console.log('mobOrEmailTabsy---- ' + this.mobOrEmailTabsy);
            if (this.mobOrEmailTabsy == 'EMAIL') {
                this.emailIDVisible = true;
            } else {
                this.emailIDVisible = false;
            }
        });
    }

    fetchLoginCredentials() {
        // this.storage.get("groupKey").then(res => {
        //   console.log("already stored GroupKey = " + res);
        //   if (res == null) {
        //     this.loginData.groupKey = "";
        //   } else {
        //     this.loginData.groupKey = res;
        //   }
        // });
        this.storage.get('username').then(res => {
            console.log('already stored username = ' + res);
            if (res == null) {
                this.loginData.userName = '';
            } else {
                this.loginData.userName = res;
            }
        });
        this.storage.get('password').then(res1 => {
            console.log('already stored password = ' + res1);
            if (res1 == null) {
                this.loginData.userPassword = '';
            } else {
                this.loginData.userPassword = res1;
            }
        });
    }

    gotoCreateAccount() {

        // this.userProvider.getValidateVerion(this.appVersionNumber).then(res => {
        //   this.getValidateData = res;
        //   console.log(" Register Validation Data----RS---" + JSON.stringify(this.getValidateData));
        //   this.ReturnCode = this.getValidateData.ReturnCode;
        //   console.log(" Register Validation ReturnCode--RS-- " + JSON.stringify(this.ReturnCode));
        //   this.ReturnMessage = this.getValidateData.ReturnMessage;
        //   console.log(" Register Validation ReturnMessage--RS-- " + JSON.stringify(this.ReturnMessage));
        //
        //   if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {
        //
        //     console.log(" Register ----RS---");
        //     if (this.utilityProvider.groupKey == "RajdhaniSM") {
        //       this.navCtrl.navigateForward(RegisterPage);
        //     } else {
        //       this.navCtrl.navigateForward(RegisterCapitalPage);
        //
        //     }
        //
        //     if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
        //       console.log(" Not in Register ----RS---");
        //     } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
        //       console.log(" Not in Register 2 else if -99----RS---");
        //
        //     }
        //   } else {
        //
        //     this.presentAlertForUpdate("UPDATE APP", "Please Update Application");
        //
        //     // this.presentToast(this.getValidateData.ReturnMessage);
        //   }
        //
        //
        // });
        this.navCtrl.navigateForward(['/register']);
    }


    ForgotPassword() {
        console.log('ForgotPassword clicked');

    /*    this.storage.get('groupKey').then(res => {
            this.validateGroupKeyForfg = res;

            console.log('already stored GroupKey = ' + res);


        });
*/

        this.userProvider.validateGroupKey(this.validateGroupKeyForfg).then(res => {
            this.validateGroupKeyData = res;
            this.validateMobOrEmailfg = this.validateGroupKeyData.VerifyThruMobOrEmail;
            console.log('--validateMobOrEmail--' + this.validateMobOrEmailfg);
            if (this.validateMobOrEmailfg == 'EMAIL') {
               this.navCtrl.navigateForward(['/forgetpassword']);
            } else {
               this.navCtrl.navigateForward(['/forgetpassword']);
            }
        });

        // this.randomNo = Math.floor(1000 + Math.random() * 9000);
        // console.log(this.randomNo);
        // this.smsText = "Your OTP for Mobile Verification is "+this.randomNo;
        // console.log(this.smsText);
        // // console.log(this.utility.sessionToken);
        // // console.log("Mobile no = "+this.registerData.userMobile);
        //   // this.sendSms.sendOTP(this.registerData.userMobile,this.smsText);
        //   this.presentToast("OTP sent successfully to your entered Mobile No.");
        // this.userProvider.apiSendSmS( '9610064564',this.randomNo).then(res => {
        //   this.smsData = res;
        //   if(this.smsData.Status==1)
        //   {
        //
        //     console.log(" OTP Sent ----RS---- " );
        //     this.storage.set('Message',this.smsData.Message);
        //     console.log(" OTP Message ----RS---- " );
        //     this.storage.set('UserId',this.smsData.UserId);
        //     console.log(" OTP UserId ----RS---- " );
        //     this.navCtrl.navigateForward(ForgetpasswordPage);
        //   }
        //
        //   console.log(" Retrieve api SendSmS DATA ----RS---- "+JSON.stringify(this.smsData));
        // });

        // let alert = this.alertCtrl.create({
        //
        //   title: 'Reset Password',
        //   message:'Please enter OTP here.',
        //   inputs: [
        //     {
        //       name: 'name',
        //       placeholder: 'OTP'
        //     },
        //     // {
        //     //   name: 'name',
        //     //   placeholder: 'New Password'
        //     // } ,
        //     // {
        //     //   name: 'name',
        //     //   placeholder: 'Confirm New Password'
        //     // }
        //   ],
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       role: 'cancel',
        //       handler: data => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: 'Ok',
        //       handler: data => {
        //         this.fp_username=data.name;
        //         console.log(this.fp_username);
        //         this.ForgotPasswordUser(this.fp_username);
        //
        //       }
        //     }
        //   ]
        // });
        // alert.present();


    }

    // ForgotPasswordUser(userId)
    // {
    //   this.userProvider.chckUserName(userId).then(res => {
    //     this.data = res;
    //     console.log(this.data.ReturnMessage);
    //     if (this.data.ReturnMessage == 'The SMTP server requires a secure connection or the client was not authenticated. The server response was: 5.5.1 Authentication Required. Learn more at' )
    //     {
    //       this.UserIdValidTrue();
    //
    //     }else {
    //
    //      this.UserIdValidFalse();
    //     }
    //   });
    // }

    showLoader() {
        this.loaderToShow = this.loadingCtrl.create({
            message: 'Please Wait...'
        }).then((res) => {
            res.present();

            res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed!');
            });
        });
        this.hideLoader();
    }

    hideLoader() {
        setTimeout(() => {
            this.loadingCtrl.dismiss();
        }, 1000);
    }

    showPassword() {
        this.showPass = !this.showPass;

        if (this.showPass) {
            this.type = 'text';
        } else {
            this.type = 'password';
        }
    }

    userLogin() {

        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
            this.getValidateData = res;
            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
            this.ReturnCode = this.getValidateData.ReturnCode;
            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
            this.ReturnMessage = this.getValidateData.ReturnMessage;
            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {

                var check = true;
                if (this.loginData.userName.length >= 3) {
                    this.userNameError = true;
                } else {
                    this.userNameError = false;
                    check = false;
                }
                if (this.loginData.userPassword.length >= 3) {
                    this.userPasswordError = true;
                } else {
                    this.userPasswordError = false;
                    check = false;
                }
                if (check == true) {
                    this.showLoader();
                    /* this.storage.get('groupKeyTabsy').then(res => {
                         this.groupKeyTabsy = res;
                         console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);


                       });*/
                    this.userProvider.getUsers(this.groupKeyTabsy, this.loginData.userName.toLowerCase(), this.loginData.userPassword, this.appVersionNumber).then(res => {
                        this.data = res;
                        if (this.data.ReturnMessage == 'User is successfully loaded.') {
                            this.storage.set('UserType', this.data.UserType);
                            this.utilityProvider.userType = this.data.UserType;
                            console.log('user type = ' + this.utilityProvider.userType);
                            // this.events.publish('UserType', this.data.UserType);
                            this.storage.set('loginTrue', this.data.UserType);
                            this.storage.set('AppVersionNo', this.data.AppVersionNo);
                            this.storage.set('userInfo', this.data);
                            this.storage.set('AcntId', this.data.AcntId);
                            this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
                            this.storage.set('userID', this.data.UserId);
                            this.utilityProvider.CompId = this.data.CompId;
                              this.utilityProvider.CrCn = this.data.crCn;
                            this.storage.set('CompId', this.utilityProvider.CompId);
                            this.storage.set('companyName', this.data.CompanyName);
                            this.storage.set('CrCn', this.utilityProvider.CrCn);
                            console.log('---CrCn---' + this.utilityProvider.CrCn);
                            console.log('----CompId----' + this.utilityProvider.CompId);
                            // this.events.publish('userDetails', this.data);
                            console.log('---CompStateID---' + this.data.CompStateID);
                            console.log('----stateID----' + this.data.State);
                            this.storage.set('CompStateID', this.data.CompStateID);
                            this.storage.set('stateID', this.data.State);
                            this.storage.set('userName', this.data.Name);
                            this.storage.set('ReferralCode', this.data.ReferralCode);
                            console.log('ReferralCode = ' + this.data.ReferralCode);
                            this.storage.set('RateCategory',this.data.RateCategory);
                            console.log('RateCategory = ' + this.data.RateCategory);
                            this.storage.set('RateCategoryName',this.data.RateCategoryName);
                            console.log('RateCategoryName = ' + this.data.RateCategoryName);

                            if (this.data.UserType == 5) {
                                this.navCtrl.navigateRoot(['/home']);
                            } else if (this.data.UserType == 2) {
                                this.navCtrl.navigateRoot(['/admin-dashboard']);
                            }
                            console.log(res);
                            this.hideLoader();
                        } else {


                            console.log(this.data.ReturnMessage);
                            this.hideLoader();
                            this.presentToast(this.data.ReturnMessage);
                            this.storage.set('UNforFG', this.loginData.userName);
                            this.storage.set('GKforFG', this.loginData.groupKey);

                        }

                    });

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


        // var check = true;
        // if (this.loginData.userName.length >= 3) {
        //     this.userNameError = true;
        // } else {
        //     this.userNameError = false;
        //     check = false;
        // }
        // if (this.loginData.userPassword.length >= 3) {
        //     this.userPasswordError = true;
        // } else {
        //     this.userPasswordError = false;
        //     check = false;
        // }
        // if (check == true) {
        //     this.showLoader();
        //    /* this.storage.get('groupKeyTabsy').then(res => {
        //         this.groupKeyTabsy = res;
        //         console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);
        //
        //
        //       });*/
        //     this.userProvider.getUsers(this.groupKeyTabsy, this.loginData.userName.toLowerCase(), this.loginData.userPassword, this.appVersionNumber).then(res => {
        //         this.data = res;
        //         if (this.data.ReturnMessage == 'User is successfully loaded.') {
        //             this.storage.set('UserType', this.data.UserType);
        //             this.utilityProvider.userType = this.data.UserType;
        //             console.log('user type = ' + this.utilityProvider.userType);
        //             // this.events.publish('UserType', this.data.UserType);
        //             this.storage.set('loginTrue', this.data.UserType);
        //             this.storage.set('AppVersionNo', this.data.AppVersionNo);
        //             this.storage.set('userInfo', this.data);
        //             this.storage.set('AcntId', this.data.AcntId);
        //             this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
        //             this.storage.set('userID', this.data.UserId);
        //             this.utilityProvider.CompId = this.data.CompId;
        //             this.utilityProvider.CrCn = this.data.crCn;
        //             this.storage.set('CompId', this.utilityProvider.CompId);
        //             this.storage.set('companyName', this.data.CompanyName);
        //             this.storage.set('CrCn', this.utilityProvider.CrCn);
        //             console.log('---CrCn---' + this.utilityProvider.CrCn);
        //             console.log('----CompId----' + this.utilityProvider.CompId);
        //             // this.events.publish('userDetails', this.data);
        //             console.log('---CompStateID---' + this.data.CompStateID);
        //             console.log('----stateID----' + this.data.State);
        //             this.storage.set('CompStateID', this.data.CompStateID);
        //             this.storage.set('stateID', this.data.State);
        //             this.storage.set('userName', this.data.Name);
        //             this.storage.set('ReferralCode', this.data.ReferralCode);
        //             console.log('ReferralCode = ' + this.data.ReferralCode);
        //
        //             if (this.data.UserType == 5) {
        //                 this.navCtrl.navigateRoot(['/home']);
        //             } else if (this.data.UserType == 2) {
        //                 this.navCtrl.navigateRoot(['/admin-dashboard']);
        //             }
        //             console.log(res);
        //             this.hideLoader();
        //         } else {
        //
        //
        //             console.log(this.data.ReturnMessage);
        //             this.hideLoader();
        //             this.presentToast(this.data.ReturnMessage);
        //             this.storage.set('UNforFG', this.loginData.userName);
        //             this.storage.set('GKforFG', this.loginData.groupKey);
        //
        //         }
        //
        //     });
        //
        // }
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 3000,
            position: 'bottom'

        });
        await toast.present();
    }

    // presentToast(msg) {
    //     let toast = this.toastCtrl.create({
    //         message: msg,
    //         duration: 3000,
    //         position: 'bottom'
    //     });
    //
    //     toast.onDidDismiss(() => {
    //         console.log('Dismissed toast');
    //     });
    //
    //     toast.present();
    // }

    rememberMe() {
        console.log('remember Me = ' + this.rememberFlag);
        if (this.rememberFlag == 0) {
            this.storage.set('groupKey', this.loginData.groupKey);
            this.storage.set('username', this.loginData.userName);
            this.storage.set('password', this.loginData.userPassword);
            this.rememberFlag = 1;
        } else {
            this.rememberFlag = 0;
        }

    }

}
