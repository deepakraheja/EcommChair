import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  __RequestVerificationToken = '';

  baseURL = environment.BASE_API_URL;
  loginURL = ''
  constructor(private httpClient: HttpClient, private storage: StorageService) {

  }
  headers = new HttpHeaders();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  };


  get(method) {
    
    return this.httpClient.get(this.baseURL + method);
  }
  getWithParam(method, _params) {
    return this.httpClient.get(this.baseURL + method, _params);
  }
  post(method, data) {
    return this.httpClient.post(this.baseURL + method, data);
  }
  put(method, data) {
    return this.httpClient.put(this.baseURL + method, data);
  }


}
