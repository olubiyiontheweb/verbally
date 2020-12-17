import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-lg',
  templateUrl: './header-lg.component.html',
  styleUrls: ['./header-lg.component.scss'],
})
export class HeaderLgComponent implements OnInit {
  @Input('headerObject') headerObject: any;

  constructor(private router: Router) { }

  ngOnInit() { }

  changeRoute() {
    this.router.navigate(['tabs/front']);
  }

}
