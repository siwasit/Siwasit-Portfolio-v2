import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import expData from '../../../content/experience.json';

interface ExperienceEntry {
  dateTop: string;
  dateBottom: string;
  company: string;
  role: string;
  bullets: { text: string; highlights: string[] }[];
  tags: string[];
  isActive: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  readonly entries: ExperienceEntry[] = expData.entries;

  parseBullet(text: string): { part: string; isHighlight: boolean }[] {
    const segments: { part: string; isHighlight: boolean }[] = [];
    const regex = /\{([^}]+)\}/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ part: text.slice(lastIndex, match.index), isHighlight: false });
      }
      segments.push({ part: match[1], isHighlight: true });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      segments.push({ part: text.slice(lastIndex), isHighlight: false });
    }
    return segments;
  }
}
