import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AlertService } from '@shared/services/alert.service';

@Injectable()
export class MarvelApiInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const publicKey = environment.PUBLIC_KEY;
    const privateKey = environment.PRIVATE_KEY;
    const timestamp = new Date().getTime().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    const authParams = request.clone({
      setParams: {
        'apikey': publicKey,
        'ts': timestamp,
        'hash': hash
      }
    });

    return next.handle(authParams).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 409 || error.status === 401 || error.status === 403 || error.status === 405) {
          errorMessage = `Error ${error.status}: ${error.error.message}`;
        } else {
          errorMessage = `An unexpected error occurred: ${error.statusText}`;
        }
        this.alertService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
    
  }
}