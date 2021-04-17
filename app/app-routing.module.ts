import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SplashPage} from './splash/splash.page';
import {LoginWithOptionPage} from './login-with-option/login-with-option.page';
import {SignInPage} from './sign-in/sign-in.page';
import {RegisterPage} from './register/register.page';
import {HomePage} from './home/home.page';
import {ListPage} from './list/list.page';
import {ChildDisplayPage} from './child-display/child-display.page';
import {ItemDetailsPage} from './item-details/item-details.page';
import {TestingPage} from './testing/testing.page';
import {CartPage} from './cart/cart.page';
import {DeliveryAddressPage} from './delivery-address/delivery-address.page';
import {NewAddressPage} from './new-address/new-address.page';
import {EditDeliveryAddressPage} from './edit-delivery-address/edit-delivery-address.page';
import {EditProfilePage} from './edit-profile/edit-profile.page';
import {InviteFriendsPage} from './invite-friends/invite-friends.page';
import {AdminDashboardPage} from './admin-dashboard/admin-dashboard.page';
import {Searchbar} from 'ionic-angular';
import {SearchItemPage} from './search-item/search-item.page';
import {OrderListPage} from './order-list/order-list.page';
import {PendingOrdersPage} from './pending-orders/pending-orders.page';
import {TabOrderCompeletePage} from './tab-order-compelete/tab-order-compelete.page';
import {TabOrderListPage} from './tab-order-list/tab-order-list.page';
import {ForgetpasswordPage} from './forgetpassword/forgetpassword.page';
import {ContactUsPage} from './contact-us/contact-us.page';
import {AddNewAddressPage} from './add-new-address/add-new-address.page';
import {ReceivablePage} from './receivable/receivable.page';
import {CustomerRegistrationPage} from './customer-registration/customer-registration.page';
import {OrderSuccessfullPage} from './order-successfull/order-successfull.page';
import {PartialUpdatePage} from './partial-update/partial-update.page';
import {ValidateKeyPage} from './validate-key/validate-key.page';
import {OrderList1Page} from './order-list1/order-list1.page';
import {LedgerPage} from './ledger/ledger.page';

const routes: Routes = [
    {path: 'splash', component: SplashPage},
    {path: 'testing', component: TestingPage},
    {path: 'login-with-option', component: LoginWithOptionPage},
    {path: 'sign-in', component: SignInPage},
    {path: 'register', component: RegisterPage},
    {path: 'home', component: HomePage},
    {path: 'list', component: ListPage},
    {path: 'item-details', component: ItemDetailsPage},
    {path: 'child-display', component: ChildDisplayPage},
    {path: 'cart', component: CartPage},
    {path: 'new-address', loadChildren: './new-address/new-address.module#NewAddressPageModule'},
    {path: 'delivery-address', component: DeliveryAddressPage},
    {path: 'edit-delivery-address', loadChildren: './edit-delivery-address/edit-delivery-address.module#EditDeliveryAddressPageModule'},
    {path: 'invite-friends', component: InviteFriendsPage},
    {path: 'edit-profile', component: EditProfilePage},
    {path: 'search-item', component: SearchItemPage},
    {path:'' , loadChildren: './order-list/order-list.module#OrderListPageModule'},
    {path: 'forgetpassword', component: ForgetpasswordPage},
    {path: 'admin-dashboard', component: AdminDashboardPage},
    {path: 'contact-us', component: ContactUsPage},
    /* {path: 'tab-order-compelete',component:TabOrderCompeletePage},  */
    /* {path: 'tab-order-list', component: TabOrderListPage },*/
    /* {path: 'pending-orders', component:PendingOrdersPage},*/
    {path: 'receivable', component: ReceivablePage},
    {path: 'add-new-address', component: AddNewAddressPage},
    {path: 'testing', component: TestingPage},
    {path: 'customer-registration', component:CustomerRegistrationPage},
    {path: 'order-successfull', component:OrderSuccessfullPage},
    {path: 'item-details', component: ItemDetailsPage},
    {path: 'validate-key', component: ValidateKeyPage},
    {path: 'partial-update', component: PartialUpdatePage},
    {path: 'item-list', loadChildren: './item-list/item-list.module#ItemListPageModule'},
    {path: 'deliverytimeslot', loadChildren: './deliverytimeslot/deliverytimeslot.module#DeliverytimeslotPageModule'},
    {path: 'account-details', loadChildren: './account-details/account-details.module#AccountDetailsPageModule' },
    {path: 'radiosolve', loadChildren: './radiosolve/radiosolve.module#RadiosolvePageModule' },
    {path: 'order-list1', loadChildren: './order-list1/order-list1.module#OrderList1PageModule' /*component: OrderList1Page*/ },
    {path: 'ledger', component: LedgerPage },
    {path: 'view-bill', loadChildren: './view-bill/view-bill.module#ViewBillPageModule' },
  { path: 'payment-method', loadChildren: './payment-method/payment-method.module#PaymentMethodPageModule' },
  { path: 'make-payment', loadChildren: './make-payment/make-payment.module#MakePaymentPageModule' },
  { path: 'order-unsuccessfull', loadChildren: './order-unsuccessfull/order-unsuccessfull.module#OrderUnsuccessfullPageModule' },
    {path: 'accountdetails', loadChildren: './accountdetails/accountdetails.module#AccountdetailsPageModule' },
    {path: 'accountdetailsmonthly', loadChildren: './accountdetailsmonthly/accountdetailsmonthly.module#AccountdetailsmonthlyPageModule' },
  { path: 'pincode-according-shipping-address', loadChildren: './pincode-according-shipping-address/pincode-according-shipping-address.module#PincodeAccordingShippingAddressPageModule' },
  { path: 'popover-pagefor-pincode', loadChildren: './popover-pagefor-pincode/popover-pagefor-pincode.module#PopoverPageforPincodePageModule' },
  { path: 'register1', loadChildren: './register1/register1.module#Register1PageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
/*
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
*/
/*
  { path: 'tab-order-list', loadChildren: './tab-order-list/tab-order-list.module#TabOrderListPageModule' },
*/

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
