import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }
  headerObject = [{
    'title': 'Verbally',
    'subTitle': 'Hello Joshua'
  }];

  bannerImages = [
    {
      id: 1,
      'url': '../../assets/img1.jpg',
      'title': 'Slide 1'
    }
  ];

  ngOnInit() {
  }

}
