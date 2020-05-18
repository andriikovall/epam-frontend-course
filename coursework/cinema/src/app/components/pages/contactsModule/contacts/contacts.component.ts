import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedBack } from 'src/app/models/feedback';
import { BaseComponent } from 'src/app/components/base.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  feedbackForm: FormGroup;
  feedbackAdded: boolean;

  public mapsWigth = 600
  public mapsHeigth = 300;

  private mdBreakpoint = 1200;


  public get emailControl(): AbstractControl {
    return this.feedbackForm.get('email');
  }

  public get nameControl(): AbstractControl {
    return this.feedbackForm.get('name');
  }

  public get messageControl(): AbstractControl {
    return this.feedbackForm.get('message');
  }

  constructor(public feedbackService: FeedbackService,
              private toastService: ToastService) {
    // super();
  }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required])
    });
    this.onResize();
  }


  onSubmit(formValue) {
    this.feedbackForm.markAllAsTouched();
    this.feedbackAdded = false;
    if (this.feedbackForm.invalid) {
      return
    }
    const feedback: FeedBack = { ...formValue, timestamp: Date.now() }
    this.feedbackService.saveFeedback(feedback)
      .subscribe(res => {
        if (res) {
          this.feedbackAdded = true;
          this.toastService.success('Thanks for your feedback!', 'We will answer as soon as possible');
        }
      })
  }

  onResize() {
    if (window.innerWidth <= this.mdBreakpoint) {
      this.mapsWigth = window.innerWidth - 100;
    } else {
      this.mapsWigth = 600;
    }
  }

}
