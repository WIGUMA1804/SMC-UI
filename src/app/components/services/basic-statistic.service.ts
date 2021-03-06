import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegression } from 'src/app/interfaces/sifoc-interface';
import { INeuronal } from '../../interfaces/sifoc-interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private apiUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getData(collection: string): Observable<any> {
    console.log('entra service');
    const url = `${this.apiUrl}/data/${collection}`;
    console.log(url);
    return this.http.get(url);
  }

  getSuperSet(): Observable<any> {
    const url = `${this.apiUrl}/superset`;
    console.log(url);
    return this.http.get(url);
  }

  getRegression(entries: any): Observable<IRegression[]> {
    const url = `${this.apiUrl}/regresion`;
    return this.http.post<IRegression[]>(url, entries);
  }

  getNeuronal(entries: any): Observable<INeuronal> {
    const url = `${this.apiUrl}/neuronal`;
    return this.http.post<INeuronal>(url, entries);
  }

  getPrediction(vector: any): Observable<any> {
    const url = `${this.apiUrl}/modelPredict`;
    console.log(vector)
    return this.http.post<any>(url, vector);
  }
}
