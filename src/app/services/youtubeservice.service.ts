import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SearchResult } from '../models/search-result';
import { Observable } from 'rxjs';



export const YOUTUBE_API_KEY = environment.YOUTUBE_API_KEY;
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/commentThreads';

@Injectable()
export class YoutubeserviceService {
  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) { }
  
  getComments(query: string): Observable<SearchResult[]> {
    const params:string = [
      `maxResults=100`,
      `part=snippet%2Creplies`,
      `videoId=${query}`,
      `key=${this.apiKey}`,
    ].join('&');
  const queryUrl = `${this.apiUrl}?${params}`;
  return this.http.get(queryUrl).pipe(map(response => {
      return <any>response['items'].map(item => {
         //console.log("Raw Item", item)
        return new SearchResult({
          authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
          authorChannelUrl: item.snippet.topLevelComment.snippet.authorChannelUrl,
          textDisplay:item.snippet.topLevelComment.snippet.textDisplay,
          viewerRating: item.snippet.topLevelComment.snippet.viewerRating,
          publishedAt:item.snippet.topLevelComment.snippet.publishedAt,
        });
      });
  }));
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
