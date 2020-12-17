
import { Platform } from '@ionic/angular';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

export class AuthServicesServiceEvent {
  message: string;
  token: number;
}

const TOKEN_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  authenticationState = new BehaviorSubject(false);
  public onChange: EventEmitter<AuthServicesServiceEvent> = new EventEmitter<AuthServicesServiceEvent>();
  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  setToken(token) {
    this.onChange.emit({ message: 'tokenUpdate', token: token });
    return this.storage.set(TOKEN_KEY, token);
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
