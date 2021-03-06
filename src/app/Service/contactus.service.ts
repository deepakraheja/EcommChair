import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "ContactUs/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  SaveContactUs(_Obj: any): Observable<any[]> {
    this._methodName = "SaveContactUs";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  
  GetContactUs(): Observable<any> {
    this._methodName = "GetContactUs/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
