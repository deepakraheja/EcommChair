import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Productkart } from '../shared/classes/productkart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public currency: string = 'Rs';
  public catalogMode: boolean = false;

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Product/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }



  BindProductByPopular(): Observable<Productkart[]> {

    this._methodName = "GetProductByPopular";
    return this._http.post<Productkart[]>(
      this._url + this._methodName, this._param
    );
  }

  getProductByCategory(_categoryObj: any): Observable<any[]> {

    this._methodName = "GetProductBySubcatecode";
    this._param = _categoryObj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetWithoutSetProductByRowID(_productObj: any): Observable<Productkart[]> {
    this._methodName = "GetWithoutSetProductByRowID";
    this._param = _productObj;
    return this._http.post<Productkart[]>(
      this._url + this._methodName, this._param
    );
  }

  GetWithSetProductByRowID(_productObj: any): Observable<Productkart[]> {
    //  ;
    this._methodName = "GetWithSetProductByRowID";
    this._param = _productObj;
    return this._http.post<Productkart[]>(
      this._url + this._methodName, this._param
    );
  }

  GetBannerProduct(): Observable<Productkart[]> {
    this._methodName = "GetBannerProduct";
    return this._http.post<Productkart[]>(
      this._url + this._methodName, this._param
    );
  }
  GetProductCartQuantity(_productObj: any): Observable<Productkart[]> {
    this._methodName = "GetProductCartQuantity";
    this._param = _productObj;
    return this._http.post<Productkart[]>(
      this._url + this._methodName, this._param
    );
  }
  GetProductInCartById(_productObj: any): Observable<Productkart[]> {
    this._methodName = "GetProductInCartById";
    this._param = _productObj;
    return this._http.post<Productkart[]>(
      this._url + this._methodName, this._param
    );
  }

  GetUserRecentlyProduct(): Observable<any[]> {
    this._methodName = "GetUserRecentlyProduct";
    this._param = {};
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }
}
