import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { AlertService } from '../services/alert.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-confirmregistration',
  templateUrl: './confirmregistration.page.html',
  styleUrls: ['./confirmregistration.page.scss'],
})
export class ConfirmregistrationPage implements OnInit {
  confirmationToken: any;
  redirect = [];
  headerObject = [{
    'title': 'Verbally',
    'subTitle': 'Voila! Yarning just got better'
  }];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private service: ServiceService,
    private alertService: AlertService) { }

  ngOnInit() {
    let customCss = 'custom-class custom-loading';
    let message = 'Account confirmation in progress...';
    this.loaderService.showLoader(message, customCss);
    this.extractUserCode();
  }

  extractUserCode() {
    this.confirmationToken = this.activatedRoute.snapshot.params;
    this.service.userAccountConfirmation(this.confirmationToken['confirmation_token']).pipe(take(1))
      .subscribe((response) => {
        console.log(response.is_success);
        this.loaderService.hideLoader();
        this.redirect[0] = '/tabs/collection';
        this.alertService.presentAlert(response, this.redirect);
      });
  }

}
