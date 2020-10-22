import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Cart/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  AddToCart(_Obj: any[]): Observable<any[]> {
    this._methodName = "AddToCart";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  DelCartById(_Obj: any): Observable<any[]> {
    this._methodName = "DelCartById";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetCartById(_Obj: any): Observable<any[]> {
    this._methodName = "GetCartById";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }
  
  UpdateToCart(_Obj: any[]): Observable<any[]> {
    this._methodName = "UpdateToCart";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetCartProcessedById(): Observable<any[]> {
    this._methodName = "GetCartProcessedById";
    this._param = {};
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }
}
