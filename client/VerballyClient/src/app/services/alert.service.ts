import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController,
    private router: Router) { }

  async presentAlert(message, redirect) {
    let messageAlert = "";
    let isSuccess = message.is_success;
    if (isSuccess !== undefined && isSuccess == true) {
      messageAlert = message.messages;
    }
    else {
      messageAlert = message.messages;
    }
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: messageAlert,
      buttons: [{
        text: 'Close',
        handler: () => {
          if (isSuccess == true) {
            this.router.navigate([redirect[0]]);
          }
          else {
            this.router.navigate([redirect[1]]);
          }
        }
      }],
    });

    await alert.present();
  }

}
