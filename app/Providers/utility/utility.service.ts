import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public CrCn: any;
  public CompId : any;
  public CurrentCompID : any;
  public currentdateTime : any;
  myDate: String = new Date().toISOString();
  CtrlCrcn = 'fg+sKUg11sBGS+mFbN3EcgSFf6TY0v5WH0t3wsyuLmHAxxf/Q6cm7axiE9Dmx4p1';
  apiUrl = 'https://api.tabserp.com/';
  public groupKey = 'BHKGroupcp';
  public userType : any;

  constructor(public http: HttpClient) {
    console.log('Hello UtilityProvider Provider');

  }
}
