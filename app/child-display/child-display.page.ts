import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Events, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {ProductServiceService} from '../Providers/product-service/product-service.service';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import {UserService} from '../Providers/user/user.service';
import {UtilityService} from '../Providers/utility/utility.service';


@Component({
  selector: 'app-child-display',
  templateUrl: './child-display.page.html',
  styleUrls: ['./child-display.page.scss'],
})
export class ChildDisplayPage  {

  public headerTitle:any;
  public DisplayData:any;
  public slideDATA:any=[];
  public addData:any;
  public userName:any;
  tooltipEvent: 'click' | 'press' = 'click';
  showArrow: boolean = true;
  duration: number = 2000;
  public companyName:any;
  public itemCount:any;
  public totalAmount:any;
  public totalProductAmount : any;
  public total:any;
  public childDisplayList : any =[];
  public childDisplayVisible:any;
  active: boolean;
  public displaySectionId : any;
  public sliderImageUrlList: any=[];
  public Slider1Url: any;
  public object;
  public object1;
  spinner: boolean;
  public RefreshCustomerRegistrationData: any = [];
  public userInfo: any;
  public status: any;


  constructor(public userProvider: UserService, public navCtrl: NavController,public events: Events,
              public productServiceProvider : ProductServiceService,public storage:Storage,private toastCtrl: ToastController,
              public loadingCtrl: LoadingController, public utilityProvider: UtilityService,public platform: Platform, public router:Router, public activatedRoute: ActivatedRoute) {



    this.active=false;
    this.displaySectionId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("display section id ="+this.displaySectionId);

    this.slideDATA = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    console.log("slideDATA detail =------ "+(this.slideDATA));

    this.sliderImageUrlList= this.slideDATA;
    console.log("anil is heare-----image list----"+(this.sliderImageUrlList));


    this.headerTitle=this.activatedRoute.snapshot.paramMap.get('name');
    this.setDisplaySection(this.activatedRoute.snapshot.paramMap.get('id'));


    events.subscribe('ItemLength', (isShow) => {
      this.itemCount=isShow;
      console.log(this.itemCount);

    });
    events.subscribe('totalAmount', (isShow) => {
      this.total=isShow;
      console.log(this.itemCount);

    });
    this.storage.get("userName").then(res=>{
      this.userName=res;
      console.log("our username = "+ this.userName)
    });

    storage.get('totalProductAmount').then((isLoginResult)=> {
      console.log(isLoginResult);
      this.totalProductAmount=isLoginResult;
    });

    this.storage.get('itemnCount').then((list) => {
      this.itemCount = list;
      // this.quantities=list;
      console.log('---quantities---' + this.itemCount);
      if (this.itemCount == null || this.itemCount == 0){
        this.totalAmount = 0;
      }else {
        this.totalAmount = this.total;
      }
    });

    this.storage.get('companyName').then(res=>{
      this.companyName = res;
    });

    this.storage.get('addData').then((list) => {

      this.addData =list;
      // if(this.addData.length >= 0){
      //   this.itemCount=this.addData.length;
      //   console.log(this.itemCount);
      // }

    });
  }

  ionViewDidLoad() {
    // this.initializeBackButtonCustomHandler();
    console.log('ionViewDidLoad ChildDisplayPage');
  }
  logout() {
    // Remove API token
    this.utilityProvider.CrCn = null;
    this.utilityProvider.CompId = null;
    this.storage.set('CrCn',this.utilityProvider.CrCn);
    this.storage.set('CompId',this.utilityProvider.CompId);
    this.navCtrl.navigateRoot(['/login-with-option']);
  }


  openSearchPage(){
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
            this.navCtrl.navigateForward(['/search-item']);
          }
        });
      }
    });


  }

  // ionViewWillLeave() {
  //   // Unregister the custom back button action for this page
  //   this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  // }
  //
  // initializeBackButtonCustomHandler(): void {
  //   this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=> {
  //     this.customHandleBackButton();
  //    }, 10);
  // }
  customHandleBackButton(){
    // Change page so we can test hardware backbutton changes
    this.navCtrl.navigateForward(['/home']);
  }

  async setDisplaySection(id){
    console.log(id);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.productServiceProvider.getChildDisplaySection(id).then(res => {
      this.DisplayData = res;
      if (id == "5d00864a-2a2a-489f-8dae-a2eb0f62f0dd") {
        this.childDisplayVisible = "women";
      }else {
        this.childDisplayVisible = "men";
      }
      console.log(res);
      loading.dismiss();
    })
  }



  itemSelect(index,data){

    this.storage.set("ChildData",data);
    this.productServiceProvider.getChildDisplaySection(data.ID).then(res => {
      if (res == ""){


        this.navCtrl.navigateForward(['/item-list', {name: data.DisplaySectionName, id:data.ID}] );
      } else {
        for (var i=0;i<this.DisplayData.length;i++){
          if (i == index){
            this.active = !this.active;
            this.DisplayData[i].open = !this.DisplayData[i].open;
            this.childDisplayList = res;
            console.log(JSON.stringify(this.childDisplayList));
          } else {
            this.active = false;
          }
        }

      }
    });
  }
  gotoCartPage(){
    if(this.itemCount>0){
      this.navCtrl.navigateForward(['/cart',{page:'itemList'}]);
    }
    else{
      this.presentToast('The cart is empty. Please add items to cart.');
    }
  }
  // async presentToast() {
  //   const toast = await this.toastCtrl.create({
  //     message: 'The cart is empty. Please add items to cart.',
  //     duration: 3000,
  //     position: 'bottom'
  //   });
  //
  //  /* toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });*/
  //
  //   toast.present();
  // }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });
    await toast.present();
  }
  // gotoSearchPage(){
  //   this.navCtrl.push(SearchItemPage);
  // }
  getItems($event: CustomEvent<any>) {

  }

  consoleItem()
{
  console.log('Clicked')
}
}
