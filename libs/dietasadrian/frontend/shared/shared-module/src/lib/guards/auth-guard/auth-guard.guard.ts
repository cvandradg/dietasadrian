// import { inject } from '@angular/core';
// import { map, UnaryFunction, Observable, take } from 'rxjs';
// import { AuthService } from '../../services/auth/auth-service.service';
// // import { SharedStoreFacade } from '@shared-modules/+state/shared-store.facade';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { User } from 'firebase/auth';
// import { Auth, user } from '@angular/fire/auth';

// export type AuthPipeGenerator = (
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => AuthPipe;
// export type AuthPipe = UnaryFunction<
//   Observable<User | null>,
//   Observable<boolean | string | any[]>
// >;

// export const loggedIn: AuthPipe = map((user) => !!user);

// export const domainGuard = () => {
//   const auth = inject(Auth);
//   const router = inject(Router);
//   const state = inject(RouterStateSnapshot);
//   const next = inject(ActivatedRouteSnapshot);
//   //   const authService = inject(AuthService);

//   const authPipeFactory =
//     (next.data['authGuardPipe'] as AuthPipeGenerator) || (() => loggedIn);

//   return user(auth).pipe(
//     take(1),
//     authPipeFactory(next, state),
//     map((can) => {
//       if (typeof can === 'boolean') {
//         return can;
//       } else if (Array.isArray(can)) {
//         return router.createUrlTree(can);
//       } else {
//         // TODO(EdricChan03): Add tests
//         return router.parseUrl(can);
//       }
//     })
//   );
// };

// // return authService.getUserSession().pipe(
// //   map((user) => {
// //     console.log('dentro del map', user);

// //     // router.navigateByUrl('/notauthorized');

// //     if (!user) return router.parseUrl('/login');

// //     return !!user;
// //   })
// // );

// // canActivateChild(
// //   childRoute: ActivatedRouteSnapshot,
// //   state: RouterStateSnapshot
// // ):
// //   | boolean
// //   | UrlTree
// //   | Observable<boolean | UrlTree>
// //   | Promise<boolean | UrlTree> {
// //      ...guard logic...
// // }
