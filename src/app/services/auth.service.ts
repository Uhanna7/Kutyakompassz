import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  autoLogoutOnPageClose() {
    window.addEventListener('beforeunload', () => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.afAuth.signOut();
        }
      });
    });
  }
}
