import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Users/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  UserRegistration(_BrandObj: any): Observable<any> {
    this._methodName = "UserRegistration";
    this._param = _BrandObj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  UpdateUserBusinessDetail(_BrandObj: any): Observable<any> {
    this._methodName = "UpdateUserBusinessDetail";
    this._param = _BrandObj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  ValidLogin(_BrandObj: any): Observable<any[]> {
    this._methodName = "ValidLogin";
    this._param = _BrandObj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  UpdatePwd(_Obj: any): Observable<any[]> {
    this._methodName = "UpdatePwd";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }
  ValidEmail(_Obj: any): Observable<Number> {
    this._methodName = "ValidEmail";
    this._param = _Obj;
    return this._http.post<Number>(
      this._url + this._methodName, this._param
    );
  }
  ResetPassword(_Obj: any): Observable<Number> {
    this._methodName = "ResetPassword";
    this._param = _Obj;
    return this._http.post<Number>(
      this._url + this._methodName, this._param
    );
  }
  //***********************Mobile OTP***************************** */
  CheckMobileAllReadyRegisteredOrNot(_Obj: any): Observable<any[]> {

    this._methodName = "CheckMobileAllReadyRegisteredOrNot";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

    //***********************Mobile OTP***************************** */
    SendMobileOTPforgotpassword(_Obj: any): Observable<any[]> {

      this._methodName = "SendMobileOTPforgotpassword";
      this._param = _Obj;
      return this._http.post<any[]>(
        this._url + this._methodName, this._param
      );
    }
  


  verify_mobile_otp(_Obj: any): Observable<any[]> {

    this._methodName = "VerifyMobileOtp";
    this._param = _Obj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetUserInfo(): Observable<any[]> {
    this._methodName = "GetUserInfo";
    this._param = {};
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }


}
