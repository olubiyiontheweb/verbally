import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  menuTabObject = [
    {
      tab: 'front',
      name: 'Home',
      icon: 'home-outline'
    },
    {
      tab: 'collection',
      name: 'Yarns',
      icon: 'play-circle-outline'
    },
  ];
  accountLoginStatus: boolean;
  private _authServiceSubscription;
  updateMenuList: string;

  constructor(private authServicesService: AuthServicesService,
    private cdRef: ChangeDetectorRef,
  ) {
    this._authServiceSubscription = this.authServicesService.onChange.subscribe({
      next: (event) => {
        if (event !== undefined && event.message != '') {
          this.setTabMenuObject();
        }
      }
    })
  }

  ngOnInit() {
  }


  setTabMenuObject() {
    this.menuTabObject = [
      {
        tab: 'collection',
        name: 'Yarns',
        icon: 'play-circle-outline'
      },
      {
        tab: 'yarn',
        name: 'Yarn',
        icon: 'add-circle-outline'
      },
      {
        tab: 'profile',
        name: 'Me',
        icon: 'happy-outline'
      }
    ];
  }

}
