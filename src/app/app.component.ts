import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { NavbarComponent } from "./_layout/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SharedModule, NavbarComponent]
})
export class AppComponent {
  title = 'heroes-spa';
}
