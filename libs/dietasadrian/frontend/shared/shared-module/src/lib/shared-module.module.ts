import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { MODULES } from './exports/export-modules';
import { Fontawesome } from './classes/fontawesome';
import { SERVICES } from './exports/export-services';
import { COMPONENTS } from './exports/export-components';
import { SharedStoreFacade } from './+state/shared-store.facade';
import * as fromSharedStore from './+state/shared-store.reducer';
import { SharedStoreEffects } from './+state/shared-store.effects';

@NgModule({
  imports: [
    MODULES,
    COMPONENTS,
    CommonModule,
    EffectsModule.forFeature([SharedStoreEffects]),
    StoreModule.forFeature(
      fromSharedStore.SHARED_STORE_FEATURE_KEY,
      fromSharedStore.sharedStoreReducer
    ),
  ],
  exports: [MODULES, COMPONENTS],
  providers: [SERVICES, SharedStoreFacade],
})
export class SharedModuleModule extends Fontawesome {}
