import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  async showLoader(message, cssClass) {
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: message,
      translucent: true,
      cssClass: cssClass,
      backdropDismiss: false
    });
    await loading.present();

  }

  async hideLoader() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed with role:', res);
    })
      .catch((error) => {
        console.log('error', error);
      })
  }

}
