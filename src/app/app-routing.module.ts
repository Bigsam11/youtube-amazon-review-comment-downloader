import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {YoutubeComponent} from './components/youtube/youtube.component';
import {AmazonComponent} from './components/amazon/amazon.component'

import { from } from 'rxjs';



const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'youtube',component: YoutubeComponent},
  {path:'amazon',component: AmazonComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
