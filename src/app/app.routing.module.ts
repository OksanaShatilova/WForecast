import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {WeatherListComponent} from './weather-list/weather-list.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, children: [
      {path: ':city', component: WeatherListComponent}
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
