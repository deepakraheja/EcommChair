
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('form') form: ElementRef;

  encRequest: String;
  accessCode: String;
  constructor(private http: HttpClient
    , private router: Router,) { }
  ngOnInit() {
    this.accessCode = 'YOURACCESSCODEGOESHERE';
  }

  pay() {
    // this.cartValue contains all the order information which is sent to the server
    // You can use this package to encrypt - https://www.npmjs.com/package/node-ccavenue/
    // this.checkoutService.getEnc(this.orderInformation).subscribe((response: any) => {
    //   this.encRequest = response.encRequest;
    //   setTimeout(_ => this.form.nativeElement.submit());
    // }, error => {
    //   console.log(error);
    // });

    //this.http.post("http://localhost:61970/ccavRequestHandler.aspx","").subscribe((data) => {});

    // $.ajax({
    //   url: "http://localhost:61970/ccavRequestHandler.aspx?year=1252",
    //   type: "POST",

    //   processData: false,

    //   async: true,
    //   cache: false,
    //   dataType: 'jsonp',
    //   crossDomain: true,
    //   contentType: "application/json; charset=utf-8",
    //   success: function (result) {
    //   },
    //   error: function (err) {
    //     //alert(err.statusText);
    //   }
    // });

    window.location.href="http://localhost:61970/ccavRequestHandler.aspx?Aid=1252&year=545";

  }
}