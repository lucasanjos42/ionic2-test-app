import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceProvider {

  api: string = 'http://yourURLhere:3000/'

  constructor(public http: Http) {

  }

  getData() {
    return this.http.get(this.api + 'users').map(res => res.json());
  }

  postData(data) {

    let headers = new Headers();

    return this.http.post(this.api + 'users', data, {
      headers: headers
    }).map(
      (res: Response) => { return res.json() }
      );

  }

  putData(data) {

    let headers = new Headers();

    return this.http.put(this.api + 'users/' + data.user.id, data, {
      headers: headers
    }).map(
      (res: Response) => { return res.json() }
      );

  }

  deleteData(id) {

    return this.http.delete(this.api + 'users/' + id)
      .map(
      (res: Response) => { return res.json() }
      );

  }

}
