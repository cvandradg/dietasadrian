import { Route } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { DietsComponent } from './components/diets/diets.component';
import { RutinesComponent } from './components/rutines/rutines.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FoodComponent } from './components/food/food.component';
import { SuplementsComponent } from './components/suplements/suplements.component';
import { ContactUsComponent } from './components/contact-us/contactUs.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'prefix',
        component: ClientComponent,
        children: [
            { path: 'comida', component: FoodComponent },
            { path: 'dietas', component: DietsComponent },
            { path: 'perfil', component: ProfileComponent },
            { path: 'rutinas', component: RutinesComponent },
            { path: 'vestimenta', component: ClothesComponent },
            { path: 'suplementos', component: SuplementsComponent },
            { path: 'contactenos', component: ContactUsComponent },
            { path: '', redirectTo: 'perfil', pathMatch: 'prefix' },
        ]
    }
];
