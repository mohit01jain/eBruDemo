import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilityService} from '../../Providers/utility/utility.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class LedgerServiceService {

  constructor(public http: HttpClient,public utilityProvider:UtilityService) {

    console.log('Hello LedgerServiceProvider Provider');

  }

  RetrieveLedgerAccountDetails(pageIndex,pageSize,AcntId)   {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.pageIndex=pageIndex;
      credentialsObj.pageSize=pageSize;
      credentialsObj.RecordCount=0;
      credentialsObj.AcntId=AcntId;
      credentialsObj.AcntName="";
      credentialsObj.StartDate="2019-04-01";
      credentialsObj.EndDate="2019-11-22";
      credentialsObj.OpeningBalance=0;
      credentialsObj.TotalDr=0;
      credentialsObj.TotalCr=0;
      credentialsObj.ClosingBalance=0;
      credentialsObj.LedgerAccountDetails=[];
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/CustomerRegistration/RetrieveLedgerAccountDetails', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  RetrieveLedgerAccountList(pageIndex, pageSize, chkNonZeroBalAcnt, Acntname)   {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.pageIndex=pageIndex;
      credentialsObj.pageSize=pageSize;


      credentialsObj.chkMovedAcnt = false;
      credentialsObj.chkNonZeroBalAcnt= chkNonZeroBalAcnt;


      credentialsObj.RecordCount=0;
      //credentialsObj.AcntId=AcntId;
      credentialsObj.Acntname=Acntname;
      credentialsObj.OnlyArapAcnt="false";
      credentialsObj.OpeningBalance=0;
      credentialsObj.TotalDr=0;
      credentialsObj.TotalCr=0;
      credentialsObj.ClosingBalance=0;
      credentialsObj.LedgerAccountModel=[];
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
        this.http.post(this.utilityProvider.apiUrl+'api/CustomerRegistration/RetrieveLedgerAccountList', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }



}
