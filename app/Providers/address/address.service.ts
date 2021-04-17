import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {UtilityService} from '../../Providers/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(public http: HttpClient,public  userProvider:UserService ,public utilityProvider:UtilityService) { }

  getSavedAddresses(acntId){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.CompId = this.utilityProvider.CompId;
      credentialsObj.AccountId = acntId;
      credentialsObj.ContactPerson = null;
      credentialsObj.Dig = null;
      credentialsObj.Add1 = null;
      credentialsObj.Add2 = null;
      credentialsObj.Add3 = null;
      credentialsObj.City = null;
      credentialsObj.State = null;
      credentialsObj.StateName = null;
      credentialsObj.StateCode = 0;
      credentialsObj.Zip = null;
      credentialsObj.MobileNo = null;
      credentialsObj.AlternateNumber = null;
      credentialsObj.GSTNO = null;
      credentialsObj.Distance = 0;
      credentialsObj.EmailId = null;
      credentialsObj.ReturnCode = "0";
      credentialsObj.ReturnMessage = "";
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('Save Order : ' + JSON.stringify(data) );
      // api/ShippingAddress/Retrieve

      this.http.post(this.utilityProvider.apiUrl+'api/ShippingAddress/RetrieveShippingAddressForDll', JSON.stringify( data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("--save Order--"+JSON.stringify(data));
      }, err => {
        console.log(reject);
      });
    });

  }

  savedAddress(shippingId,acntId,contactPerson,dig,add1,add2,add3,city,State,StateName,StateCode,pincode,mobile,altMobile,gstno,distance,emailId,status){
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json' );
    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.ShippingId = shippingId; //"00000000-0000-0000-0000-000000000000"
      credentialsObj.CompId = this.utilityProvider.CompId;
      credentialsObj.AccountId = acntId;
      credentialsObj.ContactPerson = contactPerson;
      credentialsObj.Dig = dig;
      credentialsObj.Add1 = add1;
      credentialsObj.Add2 = add2;
      credentialsObj.Add3 = add3;
      credentialsObj.City = city ;
      credentialsObj.State = State;
      credentialsObj.StateName = StateName;
      credentialsObj.StateCode = StateCode;
      credentialsObj.Zip = pincode;
      credentialsObj.MobileNo = mobile;
      credentialsObj.AlternateNumber = altMobile;
      credentialsObj.GSTNO = gstno;
      credentialsObj.Distance = distance;
      credentialsObj.EmailId = emailId;
      credentialsObj.IsActive = status;
      credentialsObj.ReturnCode = "0";
      credentialsObj.ReturnMessage = "";
      data.push(crcnObj);
      data.push(credentialsObj);

      if (data.length != null ){
        console.log("array length = "+ data.length);
        console.log("data inserted = "+JSON.stringify(data));

        return this.http.post(this.utilityProvider.apiUrl+'api/ShippingAddress/Save', data, {
              headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
            }
        ).subscribe(data => {
          resolve(data);
          console.log("Return Data Is This"+JSON.stringify(data));
        }, err => {
          console.log("this is error"+JSON.stringify(err));
        });
      }

    });
  }

  getStateCode(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();

      crcnObj.CrCn = 'S4OgObj0qpYPSFsluHPv2C0AOmWD9H3eGiGpLOqgKtiKTad4ASQ512z6xipMn8BjGQTGFjoIoJY/ZZ9se68OOj1ZyN3FOISOOeID2+FMk+gt9hWcCD5TCTkhZRJJgjlo';

      crcnObj.CurrentCompID = '908ab974-13bb-43bc-90b8-696bb64741b9';

      var credentialsObj : any = new Object();
      credentialsObj.FieldCode = 0;
      credentialsObj.FieldCodeId = "00000000-0000-0000-0000-000000000000";
      credentialsObj.FieldGroupId = 1;
      credentialsObj.FieldShort = null;
      credentialsObj.OrderByText = true;
      credentialsObj.Text = null;
      credentialsObj.Value = 0;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('Save Order : ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/FieldGroupCode/FieldGroupCodeList', data, {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("--save Order--"+JSON.stringify(data));
      }, err => {
        console.log(reject);
      });
    });


  }

}
