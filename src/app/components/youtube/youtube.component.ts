import { Component, OnInit,ViewChild, Output, EventEmitter } from '@angular/core';
import { map, switchAll, isEmpty } from 'rxjs/operators';
import { SearchResult } from 'src/app/models/search-result';
import { YoutubeserviceService } from 'src/app/services/youtubeservice.service';
import { empty } from 'rxjs';
//import { $ } from 'protractor';
declare var $: any;




@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  download:boolean = false;
  processed:boolean = true;
  processing:boolean = false;
  currentDate = new Date();
  loading:boolean=false;
  results:SearchResult[];
  youtubeUrl:string;
  page = 1;
  pageSize = 6;
  fullUrl:string;
  spinner: any;
  emptyInput:boolean;
  wrongUrl:boolean;

  constructor(
    private youtube: YoutubeserviceService,
  ) { }

  ngOnInit() {
    //this.youtube.getComments(this.formatUrl());
    
  }


   getUrl(){
     this.processing = true;
     this.processed = false;
     this.fullUrl = this.youtubeUrl;
     console.log('the value before any string::::::',this.fullUrl)
     if(this.fullUrl == undefined){
       this.processing = false;
       this.processed = true;
       this.emptyInput = true;
     }
     else{  
     console.log('this is the youtubeURl:::::',this.youtubeUrl)
     console.log('this is the fullUrl:::::', this.fullUrl)
     const videoId = this.formatUrl();
     console.log('this is the Vid id before processing::::',videoId);
     this.youtube.getComments(videoId) 
     .subscribe(
       (results: SearchResult[]) => { //on success
         this.processing = false;
         this.processed = true;
         this.download = true;
         this.results= results;
         
         console.log('this is the result::::::::::::::',results)
       },
       
       (err: any) => { //one error
         console.log(err);
         this.processing = false;
         this.processed = true;
         this.wrongUrl = true;
         
       },
       ()=> { //on complete
        this.processing = false;
         this.processed = true;
        
       }
       
     );
   }
     
  }

 


   formatUrl(){
    let url = this.fullUrl
    var urlsplit= url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
     return urlsplit[3]
    }

    getCsvFile(){
      YoutubeserviceService.exportToCsv(this.currentDate + 'youtubeComments.csv', this.results);
    }

    

}
