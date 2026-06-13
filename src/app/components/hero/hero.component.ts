import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import heroData from '../../../content/hero.json';

interface SkillGroup { label: string; skills: string[]; }

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly skillGroups: SkillGroup[] = heroData.skillGroups;
}
