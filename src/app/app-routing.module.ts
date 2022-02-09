import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NavigatedComponent } from './components/navigated/navigated.component';

export const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'navigated', component: NavigatedComponent },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
