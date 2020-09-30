import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "SubCategory/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  GetSubcategoryByCatId(_SubCategoryObj: any): Observable<any[]> {
    this._methodName = "GetSubcategoryByCatId";
    this._param = _SubCategoryObj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  GetSideSubcategory(_SubCategoryObj: any): Observable<any[]> {
    this._methodName = "GetSideSubcategory";
    this._param = _SubCategoryObj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }
}
