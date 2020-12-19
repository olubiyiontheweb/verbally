import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-shared',
  templateUrl: './header-shared.page.html',
  styleUrls: ['./header-shared.page.scss'],
})
export class HeaderSharedPage implements OnInit {
  @Input('headerObject') headerObject: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeRoute() {
    this.router.navigate(['tabs/front']);
  }

}
