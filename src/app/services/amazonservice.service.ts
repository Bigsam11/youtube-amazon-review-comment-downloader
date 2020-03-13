import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AmazonResults } from '../models/amazon-results';
import { Observable } from 'rxjs';

@Injectable()
export class AmazonserviceService{

  constructor(
    private http: HttpClient,
    
  ) { }
  
  //apiURL = 'https://api-amazon-reviews.herokuapp.com/webscrape';
  apiURL = 'https://amazonreviewapi.azurewebsites.net/webscrape';
  payload:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })
  }




    

  


  getComments(query: string): Observable<any> {
    
  const queryUrl = this.apiURL;
  console.log('the queryUrl before service::::',queryUrl);
  console.log('the object before service::::',query);
  
  return this.http.post(queryUrl,{amaUrl:query},this.httpOptions)
  }




  static exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvData =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }


  

}
