import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 
        // add authorization header with jwt token if available      
        //debugger

        let Token = localStorage.getItem('Token');

        if (Token != null) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${Token}`
                }

            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        //debugger
                        if (err.status == 401) {
                            localStorage.removeItem('Token')

                        }
                    }
                )
            );
        }
        else {
            //debugger
            localStorage.removeItem('Token')
            //this._router.navigate(['/pages/404']);
            return next.handle(req.clone());

        }
    }
}

