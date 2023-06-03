import { Injectable, ErrorHandler } from '@angular/core';
import { SharedStoreFacade } from '@shared-modules/+state/shared-store.facade';
import { FirebaseError } from 'firebase/app';

interface AngularFireError extends Error {
  rejection: FirebaseError;
}

function errorIsAngularFireError(err: any): err is AngularFireError {
  return err.rejection && err.rejection.name === 'FirebaseError';
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private sharedStoreFacade: SharedStoreFacade) {}

  handleError(error: any): void {
    this.sharedStoreFacade.hideLoader();

    if (errorIsAngularFireError(error)) {
      return;
    }

    console.warn('Error is been handled by our global error handler.\n', error);
  }

  firebaseErrorHandler(error: FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return this.errorObject(true, 'El usuario ya existe.', error);
      case 'auth/operation-not-allowed':
        return this.errorObject(
          true,
          'Ocurrió un error, inténtalo de nuevo.',
          error
        );
      case 'auth/weak-password':
        return this.errorObject(true, 'La contraseña es muy débil.', error);
      case 'auth/missing-android-pkg-name':
        return this.errorObject(
          true,
          'Problema con adroid pkg name, ponte en contacto con nosotros.',
          error
        );
      case 'auth/missing-continue-uri':
        return this.errorObject(
          true,
          'Problema con el URL, ponte en contacto con nosotros.',
          error
        );
      case 'auth/missing-ios-bundle-id':
        return this.errorObject(
          true,
          'Problema con ios bundle id, ponte en contacto con nosotros.',
          error
        );
      case 'auth/invalid-continue-uri':
        return this.errorObject(
          true,
          'Problema con URL invalido, ponte en contacto con nosotros.',
          error
        );
      case 'auth/unauthorized-continue-uri':
        return this.errorObject(
          true,
          'Problema el dominio del URL, ponte en contacto con nosotros.',
          error
        );
      case 'auth/expired-action-code':
        return this.errorObject(true, 'El código ha expirado.', error);
      case 'auth/invalid-action-code':
        return this.errorObject(
          true,
          'Ocurrio un error, inténtalo de nuevo o contáctanos.',
          error
        );
      case 'auth/user-disabled':
        return this.errorObject(true, 'El usuario está deshabilitado.', error);
      case 'auth/user-not-found':
        return this.errorObject(true, 'No se encontró este usuario.', error);

      case 'auth/invalid-email':
        return this.errorObject(
          true,
          'El correo electrónico no es válido.',
          error
        );
      case 'auth/wrong-password':
        return this.errorObject(true, 'La contraseña es incorrecta.', error);
      case 'auth/account-exists-with-different-credential':
        return this.errorObject(
          true,
          'Ese correo ya se encuentra en uso.',
          error
        );
      case 'auth/auth-domain-config-required':
        return this.errorObject(
          true,
          'Ocurrió un error, inténtalo de nuevo.',
          error
        );
      case 'auth/cancelled-popup-request':
        return this.errorObject(
          true,
          'Se cerró la ventana, intentalo de nuevo.',
          error
        );
      case 'auth/operation-not-supported-in-this-environment':
        return this.errorObject(
          true,
          'En esta plataforma esta accion no es posible.',
          error
        );
      case 'auth/popup-blocked':
        return this.errorObject(
          true,
          'Tu buscador no permite abrir ventanas emergentes.',
          error
        );
      case 'auth/popup-closed-by-user':
        return this.errorObject(
          true,
          'Se cerró la ventana, intentalo de nuevo.',
          error
        );
      case 'auth/unauthorized-domain':
        return this.errorObject(
          true,
          'Ocurrió un error, inténtalo de nuevo.',
          error
        );
      case 'auth/missing-email':
        return this.errorObject(
          true,
          "Escribe tu correo en la parte superior y presiona de nuevo 'Recuperar Contraseña.'",
          error
        );

      case 'auth/too-many-requests':
        return this.errorObject(true, 'Espera unos minutos antes de volverlo a intentar.', error);
      default:
        throw new Error("Error code doesn't exist " + error.code, error);
    }
  }

  errorObject(status: boolean, message: string, error: any) {
    return { status, message, error };
  }
}
