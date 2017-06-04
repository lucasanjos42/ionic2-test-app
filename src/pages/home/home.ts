import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  users: any[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public service: ServiceProvider) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getData()
      .subscribe(
      data => this.users = data.users,
      err => console.log(err)
      )
  }

  deleteData(user) {

    let params = user._id;

    this.service.deleteData(params)
      .subscribe(
      data => {
        console.log(data)
        this.getData();
      },
      err => console.log(err)
      );
  }

  putData(user) {
    let prompt = this.alertCtrl.create({
      title: 'Editar Perfil',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Nome',
          value: user.name
        },
        {
          name: 'Email',
          placeholder: 'Email',
          value: user.username
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {

            let params = {
              user: {
                id: user._id,
                name: data.Nome,
                username: data.Email
              }
            };

            this.service.putData(params)
              .subscribe(
              data => {
                console.log(data)
                this.getData();
              },
              err => console.log(err)
              );
          }
        }
      ]
    });
    prompt.present();
  }

}
