import {Component, OnInit} from '@angular/core';
import {UserService} from '../Providers/user/user.service';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {UtilityService} from '../Providers/utility/utility.service';
import {  MenuController } from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-login-with-option',
    templateUrl: './login-with-option.page.html',
    styleUrls: ['./login-with-option.page.scss'],
})
export class LoginWithOptionPage implements OnInit {
    public appVersionNumber: any;
    public getValidateData: any;
    public ReturnCode: any;
    public ReturnMessage: any;
    public groupKeyTabsy: any;
    private username: any;
    private groupKey: any;
    private password: any;
    private CrCn: any;
    private userInfo: any;
    loginData = {groupKey: '', userName: '', userPassword: ''};
    private data: any;

    constructor(public storage :Storage, public userProvider: UserService, public menuCtrl: MenuController, public navCtrl: NavController, public utilityProvider: UtilityService, public platform:Platform, private splashScreen: SplashScreen,public toastCtrl: ToastController ) {
        this.groupKeyTabsy= this.utilityProvider.groupKey;

        this.Authentication();


    }

    Authentication()
    {
       /* this.storage.get('groupKey').then((groupKey) => {
            this.groupKey = groupKey;
        });*/

        this.storage.get('CrCn').then((CrCn) => {
            this.CrCn = CrCn;
            if(this.CrCn !=null){
/*
                this.userProvider.getUsers(this.groupKeyTabsy, this.loginData.userName.toLowerCase(), this.loginData.userPassword, this.appVersionNumber).then(res => {
                    this.data = res;*/
                this.storage.get('userInfo').then((userInfo) => {
                    this.userInfo = userInfo;
                    this.utilityProvider.CompId = this.userInfo.CompId;
                    this.utilityProvider.CrCn = this.userInfo.crCn;
                    this.utilityProvider.userType = this.userInfo.UserType;
                    if (this.utilityProvider.userType == 5) {

                        this.navCtrl.navigateRoot(['/home']);
                    } else if (this.utilityProvider.userType == 2) {
                        this.navCtrl.navigateRoot(['/admin-dashboard']);
                    }
                });
            }
        });

       /* this.storage.get('password').then((password) => {
            this.password = password;
        });*/
    }



    ionViewDidEnter() {
        setTimeout(() => {
            if(this.platform.is('cordova')  || this.platform.is('android')){
                this.splashScreen.hide();
            }
        }, 30);}

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    gotoRegister() {
        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
            this.getValidateData = res;
            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
            this.ReturnCode = this.getValidateData.ReturnCode;
            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
            this.ReturnMessage = this.getValidateData.ReturnMessage;
            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {
                this.navCtrl.navigateForward(['/register']);
                if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
                    console.log(' Not in Register ----RS---');
                } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
                    console.log(' Not in Register 2 else if -99----RS---');
                }
            } else {
                this.presentToast('UPDATE APP Please Update Application.');
                //console.log('UPDATE APP Please Update Application');
            }
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

    gotoSingIn() {
        this.userProvider.getValidateVerion(this.groupKeyTabsy, this.appVersionNumber).then(res => {
            this.getValidateData = res;
            console.log(' Register Validation Data----RS---' + JSON.stringify(this.getValidateData));
            this.ReturnCode = this.getValidateData.ReturnCode;
            console.log(' Register Validation ReturnCode--RS-- ' + JSON.stringify(this.ReturnCode));
            this.ReturnMessage = this.getValidateData.ReturnMessage;
            console.log(' Register Validation ReturnMessage--RS-- ' + JSON.stringify(this.ReturnMessage));
            if (this.getValidateData.ReturnMessage == 'Success' && this.getValidateData.ReturnCode == 0) {
                this.navCtrl.navigateForward(['/sign-in']);
                if (this.getValidateData.ReturnMessage == 'New Update for the APP is available' && this.getValidateData.ReturnCode == 1) {
                    console.log(' Not in Register ----RS---');
                } else if (this.getValidateData.ReturnMessage == 'Index was out of range. Must be non-negative and less than the size of the collection.\r\nParameter name: index' && this.getValidateData.ReturnCode == -99) {
                    console.log(' Not in Register 2 else if -99----RS---');
                }
            } else {
                this.presentToast('UPDATE APP Please Update Application.');
            }
        });
    }


}
