import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilityService} from '../../Providers/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getItemCount: any = [];


  constructor(public utilityProvider: UtilityService, public http: HttpClient) {

    console.log('Hello UserProvider Provider');
    this.getItemCount = [];

  }



  getUsers(groupKey, userId, password, appVersionNumber) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const data: any = new Array();
      const crcnObj: any = new Object();


      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;

      const credentialsObj: any = new Object();
      credentialsObj.UserId = userId;
      credentialsObj.Password = password;
      // credentialsObj.CurrentVersion = appVersionNumber;
      credentialsObj.CurrentVersion = '1.0.18';
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("Data inserted = " + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/Retrieve', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  getValidateVerion(groupKey, appVersionNumber) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      let data: any = new Array();
      let crcnObj: any = new Object();

      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;
      let credentialsObj: any = new Object();
      // credentialsObj.CurrentVersion = appVersionNumber;
      credentialsObj.CurrentVersion = '1.0.0';
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("----Validate Data inserted = " + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/ValidateVerion', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  apiSendSmS(groupKey, userId, msg) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      var data: any = new Array();

      var crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;

      var credentialsObj: any = new Object();
      credentialsObj.UserId = userId;
      credentialsObj.Message = msg;

      data.push(crcnObj);
      data.push(credentialsObj);
      console.log(" -------- Send SMS Data inserted = " + JSON.stringify(data));
      // this.http.post(this.utilityProvider.apiUrl2+'api/CustomerRegistration/GetRegistrationOTP', JSON.stringify(data), {
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/SendSMS', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  CustomerRequest_SendEmailForCode(groupKey, userId, msg) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      var data: any = new Array();

      var crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;

      var credentialsObj: any = new Object();
      credentialsObj.UserId = userId;
      credentialsObj.Message = msg;

      data.push(crcnObj);
      data.push(credentialsObj);
      console.log(" -------- Send Email Data inserted = " + JSON.stringify(data));
      // this.http.post(this.utilityProvider.apiUrl2+'api/CustomerRegistration/GetRegistrationOTP', JSON.stringify(data), {
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRequest/CustomerRequest_SendEmailForCode', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  updatePassword(groupKey, userId, userPassword) {
    console.log(userId);
    // var arr = userId.split(':');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      var data: any = new Array();

      var crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;

      var credentialsObj: any = new Object();
      credentialsObj.UserId = userId;
      credentialsObj.Password = userPassword;

      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("----UpdatePassword Data inserted = " + JSON.stringify(data));

      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/UpdatePassword', JSON.stringify(data), {
        headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  validateGroupKey(groupKey) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      var data: any = new Array();
      var crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;
      data.push(crcnObj);
      console.log(" validateGroupKey Data inserted = " + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/ValidateGroupKey', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  getRegister(groupKey, userId, password, name, userMobile, userAltMobileNo, emailID, userAddress1, userAddress2, userCity, fsslicno, gstno, panno , userPincode, userInviteCode, base64Image) {
    console.log('-------', base64Image)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      var data: any = new Array();
      var crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.CurrentCompID ="908ab974-13bb-43bc-90b8-696bb64741b9"; /*this.utilityProvider.CompId;*/
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      // crcnObj.GroupKey = groupKey;
      var credentialsObj: any = new Object();
      credentialsObj.UserId = userId;
      // credentialsObj.UserId = userMobile;
      credentialsObj.Password = password;
      credentialsObj.Name = name;
      credentialsObj.MobileNo = userMobile;
      credentialsObj.AlternateNumber = userAltMobileNo;
      credentialsObj.AreaName = '';
      credentialsObj.SponsorCode = userInviteCode;
      credentialsObj.Address1 = userAddress1;
      credentialsObj.Address2 = userAddress2;
      credentialsObj.City = userCity;
      credentialsObj.FoodLicNo = fsslicno;
      credentialsObj.GSTNO = gstno;
      credentialsObj.PAN = panno;
      credentialsObj.CollectPayment = false;
      credentialsObj.Email = emailID;
      credentialsObj.ImageData = base64Image;
      credentialsObj.Pincode = userPincode;
      credentialsObj.IsActive = false;
      credentialsObj.LastOrderStatus = 0;
      credentialsObj.ReturnCode = 0;
      credentialsObj.Status = 0;
      credentialsObj.UserType = 5;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data));

      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/Create', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  getBranchList() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      var data: any = new Array();
      var crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CtrlCrcn;
      crcnObj.GroupKey = this.utilityProvider.groupKey;
      data.push(crcnObj);
      console.log("Data inserted = " + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/GetBranchList', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  getUpdateProfile(cID, userId, userName, userMobile, userEmail, userAddress1, userAddress2, userCity, userPincode, imagePath,
                   cContactPersonName, cContactPersonEMailID, cContactPersonMobileNo, cFoodLicNo, cGSTNO, cPAN) {
    console.log('-------', imagePath);


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const data: any = new Array();
      const crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      const credentialsObj: any = new Object();
      credentialsObj.ID = cID;
      credentialsObj.UserId = userId;
      credentialsObj.Name = userName;
      credentialsObj.MobileNo = userMobile;
      credentialsObj.AlternateNumber = '';
      credentialsObj.AreaName = '';
      credentialsObj.SponsorCode = '';
      credentialsObj.Address1 = userAddress1;
      credentialsObj.Address2 = userAddress2;
      credentialsObj.City = userCity;
      credentialsObj.CollectPayment = false;
      credentialsObj.Email = userEmail;
      credentialsObj.ImageData = imagePath;
      credentialsObj.Pincode = userPincode;
      credentialsObj.IsActive = false;
      credentialsObj.LastOrderStatus = 0;
      credentialsObj.ReturnCode = 0;
      credentialsObj.Status = 0;
      credentialsObj.UserType = 0;
      credentialsObj.ContactPersonName = cContactPersonName;
      credentialsObj.ContactPersonEMailID = cContactPersonEMailID;
      credentialsObj.ContactPersonMobileNo = cContactPersonMobileNo;
      credentialsObj.FoodLicNo = cFoodLicNo;
      credentialsObj.GSTNo = cGSTNO;
      credentialsObj.PAN = cPAN;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration Insert Update DATA -RS-: ' + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/Update', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("----saved profile result----- " + JSON.stringify(data));
      }, err => {
        console.log(reject);
      });
    });


  }


  getPartialUpdate(cID, userId, userName, userMobile, userEmail, userAddress1, userAddress2, userCity, userPincode, imagePath,
                   cContactPersonName, cContactPersonEMailID, cContactPersonMobileNo, cFoodLicNo, cGSTNO, cPAN) {
    console.log('-------', imagePath);


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const data: any = new Array();
      const crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      const credentialsObj: any = new Object();
      credentialsObj.ID = cID;
      credentialsObj.UserId = userId;
      credentialsObj.Name = userName;
      credentialsObj.MobileNo = userMobile;
      credentialsObj.AlternateNumber = '';
      credentialsObj.AreaName = '';
      credentialsObj.SponsorCode = '';
      credentialsObj.Address1 = userAddress1;
      credentialsObj.Address2 = userAddress2;
      credentialsObj.City = userCity;
      credentialsObj.CollectPayment = false;
      credentialsObj.Email = userEmail;
      credentialsObj.ImageData = imagePath;
      credentialsObj.Pincode = userPincode;
      credentialsObj.IsActive = false;
      credentialsObj.LastOrderStatus = 0;
      credentialsObj.ReturnCode = 0;
      credentialsObj.Status = 0;
      credentialsObj.UserType = 0;
      credentialsObj.ContactPersonName = cContactPersonName;
      credentialsObj.ContactPersonEMailID = cContactPersonEMailID;
      credentialsObj.ContactPersonMobileNo = cContactPersonMobileNo;
      credentialsObj.FoodLicNo = cFoodLicNo;
      credentialsObj.GSTNo = cGSTNO;
      credentialsObj.PAN = cPAN;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration Insert PartialUpdate DATA -RS-: ' + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/PartialUpdate', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("----saved profile result----- " + JSON.stringify(data));
      }, err => {
        console.log(reject);
      });
    });


  }

  getRegisteredUserList(pageNo, recordsCount, searchBy, strValue, fromDate, toDate) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const data: any = new Array();
      const crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      // crcnObj.CurrentCompID = this.utilityProvider.CompId;
      const credentialsObj: any = new Object();
      credentialsObj.CompId = this.utilityProvider.CompId;
      credentialsObj.PageIndex = pageNo;
      credentialsObj.NoOfRecordsOnPage = recordsCount;
      credentialsObj.totalRecords = '0';
      credentialsObj.SearchField = searchBy;
      credentialsObj.QueryString1 = strValue;
      credentialsObj.QueryString2 = '';
      credentialsObj.FromDate = fromDate;
      credentialsObj.UptoDate = toDate;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/CustomerRegistration_SearchList', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("----saved profile result----- " + JSON.stringify(data));
      }, err => {
        console.log(reject);
      });
    });
  }

  getUpdateStockQtyData(ItemsDetails) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const data: any = new Array();
      const crcnObj: any = new Object();

      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;

      var credentialsObj: any = new Object();
      credentialsObj = ItemsDetails;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log(" UpdateStockQty Data inserted = " + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/Cart/UpdateStockQty', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  getRefreshCustomerRegistrationData(CustomerDetails) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      var data: any = new Array();
      var crcnObj: any = new Object();

      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;

      var credentialsObj: any = new Object();
      credentialsObj = CustomerDetails;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log(" getRefreshCustomerRegistrationData Data inserted = " + JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl + 'api/CustomerRegistration/RefreshCustomerRegistrationData', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }


  getPopulatePincode(Pincode) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const data: any = new Array();
      const crcnObj: any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      const credentialsObj: any = new Object();

          credentialsObj.Pincode = Pincode;
          credentialsObj.Arya= "";
          credentialsObj.IsActive = 1;
          credentialsObj.CreatedBy = "00000000-0000-0000-0000-000000000000";
          credentialsObj.CreatedDate = "2019-12-09";
          credentialsObj.ModifiedBy = null;
          credentialsObj.ModifiedDate = null;

      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('Retrieved ' + JSON.stringify(data));
      this.http.post('https://api.tabserp.com/api/ShippingAryas/Retrieve', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*, 'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("----saved profile result----- " + JSON.stringify(data));
      }, err => {
        console.log(reject);
      });
    });


  }










}
