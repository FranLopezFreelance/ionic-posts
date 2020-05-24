import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private alertController: AlertController,
    public toastController: ToastController
  ) { }

  async alertInfo(message: string) {
    const alert = await this.alertController.create({
      header: 'Ha ocurrido un error',
      message,
      buttons: ['ENTENDIDO']
    });

    await alert.present();
  }

  async toastMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
