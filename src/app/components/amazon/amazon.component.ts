import { Component, OnInit } from '@angular/core';
import { AmazonserviceService } from 'src/app/services/amazonservice.service';
import { AmazonResults } from 'src/app/models/amazon-results';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.css']
})
export class AmazonComponent implements OnInit {

  constructor(private amazon: AmazonserviceService) { }

  ngOnInit() {
  }

 
  download:boolean = false;
  processed:boolean = true;
  processing:boolean = false;
  currentDate = new Date();
  loading:boolean=false;
  results:AmazonResults[];
  page = 1;
  pageSize = 12;
  amazonUrl:string;
  spinner: any;
  emptyInput:boolean;
  wrongUrl:boolean;



  getUrl(amazonUrl){
    this.processing = true;
    this.processed = false;
    this.amazonUrl = amazonUrl;
    console.log('the value before any string::::::',this.amazonUrl)
    if(this.amazonUrl == undefined){
      this.processing = false;
      this.processed = true;
      this.emptyInput = true;
    }
    else{  
    console.log('this is the amazonUrl:::::', amazonUrl)
    console.log('this is the fullUrl:::::', this.amazonUrl)
    this.amazon.getComments(this.amazonUrl) 
    .subscribe(
      (data )=>
        {
          this.results = data;
          this.processing = false;
          this.processed = true;
          this.download = true;
          console.log('the results :::',this.results)
        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.processing = false;
          this.processed = true;
          this.wrongUrl = true;
    
          //throw error;   //You can also throw the error to a global error handler
        }
        
        

      
      
    )
    
  }
}
      
      
     
        
     
      
      
     
    
      
   

   getCsvFile(){
    AmazonserviceService.exportToCsv(this.currentDate + 'amazon-comments.csv', this.results);
  }

  
}


