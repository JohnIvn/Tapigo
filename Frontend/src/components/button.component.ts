import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'button-demo',
  templateUrl: './button-demo.html',
  standalone: true,
  imports: [ButtonModule],
})
export class ButtonDemo {}
