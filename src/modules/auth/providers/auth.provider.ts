import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  parseErrorCode(error: { code: string, message: string }) {
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