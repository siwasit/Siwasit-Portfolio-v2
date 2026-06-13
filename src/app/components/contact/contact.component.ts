import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly email = 'siwasit2546@gmail.com';

  sendEmail(e: Event): void {
    e.preventDefault();
    window.location.href = 'mailto:' + this.email;
  }
}
