import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  bannerImages = [
    {
      id: 1,
      'url': '../../assets/img1.jpg',
      'title': 'Slide 1'
    },
    {
      id: 2,
      'url': '../../assets/img2.jpg',
      'title': 'Slide 2'
    },

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

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    autoplay: true,
    zoom: {
      maxRatio: 5
    }
  };

  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 'auto',
    spaceBetween: 5,
    autoplay: false,
    grabCursor: true
  };

  constructor() { }

  ngOnInit() {
  }

}
