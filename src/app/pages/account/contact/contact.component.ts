import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from 'src/app/Service/contactus.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  ContactUsForm: FormGroup;
  submitted: boolean = false;
  PhoneMask: string;
  showMask: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _ContactusService: ContactusService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.ContactUsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get f() { return this.ContactUsForm.controls; }


  addPhoneMask(obj: Object) {
    //this.DecimalMask = "0*.00";
    this.PhoneMask = "0000000000";
    this.showMask = false;
  }

  Save() {
    this.submitted = true;
    if (this.ContactUsForm.invalid) {
      this.toastr.error('Please fill in all the * required fields.');
      return;
    }
    else {
      this.spinner.show();
      this._ContactusService.SaveContactUs(this.ContactUsForm.value).subscribe(res => {
        this.spinner.hide();
        this.toastr.success("Your request has been submitted. We will contact you sortly.");
        this.submitted = false;
        this.ContactUsForm.reset();
      });
    }
  }

}
