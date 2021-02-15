import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // private LoggedInUser = new BehaviorSubject(Users);
  // currentUser = this.LoggedInUser.asObservable();

  public user: any[] = JSON.parse(localStorage.getItem('LoggedInUser'));
  private LoggedInUser = new BehaviorSubject(this.user);
  currentUser = this.LoggedInUser.asObservable();

  public cart: any[] = [];
  private GetCart = new BehaviorSubject(this.cart);
  lstCart = this.GetCart.asObservable();

  public wishList: any[] = [];
  private GetwishList = new BehaviorSubject(this.wishList);
  lstwishList = this.GetwishList.asObservable();

  public compare: any[] = JSON.parse(localStorage.getItem('compareItems'));
  private Getcompare = new BehaviorSubject(this.compare);
  lstcompare = this.Getcompare.asObservable();
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

  UserwishList(_wishList: any[]) {
    this.GetwishList.next(_wishList);
  }

  Usercompare(_compare: any[]) {
    this.Getcompare.next(_compare);
  }

}
