import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchDogComponent } from './components/search-dog/search-dog.component';
import { FoundDogComponent } from './components/found-dog/found-dog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'found', component: FoundDogComponent },
  { path: 'search', component: SearchDogComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
