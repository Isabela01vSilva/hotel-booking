import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SucessComponent } from './pages/sucess/success.component';
import { BaseComponent } from './_components/base/base.component';
import { SearchEngineComponent } from './_components/search-engine/search-engine.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: BaseComponent,
        children: [
          {
            path: '',
            component: SearchEngineComponent,
            children: [
              { path: '', component: HomeComponent },
              { path: 'search', component: SearchComponent },
              { path: 'hotel/:id', component: DetailComponent },
            ],
          },
          { path: 'checkout/:hotelId/:roomName', component: CheckoutComponent },
        ],
      },
      { path: 'success', component: SucessComponent },
    ],
  },
];
