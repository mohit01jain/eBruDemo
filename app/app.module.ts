import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {Config,/*Config,*/ IonicModule, IonicRouteStrategy, NavController /*, NavParams*/} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SMS} from '@ionic-native/sms/ngx';
import {SocialSharing } from '@ionic-native/social-sharing/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SplashPage} from './splash/splash.page';
import {LoginWithOptionPage} from './login-with-option/login-with-option.page';
import {HomePage} from './home/home.page';
import {SignInPage} from './sign-in/sign-in.page';
import {RegisterPage} from './register/register.page';
import {ListPage} from './list/list.page';
import {FormsModule} from '@angular/forms';
import {UserService} from './Providers/user/user.service';
import {UtilityService} from './Providers/utility/utility.service';
import {HttpClientModule, HttpClient } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {AddNewAddressPage} from './add-new-address/add-new-address.page';
import {AdminDashboardPage} from './admin-dashboard/admin-dashboard.page';
import {CartPage} from './cart/cart.page';
import {ChildDisplayPage} from './child-display/child-display.page';
import {CustomerRegistrationPage} from './customer-registration/customer-registration.page';
import {DeliveryAddressPage} from './delivery-address/delivery-address.page';
import {EditDeliveryAddressPage} from './edit-delivery-address/edit-delivery-address.page';
import {EditProfilePage} from './edit-profile/edit-profile.page';
import {ForgetpasswordPage} from './forgetpassword/forgetpassword.page';
import {InviteFriendsPage} from './invite-friends/invite-friends.page';
import {ItemListPage} from './item-list/item-list.page';
import {OrderListPage} from './order-list/order-list.page';
import {OrderSuccessfullPage} from './order-successfull/order-successfull.page';
import {PendingOrdersPage} from './pending-orders/pending-orders.page';
import {ReceivablePage} from './receivable/receivable.page';
import {SearchItemPage} from './search-item/search-item.page';
import {TabOrderCompeletePage} from './tab-order-compelete/tab-order-compelete.page';
import {TabOrderListPage} from './tab-order-list/tab-order-list.page';
import {ValidateKeyPage} from './validate-key/validate-key.page';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {ItemDetailsPage} from './item-details/item-details.page';
import {TestingPage} from './testing/testing.page';
import {DatePipe, DecimalPipe} from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import {App, IonicPageModule, Popover} from 'ionic-angular';
import {ContactUsPage} from './contact-us/contact-us.page';
import {SwipeService} from './Providers/swipe/swipe.service';
import { HttpModule} from '@angular/http';
import {PartialUpdatePage} from './partial-update/partial-update.page';
import {Hammer} from 'ionic-angular/umd/gestures/hammer';
import {AddressService} from './Providers/address/address.service';
import {ModalPageModule} from './modal/modal.module';
import {ModalPage} from './modal/modal.page';
import {NewAddressPageModule} from './new-address/new-address.module';
import {NewAddressPage} from './new-address/new-address.page';
import {OrderList1Page} from './order-list1/order-list1.page';
import {OrderList1PageModule} from './order-list1/order-list1.module';
import {PendingOrdersPageModule} from './pending-orders/pending-orders.module';
import {TabOrderCompeletePageModule} from './tab-order-compelete/tab-order-compelete.module';
import {TabOrderListPageModule} from './tab-order-list/tab-order-list.module';
import {LedgerPage} from './ledger/ledger.page';
import {isNegativeNumberLiteral} from 'tslint';
import {AccountDetailsPage} from './account-details/account-details.page';
import {AccountdetailsPageModule} from './accountdetails/accountdetails.module';
import {AccountdetailsmonthlyPage} from './accountdetailsmonthly/accountdetailsmonthly.page';
import {AccountdetailsmonthlyPageModule} from './accountdetailsmonthly/accountdetailsmonthly.module';
import {PopoverPageforPincodePage} from './popover-pagefor-pincode/popover-pagefor-pincode.page';
import {PopoverPageforPincodePageModule} from './popover-pagefor-pincode/popover-pagefor-pincode.module';



@NgModule({
    declarations: [AppComponent, SplashPage, LoginWithOptionPage,
        HomePage, SignInPage, RegisterPage,
        ListPage, ContactUsPage , AddNewAddressPage, TestingPage,
        AdminDashboardPage, CartPage, ChildDisplayPage, CustomerRegistrationPage,
        DeliveryAddressPage, EditDeliveryAddressPage, EditProfilePage,
        ForgetpasswordPage, InviteFriendsPage, OrderSuccessfullPage, ReceivablePage,
        SearchItemPage, SignInPage, ValidateKeyPage, ItemDetailsPage,
        PartialUpdatePage, LedgerPage, AccountDetailsPage, AccountdetailsmonthlyPage,],
    entryComponents: [EditDeliveryAddressPage,DeliveryAddressPage, ModalPage, NewAddressPage, TabOrderListPage, TabOrderCompeletePage, PendingOrdersPage, ],
    imports: [
        BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        HttpClientModule, RouterModule, FormsModule, IonicStorageModule.forRoot(), ModalPageModule,
        NewAddressPageModule, OrderList1PageModule,PendingOrdersPageModule, TabOrderCompeletePageModule,
        TabOrderListPageModule,AccountdetailsPageModule,PopoverPageforPincodePageModule,
        HttpModule, AgmCoreModule.forRoot(
            {
            apiKey: 'AIzaSyDNOJacGteQWv0tyqhqeRNUu78R6hr81TU',
            libraries: ['places']
        })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        UserService,
        UtilityService,
        NavController,
        AppVersion,
        DatePipe,
        DecimalPipe,
        EmailComposer,
        SMS,
        SocialSharing,
        App,
        SwipeService,
        AddressService,
        CartPage,
        SplashPage,

          {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
