import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

  private handleError(result: HttpErrorResponse) {
    // return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.log(result); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`failed: ${result.message}`);

    return throwError(result.error)
  }

  registerUsers(object) {
    let endPoint = "api/v1/users";
    return this.http
      .post(this.API_URL + endPoint, object, {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      )
  }

  userLogin(object) {
    let endPoint = "api/v1/users/sign_in";
    return this.http.post(this.API_URL + endPoint, object, {
      headers: { 'Content-Type': 'application/json' }
    })
      .pipe(map(this.extractData),
        catchError(this.handleError)
      )
  }

  userAccountConfirmation(confirmations) {
    let endPoint = "api/v1/users/confirmation";
    return this.http.post(this.API_URL + endPoint, confirmations, {
      headers: { 'Content-Type': 'application/json' }
    })
      .pipe(map(this.extractData),
        catchError(this.handleError)
      )
  }

}
