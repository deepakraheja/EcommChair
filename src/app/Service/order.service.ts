import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Order/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  SaveOrder(_Obj: any): Observable<any> {
    this._methodName = "SaveOrder";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveCcavenueRequest(_Obj: any): Observable<any> {
    this._methodName = "SaveCcavenueRequest";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetOrderByOrderId(_Obj: any): Observable<any> {
    this._methodName = "GetOrderByOrderId";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetOrderByUserId(): Observable<any> {
    this._methodName = "GetOrderByUserId";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetSuccessOrderByOrderId(_Obj: any): Observable<any> {
    this._methodName = "GetSuccessOrderByOrderId";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetSuccessPrintOrderByGUID(_Obj: any): Observable<any> {
    this._methodName = "GetSuccessPrintOrderByGUID";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetNewOrderByGUID(_Obj: any): Observable<any> {
    this._methodName = "GetNewOrderByGUID";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}