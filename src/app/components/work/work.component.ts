import { Component, inject } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { PanelService, PROJECTS } from '../../services/panel.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  private panel = inject(PanelService);
  readonly projects: Project[] = PROJECTS;

  openPanel(i: number): void {
    this.panel.open(i);
  }
}
