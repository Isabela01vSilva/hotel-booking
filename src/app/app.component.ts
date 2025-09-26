import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from "./_components/base/base.component";
import { FooterComponent } from "./_components/footer/footer.component";
import { HeaderComponent } from "./_components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel';
}
