import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private API_URL: string = "http://127.0.0.1:3000/";


  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };

  registerUsers(object) {

    let endPoint = "api/v1/users";
    return this.http
      .post(this.API_URL + endPoint, object, {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("registerUsers"))
      )
  }

  userLogin(object) {
    let endPoint = "api/v1/users/sign_in";
    return this.http.post(this.API_URL + endPoint, object, {
      headers: { 'Content-Type': 'application/json' }
    })
      .pipe(map(this.extractData),
        catchError(this.handleError<any>("userLogin"))
      )
  }

}
