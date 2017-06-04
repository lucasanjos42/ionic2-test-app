import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

import { ServiceProvider } from '../../providers/service-provider';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  register: any = {};

  constructor(public alertCtrl: AlertController, public formBuilder: FormBuilder, public service: ServiceProvider) {

        this.register = this.formBuilder.group({
          name: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

    postData() {

    let params = {
      user: this.register.value
    };

    this.service.postData(params)
      .subscribe(
      data => {
        console.log(data)
        let alert = this.alertCtrl.create({
          title: 'Sucesso!',
          subTitle: 'Usuário registrado!',
          buttons: [{
            text: 'OK',
            handler: data => {
              this.register.reset();
            }
          }]
        });
        alert.present();
      },
      err => console.log(err)
      );
  }

}
