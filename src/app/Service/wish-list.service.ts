import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "WishList/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  AddToWishList(_Obj: any[]): Observable<any[]> {
    this._methodName = "AddToWishList";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  DelWishListById(_Obj: any): Observable<any[]> {
    this._methodName = "DelWishListById";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetWishListById(): Observable<any[]> {
    this._methodName = "GetWishListById";
    this._param = {};
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }
 
}
