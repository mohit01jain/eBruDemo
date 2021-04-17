import { Injectable } from '@angular/core';
import {UtilityService} from '../../Providers/utility/utility.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public utilityProvider: UtilityService, public http: HttpClient,public userProvider: UserService) {

    console.log('Hello OrderProvider Provider');

    console.log('----utitlity----'+this.utilityProvider.apiUrl);

  }

  SetPlaceOrder(orderID,userId,AcntId,Items,customerRegistration,shippingAddress,totalAmount,deliveryChargeAmount,netAmount,overhead,flag,orderNarration,ourPaymentID,paymentID,paymentStatus,paymentMode){
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.ID = orderID;      //"00000000-0000-0000-0000-000000000000";
      credentialsObj.CompStateId = customerRegistration.State;
      credentialsObj.OrderType = 1;
      credentialsObj.AtrnYear = 0;
      // credentialsObj.AcntBookID = "51379d60-4282-4383-bde5-564b39755a3e";
      credentialsObj.AcntBookID = "6a749ac9-f93b-4784-aa9e-d218ed309d91";
      credentialsObj.TransactionIdNo = 0;
      credentialsObj.ActionFlag = flag;
      credentialsObj.RowVer =  "AAAAAAH9izM=";
      credentialsObj.OrderDeliveryDate = '2018-04-07T16:54:10';
      credentialsObj.DeliveryTimeSlotDesc = '11:00-12:00';
      credentialsObj.OrderAmt = totalAmount;
      credentialsObj.DeliveryCharges = deliveryChargeAmount;
      credentialsObj.OverheadAmt = overhead;
      credentialsObj.NetAmount = netAmount;
      credentialsObj.UserId = userId;
      credentialsObj.OurPaymentID=ourPaymentID;
      credentialsObj.PaymentID=paymentID;
      credentialsObj.PaymentStatus=paymentStatus;
      credentialsObj.PaymentMode=paymentMode;
      // credentialsObj.AcntId = AcntId;
      credentialsObj.CustomerRegistration = customerRegistration;
      credentialsObj.DeliveryAddressFlag = "0";
      var OrderDeliveryAddress : any = new Object();
      OrderDeliveryAddress.Address1 = customerRegistration.Address1;
      OrderDeliveryAddress.Address2 = customerRegistration.Address2;
      OrderDeliveryAddress.AreaName = customerRegistration.AreaName;
      OrderDeliveryAddress.City = customerRegistration.City;
      OrderDeliveryAddress.MobileNo = customerRegistration.MobileNo;
      OrderDeliveryAddress.Name = customerRegistration.Name;
      OrderDeliveryAddress.Pincode = customerRegistration.AreaCode;
      OrderDeliveryAddress.AreaCode = customerRegistration.AreaCode;
      credentialsObj.OrderDeliveryAddress = OrderDeliveryAddress;
      credentialsObj.ReturnCode = "0";
      credentialsObj.CompID = this.utilityProvider.CompId;
      credentialsObj.DeliveryTimeSlotCode = '4';
      credentialsObj.OrderDate = this.utilityProvider.currentdateTime;
      credentialsObj.Items = Items;
      credentialsObj.OrderNo =   '0';
      credentialsObj.OrderStatusCode = '0';
      credentialsObj.ReturnMessage = "";
      credentialsObj.OverHeadDetailList = [];
      credentialsObj.OverHeadSummaryList = [];
      credentialsObj.ShippingAddress = shippingAddress;
      credentialsObj.PartyID = AcntId;
      credentialsObj.Description = orderNarration;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('Save Order : ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/Cart/SaveOrder', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
        console.log("--save Order--"+JSON.stringify(data));
      }, err => {
        console.log(reject);
        console.log(err);
      });
    });

  }

  SetUpdateOrder( selectedOrder,actionFlag,orderAmount,overhead,netAmount,shippingAddress,acntId,orderNarration){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.ID = selectedOrder.ID;      //"00000000-0000-0000-0000-000000000000";
      credentialsObj.CompStateId = selectedOrder.CompStateId;
      credentialsObj.OrderType = selectedOrder.OrderType;
      credentialsObj.AtrnYear = selectedOrder.AtrnYear;
      credentialsObj.AcntBookID = selectedOrder.AcntBookID;
      credentialsObj.TransactionIdNo = selectedOrder.TransactionIdNo;
      credentialsObj.ActionFlag = actionFlag;
      credentialsObj.RowVer =  selectedOrder.RowVer,
          credentialsObj.OrderDeliveryDate = selectedOrder.OrderDeliveryDate;
      credentialsObj.DeliveryTimeSlotDesc = selectedOrder.DeliveryTimeSlotDesc;
      credentialsObj.OrderAmt = orderAmount;
      credentialsObj.DeliveryCharges = selectedOrder.DeliveryCharges;
      credentialsObj.OverheadAmt = overhead;
      credentialsObj.NetAmount = netAmount;
      credentialsObj.UserId = selectedOrder.UserId;
      // credentialsObj.AcntId = selectedOrder.AcntId;
      credentialsObj.CustomerRegistration = selectedOrder.CustomerRegistration;
      credentialsObj.DeliveryAddressFlag = selectedOrder.DeliveryAddressFlag;
      credentialsObj.OrderDeliveryAddress = selectedOrder.OrderDeliveryAddress;
      credentialsObj.ReturnCode = selectedOrder.ReturnCode;
      credentialsObj.CompID = this.utilityProvider.CompId;
      credentialsObj.DeliveryTimeSlotCode = '4';
      credentialsObj.OrderDate = selectedOrder.OrderDate;
      credentialsObj.Items = selectedOrder.Items;
      credentialsObj.OrderNo = selectedOrder.OrderNo;
      credentialsObj.OrderStatusCode = selectedOrder.OrderStatusCode;
      credentialsObj.ReturnMessage = "";
      credentialsObj.OverHeadDetailList = [];
      credentialsObj.OverHeadSummaryList = [];
      credentialsObj.ShippingAddress = shippingAddress;
      credentialsObj.OrderStatusString = null;
      credentialsObj.PartyID = acntId;
      credentialsObj.Description = orderNarration;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/Cart/SaveOrder', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  RetrieveDeliveryCharges(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();

      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;

      var credentialsObj : any = new Object();
      credentialsObj.ID =  "00000000-0000-0000-0000-000000000000";
      credentialsObj.CompID =  this.utilityProvider.CompId;
      credentialsObj.EffectiveFrom = "2019-01-01 00:00:00.000";
      data.push(crcnObj);
      data.push(credentialsObj);

      console.log('DeliveryCharges RetrieveList: ------RS------ ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/DeliveryCharges/RetrieveList', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }




  RetrievePendingOrder(AcntId,itrnType,orderStatus,pageNo,pageSize){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      console.log("party id = "+AcntId);
      credentialsObj.ID =  "00000000-0000-0000-0000-000000000000";
      credentialsObj.CompID =  this.utilityProvider.CompId;
      credentialsObj.AtrnYear = 9999;
      credentialsObj.ItrnType = itrnType;
      credentialsObj.AcntBookID = "00000000-0000-0000-0000-000000000000";
      credentialsObj.AcntBookName = null;
      credentialsObj.ItrnDate = "0001-01-01T00:00:00";
      credentialsObj.DocumentPrefix = null;
      credentialsObj.DocumentNo = 0;
      credentialsObj.DocumentPostfix = null;
      credentialsObj.PartyID = AcntId;
      credentialsObj.PartyName = null;
      credentialsObj.TaxAmount = 0,0;
      credentialsObj.TaxAmountString = null;
      credentialsObj.BilledAmount = 0,0;
      credentialsObj.BilledAmountString = null;
      credentialsObj.NetAmount = 0,0;
      credentialsObj.BilledAmount = 0,0;
      credentialsObj.NetAmountString = null;
      credentialsObj.JsonTransactionHeadListModels = null;
      credentialsObj.PageIndex = pageNo;
      credentialsObj.NoOfRecordsOnPage = pageSize;
      credentialsObj.TotalRecords = 0;
      credentialsObj.OrderNo = 0;
      credentialsObj.OrderAmountString = null;
      credentialsObj.IsPartial = false;
      credentialsObj.SearchField = 0;
      credentialsObj.CriteriaField = 0;
      credentialsObj.QueryString1 = null;
      credentialsObj.QueryString2 = null;
      credentialsObj.FromDate = null;
      credentialsObj.UptoDate = null;
      credentialsObj.TransactionCancelString = null;
      credentialsObj.GenerateBWoMString = null;
      credentialsObj.AccountingMode = 0;
      credentialsObj.BillLinkID = null;
      credentialsObj.TotalFailTransactionRecords = 0;
      credentialsObj.listType = 0;
      credentialsObj.BillNo = null;
      credentialsObj.OrderStatus = orderStatus;
      credentialsObj.ReturnCode = 0;
      credentialsObj.ReturnMessage = null;
      credentialsObj.ErrorMessage = null;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/TransactionHeads/TransactionSearchVw_SearchBillList', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  // RetrievePendingOrders(AcntId){
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json' );
  //
  //   return new Promise((resolve,reject) => {
  //     var data: any = new Array();
  //     var crcnObj : any = new Object();
  //     crcnObj.CrCn = this.utilityProvider.CrCn;
  //     crcnObj.CurrentCompID = this.utilityProvider.CompId;
  //     var credentialsObj : any = new Object();
  //     credentialsObj.AcntId=AcntId;
  //     data.push(crcnObj);
  //     data.push(credentialsObj);
  //     console.log('CustomerRegistration: ' + JSON.stringify(data) );
  //     this.http.post(this.utilityProvider.apiUrl+'api/Cart/GetPendingOrderListByPartyId', JSON.stringify(data), {
  //         headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
  //       }
  //     ).subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(reject);
  //     });
  //   });
  //
  // }



  RetrieveOrder(OrderId){
    console.log('----------'+OrderId);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.OrderNo = OrderId;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/Cart/GetOrderByOrderNo', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  showTranstionHistory(acntId){
    console.log('----------'+acntId);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.AcntId = acntId;
      credentialsObj.PageIndex = 1;
      credentialsObj.NoOfRecords = 10;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/AccountTransaction/GetTransactionHistoryByAcntId', JSON.stringify(data), {
            headers: new HttpHeaders({'Content-Type': 'application/json'/*,'Cache-Control': 'no-cache'*/})
          }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(reject);
      });
    });

  }

  RetrieveOrderByOrderId(selectedData, acntId,customerRegistration){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );

    return new Promise((resolve,reject) => {
      var data: any = new Array();
      var crcnObj : any = new Object();
      crcnObj.CrCn = this.utilityProvider.CrCn;
      crcnObj.CurrentCompID = this.utilityProvider.CompId;
      var credentialsObj : any = new Object();
      credentialsObj.ID =  selectedData.ID;
      credentialsObj.CompID = this.utilityProvider.CompId;
      credentialsObj.AtrnYear = 2018;
      credentialsObj.AcntBookID = "51379d60-4282-4383-bde5-564b39755a3e";
      credentialsObj.NetAmount = 0;
      credentialsObj.OrderNo = 0;
      credentialsObj.ReturnCode = 0;
      credentialsObj.ReturnMessage = null;
      credentialsObj.CompStateId = "00000000-0000-0000-0000-000000000000";
      credentialsObj.OrderDeliveryDate = "0001-01-01T00:00:00";
      credentialsObj.DeliveryTimeSlotCode = 0;
      credentialsObj.OrderAmt = 0;
      credentialsObj.DeliveryCharges = 0;
      credentialsObj.OverheadAmt = 0;
      credentialsObj.UserId = null;
      credentialsObj.AcntId = acntId;
      credentialsObj.CustomerRegistration = customerRegistration;
      credentialsObj.DeliveryAddressFlag = 0;
      credentialsObj.OrderDeliveryAddress = null;
      credentialsObj.Items = null;
      credentialsObj.OverHeadDetailList = null;
      credentialsObj.OverHeadSummaryList = null;
      credentialsObj.ShippingAddress = null;
      credentialsObj.OrderStatusCode = 0;
      credentialsObj.OrderStatusString = null;
      credentialsObj.DeliveryTimeSlotDesc = null;
      credentialsObj.OrderDate = "0001-01-01T00:00:00";
      credentialsObj.TransactionIdNo = 0;
      credentialsObj.OrderType = 1;
      credentialsObj.ActionFlag = 4;
      data.push(crcnObj);
      data.push(credentialsObj);
      console.log('CustomerRegistration: ' + JSON.stringify(data) );
      this.http.post(this.utilityProvider.apiUrl+'api/Cart/GetOrderByOrderHeadId', JSON.stringify(data), {
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
