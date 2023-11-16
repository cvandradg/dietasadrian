import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type TertiaryButton = {
  text: string,
  icon: IconProp,
  path: string
}

@Component({
  standalone: true,
  selector: 'lib-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SharedModuleModule],
})
export class DashboardComponent extends firebaseAuthHelper {
  navItems: TertiaryButton[] = [
    { text: "Perfil", icon: ['fas', 'user'], path: "/dashboard/perfil" },
    { text: "Dietas", icon: ['fas', 'salad'], path: "/dashboard/dietas", },
    { text: "Comida", icon: ['fas', 'pot-food'], path: "/dashboard/comida" },
    { text: "Rutinas", icon: ['fas', 'dumbbell'], path: "/dashboard/rutinas" },
    { text: "Vestimenta", icon: ['fas', 'shirt'], path: "/dashboard/vestimenta" },
    { text: "Suplementos", icon: ['fad', 'jar'], path: "/dashboard/suplementos" },
    { text: "Utilidades", icon: ['fas', 'telescope'], path: "/dashboard/utilidades" },
    { text: "Contáctanos", icon: ['fas', 'comments-question-check'], path: "/dashboard/contactenos" }
  ]
}
