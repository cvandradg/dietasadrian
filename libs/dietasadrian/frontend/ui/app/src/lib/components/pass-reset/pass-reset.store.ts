






// readonly passReset = this.effect((email$: Observable<string>) => {
//     return email$.pipe(
//       tap(() => this.setPassResetSpinner(true)),
//       switchMap((email) =>
//         this.authService.recoverPassword(email).pipe(
//           tap({
//             next: () => {
//               this.setPassResetRequested(true);
//               this.setPassResetSpinner(false);
//               this.setError(null);
//             },
//             error: (error) => {
//               this.setPassResetSpinner(false);
//               return this.setError(
//                 this.errorHelperService.firebaseErrorHandler(error)
//               );
//             },
//           }),
//           catchError(() => EMPTY)
//         )
//       )
//     );
//   });