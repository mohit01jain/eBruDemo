import { Injectable } from '@angular/core';
import {UtilityService} from '../../Providers/utility/utility.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(public utilityProvider: UtilityService, public http: HttpClient) { }

  getRootDisplaySection() {
    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      data.push(crcnObj);
      data.push(credentialsObj)
      console.log("----------"+JSON.stringify(data));

      this.http.post(this.utilityProvider.apiUrl+'api/DisplaySections/ListForMobile', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})

          }
      ).subscribe(data => {
        console.log('----------'+data);
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }
  getRootDisplaySliders() {
    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      data.push(crcnObj);
      console.log("---root slider data inserted------"+JSON.stringify(data));

      this.http.post(this.utilityProvider.apiUrl+'api/CustomerOnline/Retrive_CompanyParameterForAppByCompId', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})

          }
      ).subscribe(data => {
        // console.log('----------'+JSON.stringify(data));
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }
  getChildDisplaySection(DisplaySectionId){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.DisplaySectionId = DisplaySectionId;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("inserted data = "+JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl+'api/DisplaySections/ListForMobile', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})

          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  getSearchedItem(SearchValue){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();

      credentialsObj.Name = SearchValue;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("--Inserted String---"+JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl+'api/Items/RetriveByItemPartialName', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})

          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  // getItemList(searchStr,searchBy,page,pageSize){
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json' );
  //
  //   return new Promise((resolve,reject) => {
  //     var data: any = new Array();
  //     var crcnObj : any = new Object();
  //     crcnObj.CrCn = this.utilityProvider.CrCn;
  //     crcnObj.CurrentCompID = this.utilityProvider.CompId;
  //     var credentialsObj : any = new Object();
  //     credentialsObj.DisplaySectionId = "00000000-0000-0000-0000-000000000000";
  //     credentialsObj.SearchString = searchStr;
  //     credentialsObj.SearchBy = searchBy;
  //     credentialsObj.PageNumber = page;
  //     credentialsObj.PageSize = pageSize;
  //     data.push(crcnObj);
  //     data.push(credentialsObj);
  //     console.log("data inserted = "+JSON.stringify(data));
  //     this.http.post(this.utilityProvider.apiUrl+'api/Items/RetriveByDisplaySectionID', JSON.stringify(data), {
  //         headers: new HttpHeaders({'Content-Type': 'application/json','Cache-Control': 'no-cache'})
  //
  //       }
  //     ).subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(reject);
  //     });
  //   });
  // }

  getItemList(DisplaySectionId,RateCategory){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.DisplaySectionId = DisplaySectionId;
      credentialsObj.RateCategory=RateCategory;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("data inserted = "+JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl+'api/Items/RetriveByDisplaySectionID', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})

          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });
  }

  getItemListBySearch(searchStr,searchBy,page,pageSize,RateCategory){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.DisplaySectionId = "00000000-0000-0000-0000-000000000000";
      credentialsObj.SearchString = searchStr;
      credentialsObj.SearchBy = searchBy;
      credentialsObj.PageNumber = page;
      credentialsObj.PageSize = pageSize;
      credentialsObj.RateCategory=RateCategory;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log("data inserted = "+JSON.stringify(data));
      this.http.post(this.utilityProvider.apiUrl+'api/Items/RetriveByDisplaySectionID', JSON.stringify(data), {
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
