import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front',
  templateUrl: './front.page.html',
  styleUrls: ['./front.page.scss'],
})
export class FrontPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['/tabs/register']);
  }

  signIn() {
    this.router.navigate(['/tabs/sigin']);
  }

}
