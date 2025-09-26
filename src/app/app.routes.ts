import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'hotel', component: DetailComponent },
  { path: 'checkout', component: CheckoutComponent },
];
