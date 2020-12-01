import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController,) { }

  async presentAlert(message) {
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
        handler: (isSuccess) => {
          console.log("redirecting here");
        }
      }],
    });

    await alert.present();
  }

}
