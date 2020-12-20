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
  itemCatergory = [
    {
      header: 'Hello',
      id: [
        {
          id: 1,
          'url': '../../assets/img1.jpg',
          'title': 'Free 1.0'
        },
        {
          id: 1,
          'url': '../../assets/img2.jpg',
          'title': 'Free 1.2'
        },
        {
          id: 1,
          'url': '../../assets/img1.jpg',
          'title': 'Free 1.3'
        },
        {
          id: 1,
          'url': '../../assets/img2.jpg',
          'title': 'Free 1.4'
        }
      ]
    },
    {
      header: 'Hello1',
      id: [
        {
          id: 2,
          'url': '../../assets/img2.jpg',
          'title': 'Free 2.1'
        },
        {
          id: 2,
          'url': '../../assets/img2.jpg',
          'title': 'Free 2.2'
        },
        {
          id: 2,
          'url': '../../assets/img2.jpg',
          'title': 'Free 2.3'
        },
        {
          id: 2,
          'url': '../../assets/img2.jpg',
          'title': 'Free 2.4'
        }
      ]
    },

  ];
  ngOnInit() {
  }

}
