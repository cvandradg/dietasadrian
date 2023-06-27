import { Validators } from '@angular/forms';
import { User } from 'firebase/auth';

export type Class = new (any: any) => any;

// export type Constructor<TResult, TParams extends any[] = any[]> = new (
//     ...params: TParams
// ) => TResult;

//Recibes a TResult type, which is any interface desired (it seems)
//https://www.typescriptlang.org/docs/handbook/mixins.html
//https://bryntum.com/blog/the-mixin-pattern-in-typescript-all-you-need-to-know/
//
// export type Constructor<TResult, TParams extends any[] = any[]> = new (
//   ...params: TParams
// ) => TResult;

export const validations = (...validators: any[]) => [
  '',
  [Validators.required, Validators.min(5), Validators.max(30), ...validators],
];

export type generalError = { status: boolean; message: string; error: any };

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj || ''));

export type Credentials = {
  user: string;
  pass: string;
};

export type AppError = {
  status: boolean;
  message: string;
  error: any;
};

export interface BaseComponentState extends Object {
  error: AppError | null;
  loading: boolean;
}
