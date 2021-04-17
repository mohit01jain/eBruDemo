import { Injectable } from '@angular/core';
import {UtilityService} from '../../Providers/utility/utility.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartyDetailService {

  constructor(public utilityProvider: UtilityService, public http: HttpClient) { }

  selectParty(pageSize,pageNo,searchStr,type){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.PageSize = pageSize;
      credentialsObj.PageNo = pageNo;
      credentialsObj.searchString = searchStr;
      credentialsObj.searchBy = type;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('Select party : ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/Accounts/PartyAccountsList', JSON.stringify(data), {
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

  getPartyWiseOrderList(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.CompId = this.utilityProvider.CompId;
      credentialsObj.AtrnYear = 0;
      credentialsObj.NoOfRecordsOnPage = 10;
      credentialsObj.pageNo = 1;
      credentialsObj.totalRows = 0;
      credentialsObj.TotalOrders = 0;
      credentialsObj.TotalNetAmount = 0;
      credentialsObj.TotalNetAmountString = "";
      credentialsObj.OrderPartyWiseViewList = [];

      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('Select party : ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/InvViews/VwOrderPartyWiseView', JSON.stringify(data), {
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

}
