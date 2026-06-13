import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface SkillGroup { label: string; skills: string[]; }

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly skillGroups: SkillGroup[] = [
    { label: 'Languages',    skills: ['Python', 'JavaScript', 'Java', 'SQL', 'HTML / CSS'] },
    { label: 'Frameworks',   skills: ['React', 'Angular', 'Spring Boot', 'FastAPI', 'Django'] },
    { label: 'Tools & Data', skills: ['Docker', 'Git / GitLab', 'PostgreSQL', 'MySQL', 'Neo4j', 'Figma'] }
  ];
}
