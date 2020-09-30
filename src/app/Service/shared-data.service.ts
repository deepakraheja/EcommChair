import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // private LoggedInUser = new BehaviorSubject(Users);
  // currentUser = this.LoggedInUser.asObservable();

  public user: any[] = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  private LoggedInUser = new BehaviorSubject(this.user);
  currentUser = this.LoggedInUser.asObservable();

  public cart: any[] = [];
  private GetCart = new BehaviorSubject(this.cart);
  lstCart = this.GetCart.asObservable();
  constructor() { }
  // currentUser(obj: Users) {
  //   this.LoggedInUser.next(obj);
  // }
  AssignUser(_user: any[]) {
    this.LoggedInUser.next(_user);
  }

  UserCart(_cart: any[]) {
    this.GetCart.next(_cart);
  }

}
