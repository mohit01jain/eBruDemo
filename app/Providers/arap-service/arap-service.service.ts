import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilityService} from '../../Providers/utility/utility.service';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ArapServiceService {

  public currentDate:any;


  constructor(public http: HttpClient,public utilityProvider:UtilityService,public datepipe: DatePipe) {
    this.currentDate = this.datepipe.transform(this.utilityProvider.myDate, 'yyyy-MM-ddTHH:mm:ss');
    console.log('----latest date ---' + this.utilityProvider.currentdateTime);
    console.log('Hello ArapServiceProvider Provider');
  }


  RetrieveArapRecievablePayable(AcntId,pageNo,str,pageSize){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.AcntId=AcntId;
      credentialsObj.AcntName=str;
      credentialsObj.Cdate="2018-10-17",
          credentialsObj.pageIndex=pageNo;
      credentialsObj.pageSize=pageSize;
      credentialsObj.RecordCount=0;
      credentialsObj.ClosingTotal=0;
      credentialsObj.Type=1;
      credentialsObj.ArapRecievablePayableModel=[];
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/CustomerRegistration/RetrieveArapRecievablePayable', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  RetrieveARAPGetArapRefnDetails(AcntId,RefNo,IdNo){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialArray :any = new Array();
      var credentialsObj : any = new Object();
      credentialsObj.AcntName = "";
      credentialsObj.AcntId=AcntId;
      credentialsObj.AtrnDate = "2018-10-18";
      credentialsObj.ArapRefn = RefNo;
      credentialsObj.AtrnIdNo=IdNo;
      credentialsObj.AtrnVNo="";
      credentialsObj.AtrnType=1;
      credentialsObj.AtrnTypeCaption="";
      credentialsObj.ArapReceivableAmt=0;
      credentialsObj.ArapPayableAmt=0;
      credentialsObj.Arap_RType=1;
      credentialsObj.ArapAdjustedId="";
      credentialsObj.I_AdjustedRefn="";
      credentialArray.push(credentialsObj);
      data.push(crcnObj);
      data.push(credentialArray);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/CustomerRegistration/RetrieveARAPGetArapRefnDetails', JSON.stringify(data), {
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
