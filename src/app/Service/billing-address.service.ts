import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingAddressService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "BillingAddress/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  SaveBillingAddress(_Obj: any): Observable<any[]> {
    this._methodName = "SaveBillingAddress";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetBillingAddress(_Obj: any): Observable<any[]> {
    this._methodName = "GetBillingAddress";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  DeleteBillingAddress(_Obj: any): Observable<any[]> {
    this._methodName = "DeleteBillingAddress";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

}