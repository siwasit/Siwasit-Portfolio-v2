import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { WorkComponent } from './components/work/work.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectPanelComponent } from './components/project-panel/project-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    ExperienceComponent,
    WorkComponent,
    ContactComponent,
    ProjectPanelComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
