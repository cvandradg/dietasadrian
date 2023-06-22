// import { inject } from '@angular/core';
// import { HelperService } from '../../services/helperFunctions.service';
// import { tap, filter, mergeMap, map, first } from 'rxjs';
// import { MatDialogState } from '@angular/material/dialog';
// import { AuthService } from '@services/auth/auth-service.service';
// import { SharedStoreFacade } from '@shared-modules/+state/shared-store.facade';
// import { Router } from '@angular/router';

// export const domainGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);


//   authService.getUserSession().subscribe((user) => {
//     console.log('valor en guard', !!user);
//   });

//   return true 

//   // return authService.getUserSession().pipe(
//   //   map((user) => {
//   //     console.log('dentro del map', user);
      
//   //     // router.navigateByUrl('/notauthorized');

//   //     if (!user) return router.parseUrl('/login');

//   //     return !!user;
//   //   })
//   // );
// };

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
