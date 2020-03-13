import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { AmazonComponent } from './components/amazon/amazon.component';
import { YoutubeserviceService } from './services/youtubeservice.service';
import { HttpClientModule } from '@angular/common/http';
import { youTubeSearchInjectables } from './injectables/youtube-injectables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { AmazonserviceService } from './services/amazonservice.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YoutubeComponent,
    AmazonComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    
  ],
  providers: [YoutubeserviceService,HttpClientModule,youTubeSearchInjectables,AmazonserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
