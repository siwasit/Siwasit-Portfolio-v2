import { Component, computed, HostListener, inject } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-project-panel',
  standalone: true,
  imports: [],
  templateUrl: './project-panel.component.html',
  styleUrl: './project-panel.component.scss'
})
export class ProjectPanelComponent {
  private panelService = inject(PanelService);

  readonly openIndex = this.panelService.openIndex;
  readonly projects = this.panelService.projects;

  readonly isOpen = computed(() => this.openIndex() !== null);
  readonly project = computed(() => {
    const i = this.openIndex();
    return i !== null ? this.projects[i] : null;
  });

  close(): void {
    this.panelService.close();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.close();
  }
}
