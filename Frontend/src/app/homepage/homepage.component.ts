import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    TagModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  features = [
    {
      icon: 'pi pi-mobile',
      title: 'Responsive Design',
      description: 'Fully responsive layouts that work on any device',
    },
    {
      icon: 'pi pi-bolt',
      title: 'Fast Performance',
      description: 'Optimized for speed and smooth user experience',
    },
    {
      icon: 'pi pi-lock',
      title: 'Secure Platform',
      description: 'Enterprise-grade security for your peace of mind',
    },
    {
      icon: 'pi pi-cog',
      title: 'Customizable',
      description: 'Easily customize to match your brand identity',
    },
  ];
}
