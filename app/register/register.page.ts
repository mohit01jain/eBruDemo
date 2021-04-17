import {ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    LoadingController,
    NavController,
    NavParams,
    Platform, PopoverController,
    ToastController,
} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../Providers/user/user.service';
import {UtilityService} from '../Providers/utility/utility.service';
import {OrderService} from '../Providers/order/order.service';
import {MobileVerificationService} from '../Providers/mobile-verification/mobile-verification.service';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {SignInPage} from '../sign-in/sign-in.page';
import {Nav, ViewController /*ViewController*/} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {PopoverPageforPincodePage} from '../popover-pagefor-pincode/popover-pagefor-pincode.page';
import {ActivatedRoute} from '@angular/router';
import {AddressService} from '../Providers/address/address.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage   {
    public userNameError: any;
    public userPasswordError: any;
    public userOtpError: any;
    public userOTP: any;
    public nameError: any;
    public add1Error: any;
    public add2Error: any;
    public cityError: any;
    public emailIdError: any;
    public userPincodeError: any;
    public userMobileError: any;
    public userAltMobileError: any;
    public fssError: any;
    public gstError: any;
    public panError: any;
    public data: any;
    public visiblity: any = false;
    visible: boolean;
    public branchList: any = [];
    public validateGroupKeyData: any = [];
    public getOTPData: any = [];
    public selectBranch: any;
    public type = 'password';
    public showPass = false;
    value: number = 0;
    public stateDetail:any;
    public stateList1: any = [];
    public stateList: any;
    registerData = {

        groupKey: '',
        userPassword: '',
        name: '',
        userID: '',
        userMobile: '',
        userAltMobileNo: '',
        userAddress1: '',
        userAddress2: '',
        userCity: '',
        userPincode:'',
        userInviteCode: '',
        fsslicno: '',
        gstno: '',
        panno: '',

        groupKey1: '',
        userPassword1: '',
        name1: '',
        userID1: '',
        userMobile1: '',
        userAltMobileNo1: '',
        userAddress11: '',
        userAddress21: '',
        userCity1: '',
        userPincode1:'',
        userInviteCode1: '',
        fsslicno1: '',
        gstno1: '',
        panno1: '',

    };
    private randomNo: any;
    private smsText: any;
    public check: any = false;
    public messages: any = [];
    public appVersionNumber: any;
    public deliverychargesAPI: any = [];
    public smsData: any;
    public enterOTP: any;
    public oldrandomNo: any;
    tooltipEvent: 'click' | 'press' = 'click';
    public validateGroupKeyId: any;
    public validateGroupKeyCompID: any;
    public validateGroupKeyVerifyThruMobOrEmail: any;
    public validateGroupKeyReturnCode: any;
    public validateGroupKeyReturnMessage: any;
    public validateMobOrEmail: any;
    public MobOrEmail: any;
    public isEnabled: any = false;
    public visibleForm1: any = false;
    public visibleForm2: any = false;
    public isEnableddMob: any = false;
    public groupKeyTabsy: any;
    public groupKeyTabsy1: any;
    public newacnt:any;
    public mobOrEmailTabsy: any;
    public emailIDVisible: any = false;
    private base64Image: string = '';
    private base64Image1: string = '';
    public CurrentCompID:any;
    list:any;

    public users: any[] = [
        '302000',
        '302001',
        '302002',
        '302003',
        '302004'
    ];
    public flagregister:any=0;
    public a: any;
    public  a1: any;
    private otp1: string;
    private flagdialougebox: any;
    private Pincode235: any;
    public  PincodeResult: any=[];
    public  PincodePopoverPage:any=['271001','271002','271003'];
    private AcntId: any;
    public stateCode:any;



    constructor(

        public storage: Storage,
        public userProvider: UserService,
        public navCtrl: NavController,
        public utilityProvider: UtilityService,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public appVersion: AppVersion,
        public popoverCtrl: PopoverController,
        public activatedRoute: ActivatedRoute,
        public addressProvider : AddressService,

    ) {
        this.Pincode235="";



        this.a = this.activatedRoute.snapshot.paramMap.get("userID");
        if (this.a != null) {
            this.registerData.userID1 = this.activatedRoute.snapshot.paramMap.get("userID");
        }


        this.a = this.activatedRoute.snapshot.paramMap.get("groupKeyTabsy");
        if (this.a != null) {

            this.groupKeyTabsy = this.activatedRoute.snapshot.paramMap.get("groupKeyTabsy");
            console.log("Grp Key tabsy = " +this.groupKeyTabsy);
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("userPassword");
        if (this.a != null) {


            this.registerData.userPassword1 = this.activatedRoute.snapshot.paramMap.get("userPassword");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("name");
        if (this.a != null) {
            this.registerData.name1 = this.activatedRoute.snapshot.paramMap.get("name");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("userMobile");
        if (this.a != null) {
            this.registerData.userMobile1 = this.activatedRoute.snapshot.paramMap.get("userMobile");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("userAltMobileNo");
        if (this.a != null) {
            this.registerData.userAltMobileNo1 = this.activatedRoute.snapshot.paramMap.get("userAltMobileNo");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("userPincode");
        if (this.a != null) {
            this.registerData.userPincode1 = this.activatedRoute.snapshot.paramMap.get("userPincode");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("userInviteCode");
        if (this.a != null) {
            this.registerData.userInviteCode1 = this.activatedRoute.snapshot.paramMap.get("userInviteCode");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("base64Image");
        if (this.a != null) {
            this.base64Image1 = this.activatedRoute.snapshot.paramMap.get("base64Image");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("userAddress1");
        if (this.a != null) {
            this.registerData.userAddress11 = this.activatedRoute.snapshot.paramMap.get("userAddress1");
        }
        this.a = this.activatedRoute.snapshot.paramMap.get("userAddress2");
        if (this.a != null) {
            this.registerData.userAddress21 = this.activatedRoute.snapshot.paramMap.get("userAddress2");
        }
        this.a = this.activatedRoute.snapshot.paramMap.get("userCity");
        if (this.a != null) {
            this.registerData.userCity1 = this.activatedRoute.snapshot.paramMap.get("userCity");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("fsslicno");
        if (this.a != null) {
            this.registerData.fsslicno1 = this.activatedRoute.snapshot.paramMap.get("fsslicno");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("gstno");
        if (this.a != null) {
            this.registerData.gstno1 = this.activatedRoute.snapshot.paramMap.get("gstno");
        }

        this.a = this.activatedRoute.snapshot.paramMap.get("panno");
        if (this.a != null) {
            this.registerData.gstno1 = this.activatedRoute.snapshot.paramMap.get("panno");
        }

        this.a1 = this.activatedRoute.snapshot.paramMap.get("mobOrEmailTabsy");
        if (this.a1 != null) {
            this.mobOrEmailTabsy = this.activatedRoute.snapshot.paramMap.get("mobOrEmailTabsy");
            console.log("moborEmailTabsy = " + this.mobOrEmailTabsy);
        }

        this.a1 = this.activatedRoute.snapshot.paramMap.get("otp");
        if (this.a1 != null) {
            this.otp1 = this.activatedRoute.snapshot.paramMap.get("otp");
            console.log("moborEmailTabsy = " + this.mobOrEmailTabsy);
        }

        this.a1 = this.activatedRoute.snapshot.paramMap.get("flagdialougebox");
        if (this.a1 != null) {
            this.flagdialougebox = this.activatedRoute.snapshot.paramMap.get("flagdialougebox");

        }


        if (this.a == null) {

            this.storage.get('groupKeyTabsy').then(res => {
                this.groupKeyTabsy = res;
                console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

            });
        }


        this.appVersion.getVersionNumber().then(value => {
            this.appVersionNumber = value;
        }).catch(err => {
            alert(err);
        });


        if (this.a != null) {
            {
                if (this.mobOrEmailTabsy == 'EMAIL') {
                    this.emailIDVisible = true;
                    this.visiblity=true;
                } else {
                    this.emailIDVisible = false;

                }
            }

        }

        this.getState();
    }


    ionViewDidLoad() {
        //PincodePopulation();
        // this.initializeBackButtonCustomHandler();
        console.log('ionViewDidLoad RegisterPage');

        if(this.a==null) {

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

        else {
            if (this.mobOrEmailTabsy == 'EMAIL') {
                this.emailIDVisible = true;
            } else {
                this.emailIDVisible = false;

            }
        }

        console.log(' 1234');

    }


    showPassword() {
        this.showPass = !this.showPass;

        if (this.showPass) {
            this.type = 'text';
        } else {
            this.type = 'password';
        }
    }


    async presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });


        await toast.present();
    }

    ngOnInit() {
    }

    public  number=0;
    private myEvent: any;

    async userRegister() {

        let check1 = true;

        if (this.registerData.userPassword.length >= 3) {
            this.userPasswordError = true;
        } else {
            this.userPasswordError = false;
            check1 = false;
        }
        if (this.registerData.name.length >= 2) {
            this.nameError = true;
        } else {
            this.nameError = false;
            check1 = false;
        }

        if (this.registerData.userAddress1.length >= 2) {
            this.add1Error = true;
        } else {
            this.add1Error = false;
            check1 = false;
        }

        if (this.registerData.userCity.length >= 2) {

            this.cityError = true;
        } else {
            this.cityError = false;
            check1 = false;
        }


        if (this.registerData.userPincode.length >= 2) {

            this.userPincodeError=true;

        } else {
            this.userPincodeError = false;
            check1 = false;
        }

        console.log('userOtpError = ' + this.userOtpError);
        console.log("enterotp=====   "+this.enterOTP);
        console.log("userotp======   "+this.userOTP);
        this.checkForOTP();

        this.checkForOTP();

        if (this.userOtpError == true && typeof this.userOtpError != 'undefined') {
            const loading = await this.loadingCtrl.create({
                message: 'Please wait...'
            });

            await loading.present();
            this.storage.get('groupKeyTabsy').then(res => {
                this.groupKeyTabsy = res;
                console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

                this.userProvider.getRegister(this.groupKeyTabsy, this.registerData.userMobile,
                    this.registerData.userPassword,
                    this.registerData.name,
                    this.registerData.userMobile,
                    this.registerData.userAltMobileNo,
                    this.registerData.userID,
                    this.registerData.userAddress1,
                    this.registerData.userAddress2,
                    this.registerData.userCity,
                    this.registerData.fsslicno,
                    this.registerData.gstno,
                    this.registerData.panno,
                    this.registerData.userPincode,
                    this.registerData.userInviteCode,
                    this.base64Image).then(async res => {
                    this.data = res;
                    if (this.data.ReturnMessage == 'User has been successfully created.') {


                        this.storage.set('UserType', this.data.UserType);
                        this.utilityProvider.userType = this.data.UserType;
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
                        this.storage.set('CompStateID', this.data.CompStateID);
                        this.storage.set('stateID', this.data.State);
                        this.storage.set('userName', this.data.Name);
                        this.storage.set('ReferralCode', this.data.ReferralCode);

                        if(this.flagdialougebox=="alreadydone") {
                            this.navCtrl.navigateRoot(['/sign-in']).then(() => {

                                loading.dismiss();
                            });
                        }
                        else
                        {

                            this.userPincodeError = true;
                            for (var i = 0; i < this.PincodePopoverPage.length; i++) {
                                if (this.registerData.userPincode == this.PincodePopoverPage[i]) {

                                    this.flagregister = 1;
                                    //return;
                                }
                            }

                            if (this.flagregister == 0) {
                                const alert = await this.alertCtrl.create({
                                    header: 'Selection',
                                    message: 'Currently this PIN Code area is not under our service area :  ',
                                    inputs: [],

                                    buttons: [
                                        {
                                            text: 'Do you want to change the above address',
                                            role: 'cancel',
                                            handler: async () => {
                                                console.log('Cancel clicked');

                                            }
                                        },
                                        {
                                            text: 'You will pick all deliveries from store',
                                            role: 'cancel',
                                            handler: () => {
                                                console.log('Change shipping address clicked');


                                            }
                                        },

                                        {
                                            text: 'Show me the list of serviced PIN codes',
                                            handler: () => {
                                                console.log('Change shipping address clicked');

                                                this.navCtrl.navigateRoot(['/popover-pagefor-pincode', {
                                                    "userPincode": this.registerData.userPincode,
                                                    "groupKeyTabsy": this.groupKeyTabsy,
                                                    "userID": this.registerData.userID,
                                                    "userPassword": this.registerData.userPassword,
                                                    "name": this.registerData.name,
                                                    "userMobile": this.registerData.userMobile,
                                                    "userAltMobileNo": this.registerData.userAltMobileNo,
                                                    "userAddress1": this.registerData.userAddress1,
                                                    "userAddress2": this.registerData.userAddress2,
                                                    "userCity": this.registerData.userCity,
                                                    "fsslicno": this.registerData.fsslicno,
                                                    "gstno": this.registerData.gstno,
                                                    "userInviteCode": this.registerData.userInviteCode,
                                                    "base64Image": this.base64Image,
                                                    "AcntId": this.data.AcntId,


                                                }]);


                                            }
                                        },

                                        {
                                            text: 'Quit',
                                            handler: () => {
                                                console.log('Quit');
                                                this.navCtrl.navigateRoot(['/login-with-option']);


                                            }
                                        }
                                    ],


                                });
                                await alert.present();
                                loading.dismiss();
                            }else {
                                this.navCtrl.navigateRoot(['/home']);
                                if (this.data.UserType == 5) {
                                    this.navCtrl.navigateRoot(['/home']);
                                    loading.dismiss();
                                } else if (this.data.UserType == 2) {
                                    this.navCtrl.navigateRoot(['/admin-dashboard']);
                                }
                            }
                        }


                    } else {
                        loading.dismiss();
                        console.log(this.data.ReturnMessage);
                        if (this.data.ReturnMessage == 'Invalid object name \'PromoCode\'.' && this.userOtpError == true) {
                            await this.presentToast(this.data.ReturnMessage);
                        } else {
                            this.userOtpError = false;
                            await this.presentToast(this.data.ReturnMessage);
                        }


                    }
                });

            });
        } else {
            await this.presentToast('Please enter OTP received on your registered mobile number.');
        }

    }


    async sendOtp() {

        let check = true;
        if (this.registerData.userPassword.length >= 3) {
            this.userPasswordError = true;
        } else {
            this.userPasswordError = false;
            check = false;
        }
        if (this.registerData.name.length >= 2) {
            this.nameError = true;
        } else {
            this.nameError = false;
            check = false;
        }

        if (this.registerData.userAddress1.length >= 2) {
            this.add1Error = true;
        } else {
            this.add1Error = false;
            check = false;
        }

        if (this.registerData.userCity.length >= 2) {
            this.cityError = true;
        } else {
            this.cityError = false;
            check = false;
        }



        if (this.registerData.userMobile.length == 10) {
            this.userMobileError = true;
        } else {
            this.userMobileError = false;
            check = false;
        }


        if (this.registerData.userPincode.length >= 2) {

            this.userPincodeError = true;


        }
        else {
            this.userPincodeError = false;
            check = false;
        }

        console.log(this.registerData.userMobile);
        if (typeof this.registerData.userMobile == 'undefined') {
            await this.presentToast('Mobile number cannot be blank');
        } else {
            if (check == true) {
                this.visiblity = true;

                this.randomNo = Math.floor(1000 + Math.random() * 9000);
                console.log(this.randomNo);
                this.oldrandomNo = this.randomNo;

                await this.storage.set('oldRandomNo', this.oldrandomNo);

                this.smsText = 'Your OTP for Mobile Verification is ' + this.randomNo;
                console.log(this.smsText);

                await this.presentToast('OTP sent successfully to your entered Mobile No.');
                this.storage.get('groupKeyTabsy').then(res => {
                    this.groupKeyTabsy = res;
                    console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

                    this.userProvider.apiSendSmS(this.groupKeyTabsy, this.registerData.userMobile, this.smsText).then(res => {
                        this.smsData = res;
                        if (this.smsData.Status == 1) {
                            this.visiblity = true;

                            console.log(' OTP Message ----RS---- ' + this.randomNo);
                            this.enterOTP = this.randomNo;
                            console.log(' OTP  ----RS---- ' + this.enterOTP);
                            this.visiblity = true;
                            this.check = true;

                        } else {
                            console.log(' OTP not Sent ----RS---- ');

                        }

                        console.log(' Retrieve api SendSmS DATA ----RS---- ' + JSON.stringify(this.smsData));
                    });
                });
            } else {
                await this.presentToast('Please fill mandatory fields');
            }

        }

    }



    checkForOTP() {
        if (this.userOTP == this.enterOTP) {
            this.userOtpError = true;
        } else {
            this.userOtpError = false;
        }
    }


    checkGroupKey() {
        if (this.groupKeyTabsy.length >= 9) {
            this.isEnabled = true;
        } else {
            this.isEnabled = false;
            this.visibleForm2 = false;
            this.visibleForm1 = false;

        }


    }


    async userRegisterEmail() {

        var check1 = true;

        if (this.registerData.userID.length >= 2) {
            this.emailIdError = true;
        } else {
            this.emailIdError = false;
            check1 = false;
        }
        if (this.registerData.userPassword.length >= 3) {
            this.userPasswordError = true;
        } else {
            this.userPasswordError = false;
            check1 = false;
        }
        if (this.registerData.name.length >= 2) {
            this.nameError = true;
        } else {
            this.nameError = false;
            check1 = false;
        }

        if (this.registerData.userAddress1.length >= 2) {
            this.add1Error = true;
        } else {
            this.add1Error = false;
            check1 = false;
        }

        if (this.registerData.userCity.length >= 2) {
            this.cityError = true;
        } else {
            this.cityError = false;
            check1 = false;
        }

        if (this.registerData.userPincode.length >= 2) {

            this.userPincodeError = true;

            for (var i = 0; i < this.PincodePopoverPage.length; i++) {
                if (this.registerData.userPincode == this.PincodePopoverPage[i]) {

                    this.flagregister = 1;
                    //return;
                }
            }

            if (this.flagregister == 0) {

                const alert = await this.alertCtrl.create({
                    header: 'Selection',
                    message: 'Currently this PIN Code area is not under our service area :  ',
                    inputs:[],

                    buttons: [
                        {
                            text: 'Do you want to change the above address',
                            role: 'cancel',
                            handler: async () => {
                                console.log('Cancel clicked');

                            }
                        },
                        {
                            text: 'You will pick all deliveries from store',
                            role: 'cancel',
                            handler: () => {
                                console.log('Change shipping address clicked');


                            }
                        },

                        {
                            text: 'Show me the list of serviced PIN codes',
                            handler: () => {
                                console.log('Change shipping address clicked');

                                this.navCtrl.navigateRoot(['/popover-pagefor-pincode', {
                                    "userPincode": this.registerData.userPincode,
                                    /*"groupKeyTabsy": this.groupKeyTabsy,*/
                                    "userID": this.registerData.userID,
                                    "userPassword": this.registerData.userPassword,
                                    "name": this.registerData.name,
                                    "userMobile": this.registerData.userMobile,
                                    "userAltMobileNo": this.registerData.userAltMobileNo,
                                    "userAddress1": this.registerData.userAddress1,
                                    "userAddress2": this.registerData.userAddress2,
                                    "userCity": this.registerData.userCity,
                                    "fsslicno": this.registerData.fsslicno,
                                    "gstno": this.registerData.gstno,
                                    "panno": this.registerData.panno,
                                    "userInviteCode": this.registerData.userInviteCode,
                                    "base64Image": this.base64Image,


                                }]);


                            }
                        },

                        {
                            text: 'Quit',
                            handler: () => {
                                console.log('Quit');
                                this.navCtrl.navigateRoot(['/popover-pagefor-pincode']);

                            }
                        }
                    ],


                });
                await alert.present();
            }
        }
        else {
            this.userPincodeError = false;
            check1 = false;
        }

        console.log('userOtpError = ' + this.userOtpError);


        if (this.userOtpError == true && typeof this.userOtpError != 'undefined') {
            const loading = await this.loadingCtrl.create({
                message: 'Please wait...'
            });

            await loading.present();
            this.storage.get('groupKeyTabsy').then(res => {
                this.groupKeyTabsy = res;
                console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

                this.userProvider.getRegister(this.groupKeyTabsy,
                    this.registerData.userID,
                    this.registerData.userPassword,
                    this.registerData.name,
                    this.registerData.userMobile,
                    this.registerData.userAltMobileNo,
                    this.registerData.userMobile,
                    this.registerData.userAddress1,
                    this.registerData.userAddress2,
                    this.registerData.userCity,
                    this.registerData.fsslicno,
                    this.registerData.gstno,
                    this.registerData.panno,
                    this.registerData.userPincode,
                    this.registerData.userInviteCode,
                    this.base64Image).then(res => {
                    this.data = res;
                    if (this.data.ReturnMessage == 'User has been successfully created.') {
                        this.storage.set('userInfo', this.data);
                        this.storage.set('userID', this.data.UserId);
                        this.storage.set('ProfileImage', this.utilityProvider.apiUrl + this.data.ImageUrl);
                        this.storage.set('groupKeyTabsy', this.registerData.groupKey);
                        this.storage.set('username', this.registerData.userID);
                        this.storage.set('password', this.registerData.userPassword);
                        console.log(res);

                        this.navCtrl.navigateRoot(['/sign-in']).then(() => {
                       loading.dismiss();
                        });
                    } else {
                        loading.dismiss();
                        console.log(this.data.ReturnMessage);
                        if (this.data.ReturnMessage == 'Invalid object name \'PromoCode\'.' && this.userOtpError == true) {
                            this.presentToast(this.data.ReturnMessage);
                        } else {
                            this.userOtpError = false;
                            this.presentToast(this.data.ReturnMessage);
                        }


                    }
                });
            });


        } else {
            this.presentToast('Please enter CODE received on your registered EmailID.');
        }
    }

    onChange(listIndex)
    {
        console.log("---list---"+JSON.stringify(this.stateList[listIndex]));
        this.stateDetail = this.stateList[listIndex];
        this.stateCode = this.stateList[listIndex].Value;
        console.log("--state code  = "+this.stateList[listIndex].Value);

    }


    async sendCODE() {
        let check = true;
        if (this.registerData.userPassword.length >= 3) {
            this.userPasswordError = true;
        } else {
            this.userPasswordError = false;
            check = false;
        }
        if (this.registerData.name.length >= 2) {
            this.nameError = true;
        } else {
            this.nameError = false;
            check = false;
        }

        if (this.registerData.userAddress1.length >= 2) {
            this.add1Error = true;
        } else {
            this.add1Error = false;
            check = false;
        }

        if (this.registerData.userCity.length >= 2) {
            this.cityError = true;
        } else {
            this.cityError = false;
            check = false;
        }


        if (this.registerData.userID.length > 0) {
            this.emailIdError = true;
        } else {
            this.emailIdError = false;
            check = false;
        }

        if (this.registerData.userPincode.length >= 2) {
            this.userPincodeError = true;
        } else {
            this.userPincodeError = false;
            check = false;
        }

        console.log(this.registerData.userID);
        if (typeof this.registerData.userID == 'undefined') {
            await this.presentToast('EmailID cannot be blank');
        } else {
            if (check == true) {
                this.visiblity = true;

                this.randomNo = Math.floor(1000 + Math.random() * 9000);
                console.log(this.randomNo);
                this.oldrandomNo = this.randomNo;

                await this.storage.set('oldRandomNo', this.oldrandomNo);

                this.smsText = 'Your OTP for Mobile Verification is ' + this.randomNo;
                console.log(this.smsText);

                await this.storage.get('groupKeyTabsy').then(res => {
                    this.groupKeyTabsy = res;
                    console.log('groupKeyTabsy---- ' + this.groupKeyTabsy);

                    this.userProvider.CustomerRequest_SendEmailForCode(this.groupKeyTabsy, this.registerData.userID, this.randomNo).then(async res => {
                        this.smsData = res;
                        if (this.smsData.Status == 1) {
                            this.visiblity = true;

                            console.log(' OTP Message ----RS---- ' + this.randomNo);
                            this.enterOTP = this.randomNo;
                            console.log(' OTP  ----RS---- ' + this.enterOTP);
                            await this.presentToast('CODE sent successfully to your EmaiID.');

                            this.visiblity = true;
                            this.check = true;

                        } else if (this.smsData.Status == -99) {
                            this.visiblity = false;
                            this.emailIdError = false;
                            this.presentToast('Please Enter Valid EmailID');
                        } else {
                            console.log(' OTP not Sent ----RS---- ');
                        }

                        console.log(' Retrieve api SendEmaiID DATA ----RS---- ' + JSON.stringify(this.smsData));

                    });
                });
            } else {
                await this.presentToast('Please fill mandatory fields');
            }

        }
    }


    public getState() {
        this.addressProvider.getStateCode().then(res=>{
            this.stateList = res;
            console.log("State list = "+JSON.stringify(this.stateList));

        });
    }


    MapAddress() {
        this.navCtrl.navigateForward('/map');
    }
}
