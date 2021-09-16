import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private apiUrl: string = 'http://127.0.0.1:5000/data';

  constructor( private http: HttpClient ) { }

  getData( collection: string ): Observable<any> {
    console.log('entra service');
    const url = `${ this.apiUrl }/${ collection }`;
    console.log(url);
    return this.http.get( url );
  }
}
