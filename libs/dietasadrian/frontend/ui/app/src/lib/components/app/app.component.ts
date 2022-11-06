import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentModule } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dietas-adrian-nx-workspace-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}

@NgModule({
  imports: [CommonModule, HeaderComponentModule, RouterModule],
  declarations: [AppComponent],
  exports: [AppComponent],
})
export class AppComponentModule {}
