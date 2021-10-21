import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/basic-statistics/grid/grid.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { GraphsComponent } from './components/graphs/graphs.component';

const routes: Routes = [
  {
    path:'',
    component: GridComponent,
    pathMatch: 'full'
  },
  {
    path:'analytics',
    component: AnalyticsComponent
  },
  {
    path:'graphs',
    component: GraphsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
