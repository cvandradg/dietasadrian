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
      return this.errorObject(true, 'El usuario ya existe', error);
    }
    if (error.code === 'auth/invalid-email') {
      return this.errorObject(
        true,
        'Ese correo ya se encuentra en uso.',
        error
      );
    }
    if (error.code === 'auth/operation-not-allowed') {
      return this.errorObject(true, 'Operación no permitida', error);
    }
    if (error.code === 'auth/weak-password') {
      return this.errorObject(true, 'La contraseña es incorrecta', error);
    }

    /**
     * Send verification email Firebase errors
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
      return this.errorObject(true, 'El código ha expirado', error);
    }
    if (error.code === 'auth/invalid-action-code') {
      return this.errorObject(
        true,
        'Ocurrio un error, intentalo de nuevo o contactanos.',
        error
      );
    }
    if (error.code === 'auth/user-disabled') {
      return this.errorObject(true, 'El usuario está deshabilitado', error);
    }
    if (error.code === 'auth/user-not-found') {
      return this.errorObject(true, 'El usuario no existe', error);
    }

    if (error.code === 'auth/invalid-email') {
      return this.errorObject(
        true,
        'El correo electrónico no es válido',
        error
      );
    }
    if (error.code === 'auth/user-disabled') {
      return this.errorObject(true, 'El usuario ha sido deshabilitado', error);
    }
    if (error.code === 'auth/user-not-found') {
      return this.errorObject(true, 'El usuario no existe', error);
    }
    if (error.code === 'auth/wrong-password') {
      return this.errorObject(true, 'La contraseña es incorrecta', error);
    }

    console.log('no entra en ifs? de errores');

    // this.changeDetectorRef.detectChanges();
    return { status: true, message: 'Ocurrió un error, intentalo de nuevo' };
  }

  errorObject(status: boolean, message: string, error: any) {
    return { status, message, error };
  }
}