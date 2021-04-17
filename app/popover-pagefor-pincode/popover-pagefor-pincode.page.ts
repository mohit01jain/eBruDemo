import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {User} from 'ionic';
import {UserService} from '../Providers/user/user.service';


@Component({
  selector: 'app-popover-pagefor-pincode',
  templateUrl: './popover-pagefor-pincode.page.html',
  styleUrls: ['./popover-pagefor-pincode.page.scss'],
})
export class PopoverPageforPincodePage implements OnInit {
  public users: any[] = [
     '302000',
     '302001',
     '302002',
     '302003',
     '302004',
  ];
  list: any;
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
    userInviteCode: ''
  };
  public groupKeyTabsy: any;
  public data: any;
  public base64Image: string = '';
  private userPincode: any;
  private userPassword: any;
  private userAltMobileNo: any;
  private userID: any;
  private name: any;
  private userMobile: any;
  private userAddress1: any;
  private userAddress2: any;
  private userCity: any;
  private userInviteCode: any;
  private userpincodethispage: any;
  private PincodeResult: any=[];
  private PincodePopoverPage: any=[];
  private Pincode: any;
  private fsslicno: any;
  private gstno: any;
  private panno: any;
  private i: number;
  private AcntId: any;
  
  constructor(public navCtrl: NavController, public activatedRoute : ActivatedRoute, public userProvider : UserService) {

    this.groupKeyTabsy = this.activatedRoute.snapshot.paramMap.get("groupKeyTabsy");
    this.userID = this.activatedRoute.snapshot.paramMap.get("userID");
    this.userPassword = this.activatedRoute.snapshot.paramMap.get("userPassword");
    this.name = this.activatedRoute.snapshot.paramMap.get("name");
    this.userMobile = this.activatedRoute.snapshot.paramMap.get("userMobile");
    this.userAltMobileNo = this.activatedRoute.snapshot.paramMap.get("userAltMobileNo");
    this.userAddress1 = this.activatedRoute.snapshot.paramMap.get("userAddress1");
    this.userAddress2 = this.activatedRoute.snapshot.paramMap.get("userAddress2");
    this.userCity = this.activatedRoute.snapshot.paramMap.get("userCity");
    this.fsslicno = this.activatedRoute.snapshot.paramMap.get("fsslicno");
    this.gstno = this.activatedRoute.snapshot.paramMap.get("gstno");
    this.userInviteCode = this.activatedRoute.snapshot.paramMap.get("userInviteCode");
    this.base64Image = this.activatedRoute.snapshot.paramMap.get("base64Image");
    this.AcntId = this.activatedRoute.snapshot.paramMap.get("AcntId");

    this.Pincode="27100";
    this.PincodePopulation();

  }

  ngOnInit() {
  }

  onChange(list) {

    console.log("---list---" + JSON.stringify(this.users[list]));
    this.userpincodethispage = list;

    this.navCtrl.navigateRoot(['/pincode-according-shipping-address',
      {
        "userPincode": this.userpincodethispage,
        "groupKeyTabsy": this.groupKeyTabsy,
        "userID": this.userID,
        "userPassword": this.userPassword,
        "name": this.name,
        "userMobile": this.userMobile,
        "userAltMobileNo": this.userAltMobileNo,
        "userAddress1": this.userAddress1,
        "userAddress2": this.userAddress2,
        "userCity": this.userCity,
        "fsslicno": this.fsslicno,
        "gstno": this.gstno,
        "panno": this.panno,
        "userInviteCode": this.userInviteCode,
        "base64Image": this.base64Image,
        "AcntId" :this.AcntId,
      }]);

  }


  PincodePopulation()
  {
    this.userProvider.getPopulatePincode(this.Pincode).then(data => {

      this.PincodeResult = data;
      console.log("Pincode Result=" + JSON.stringify(this.PincodeResult));

      for(this.i=0;this.i<=this.PincodeResult.length;this.i++)
      {
        this.PincodePopoverPage[this.i] = this.PincodeResult[this.i].Pincode;

      }

    })
  }







}
