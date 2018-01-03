import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthProvider {

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) { 
    this.user$ = this.afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  fetchUserData(uid: string) {
    return this.afDatabase.object(`/users/${uid}`).query.once('value')
      .then(snap => {
        if (snap.val()) return snap.val();
        else throw 'Datos de usuario no encontrados';
      });
  }

  parseErrorCode(error: { code: string, message: string }): string {
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/invalid-email':
      case 'auth/user-not-found':  
        return 'Correo o contraseña inválidos';
      case 'auth/user-disabled':
        return 'Tu cuenta se encuentra desactivada, comunicate con el administrador';
      case 'auth/unauthorized-domain':
      case 'auth/app-not-authorized':
        return 'Dominio no autorizado para autenticación, comunicate con el administrador';
      case 'auth/too-many-requests':
        return 'Comportamiento inusual desde este dispositivo';
      case 'auth/network-request-failed':
        return 'Error de conexión, por favor intentalo nuevamente';
      default:
        return 'Undefined error';
    }
  }

}