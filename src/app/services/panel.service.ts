import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
import projectsData from '../../content/projects.json';

export const PROJECTS: Project[] = projectsData.projects;

@Injectable({ providedIn: 'root' })
export class PanelService {
  readonly openIndex = signal<number | null>(null);
  readonly projects = PROJECTS;

  open(i: number): void {
    this.openIndex.set(i);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.openIndex.set(null);
    document.body.style.overflow = '';
  }
}
