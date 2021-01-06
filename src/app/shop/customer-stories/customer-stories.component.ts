import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerStoryService } from 'src/app/Service/customer-story.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-stories',
  templateUrl: './customer-stories.component.html',
  styleUrls: ['./customer-stories.component.scss']
})
export class CustomerStoriesComponent implements OnInit {
  public lstData: any[] = [];
  APIURL = environment.APIURL;
  public ImageSrc: string
  constructor(
    private _customerStory: CustomerStoryService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    //this.spinner.show();
    this._customerStory.GetCustomerStories().subscribe(res => {
      this.lstData = res;
      //this.spinner.hide();
    });
  }

}
