import { ChangeDetectorRef, Injectable } from '@angular/core';

export { debounce } from '../decorators/debounce.decorator';

@Injectable({
  providedIn: 'root',
})
export class HelperErrorHandlerService {
  error = { status: false, message: '' };

  handleError(error: any): any {
    console.log('error service', error.code);

    /**
     * Creat account Firebase errors
     */
    if (error.code === 'auth/email-already-in-use') {
      return this.errorObject(true, 'El usuario ya existe.', error);
    }
    if (error.code === 'auth/operation-not-allowed') {
      return this.errorObject(true, 'Operación no permitida.', error);
    }
    if (error.code === 'auth/weak-password') {
      return this.errorObject(true, 'La contraseña es incorrecta.', error);
    }

    /**
     * Send verification email and password reset email Firebase errors
     */
    if (error.code === 'auth/missing-android-pkg-name') {
      return this.errorObject(
        true,
        'Problema con adroid pkg name, ponte en contacto con nosotros.',
        error
      );
    }
    if (error.code === 'auth/missing-continue-uri') {
      return this.errorObject(
        true,
        'Problema con el URL, ponte en contacto con nosotros.',
        error
      );
    }
    if (error.code === 'auth/missing-ios-bundle-id') {
      return this.errorObject(
        true,
        'Problema con ios bundle id, ponte en contacto con nosotros.',
        error
      );
    }
    if (error.code === 'auth/invalid-continue-uri') {
      return this.errorObject(
        true,
        'Problema con URL invalido, ponte en contacto con nosotros.',
        error
      );
    }
    if (error.code === 'auth/unauthorized-continue-uri') {
      return this.errorObject(
        true,
        'Problema el dominio del URL, ponte en contacto con nosotros.',
        error
      );
    }
    if (error.code === 'auth/expired-action-code') {
      return this.errorObject(true, 'El código ha expirado.', error);
    }
    if (error.code === 'auth/invalid-action-code') {
      return this.errorObject(
        true,
        'Ocurrio un error, intentalo de nuevo o contactanos.',
        error
      );
    }
    if (error.code === 'auth/user-disabled') {
      return this.errorObject(true, 'El usuario está deshabilitado.', error);
    }
    if (error.code === 'auth/user-not-found') {
      return this.errorObject(true, 'El usuario no existe.', error);
    }

    if (error.code === 'auth/invalid-email') {
      return this.errorObject(
        true,
        'El correo electrónico no es válido.',
        error
      );
    }
    if (error.code === 'auth/user-disabled') {
      return this.errorObject(true, 'El usuario ha sido deshabilitado.', error);
    }
    if (error.code === 'auth/user-not-found') {
      return this.errorObject(true, 'El usuario no existe.', error);
    }
    if (error.code === 'auth/wrong-password') {
      return this.errorObject(true, 'La contraseña es incorrecta.', error);
    }

    /**
     * Password reset Firebase errors
     */
    if (error.code === 'auth/expired-action-code.') {
      return this.errorObject(
        true,
        'Ocurrió un error, inténtalo de nuevo.',
        error
      );
    }
    if (error.code === 'auth/invalid-action-code.') {
      return this.errorObject(
        true,
        'Ocurrió un error, inténtalo de nuevo.',
        error
      );
    }
    if (error.code === 'auth/user-not-found') {
      return this.errorObject(true, 'No se encontró este usuario.', error);
    }
    if (error.code === 'auth/weak-password') {
      return this.errorObject(true, 'La contraseña es muy débil', error);
    }

    /**
     * Check action code Firebase errors
     */
    if (error.code === 'auth/expired-action-code') {
      return this.errorObject(
        true,
        'Ocurrió un error, inténtalo de nuevo.',
        error
      );
    }
    if (error.code === 'auth/invalid-action-code') {
      return this.errorObject(
        true,
        'Ocurrió un error, inténtalo de nuevo.',
        error
      );
    }
    if (error.code === 'auth/user-disabled') {
      return this.errorObject(true, 'La contraseña es muy débil', error);
    }
    if (error.code === 'auth/user-not-found') {
      return this.errorObject(true, 'No se encontró este usuario.', error);
    }

    /**
     * Sign in with popup (brands) Firebase errors
     */

    if (error.code === 'auth/account-exists-with-different-credential') {
      return this.errorObject(true, 'Ese correo ya se encuentra en uso.', error);
    }
    if (error.code === 'auth/auth-domain-config-required') {
      return this.errorObject(true, 'Ocurrió un error, inténtalo de nuevo.', error);
    }
    if (error.code === 'auth/cancelled-popup-request') {
      return this.errorObject(true, 'Se cerró la ventana, intentalo de nuevo.', error);
    }
    if (error.code === 'auth/operation-not-allowed') {
      return this.errorObject(true, 'Ocurrió un error, inténtalo de nuevo.', error);
    }
    if (error.code === 'auth/operation-not-supported-in-this-environment') {
      return this.errorObject(true, 'En esta plataforma esta accion no es posible.', error);
    }
    if (error.code === 'auth/popup-blocked') {
      return this.errorObject(true, 'Tu buscador no permite abrir ventanas emergentes.', error);
    }
    if (error.code === 'auth/popup-closed-by-user') {
      return this.errorObject(true, 'Se cerró la ventana, intentalo de nuevo.', error);
    }
    if (error.code === 'auth/unauthorized-domain') {
      return this.errorObject(true, 'Ocurrió un error, inténtalo de nuevo.', error);
    }
    
    /**
     * Potencial Missing errors in documentation
     */
    if (error.code === 'auth/missing-email') {
      return this.errorObject(true, 'Escribe tu correo en la parte superior y presiona de nuevo \'Recuperar Contraseña.\'', error);
    }

    
    if (error.code === 'auth/too-many-requests') {
      return this.errorObject(true, 'Inténtalo nuevamente.', error);
    }
    


    console.log('no entra en ifs? de errores');

    // this.changeDetectorRef.detectChanges();
    return { status: true, message: 'Ocurrió un error, intentalo de nuevo' };
  }

  errorObject(status: boolean, message: string, error: any) {
    return { status, message, error };
  }
}
