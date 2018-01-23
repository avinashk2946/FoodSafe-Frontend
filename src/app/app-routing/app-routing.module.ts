
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFlightComponent } from '../components/search-flight/search-flight.component';
import { ViewFlightsComponent } from '../components/view-flights/view-flights.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search-flight' },
  { path: 'search-flight', component: SearchFlightComponent },
  { path: 'view-flight', component: ViewFlightsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


export const routingComponents = [
  SearchFlightComponent
];






