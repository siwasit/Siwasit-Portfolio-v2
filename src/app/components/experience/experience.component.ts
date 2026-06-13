import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

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
  readonly entries: ExperienceEntry[] = [
    {
      dateTop: 'June — Present',
      dateBottom: '2026',
      company: 'Netbay PCL',
      role: 'Junior Software Developer · Full Time',
      isActive: true,
      bullets: [],
      tags: ['Angular', 'Java Spring Boot', 'Ant Design', 'GitLab']
    },
    {
      dateTop: 'Jan — May',
      dateBottom: '2026',
      company: 'Netbay PCL',
      role: 'Software Developer · Long‑term Internship',
      isActive: false,
      bullets: [
        { text: 'Contributed to front‑end and back‑end development of the {BizX} web application.', highlights: ['BizX'] },
        { text: 'Built the {Multi‑Organization} module: a hierarchy visualization for complex corporate relationships.', highlights: ['Multi‑Organization'] },
        { text: 'Developed company‑management CRUD features, fully compatible with the existing codebase, and integrated with Netbay services.', highlights: [] }
      ],
      tags: ['Angular', 'Java Spring Boot', 'Ant Design', 'GitLab']
    },
    {
      dateTop: 'Jun — Aug',
      dateBottom: '2025',
      company: 'Ideatrade',
      role: 'Web Developer · Summer Internship',
      isActive: false,
      bullets: [
        { text: 'Maintained the Ideatrade platform and built stock, options & DR visualizations to onboard new traders.', highlights: [] },
        { text: 'Built {Sinyal}, a tool that evaluates stock signals from technical indicators.', highlights: ['Sinyal'] },
        { text: 'Scraped {10,629} instruments across 7 global markets and automated the pipeline behind a web API.', highlights: ['10,629'] }
      ],
      tags: ['React.js', 'FastAPI', 'Tailwind', 'Vite', 'Web Scraping']
    },
    {
      dateTop: 'Aug 23 — Dec',
      dateBottom: '2024',
      company: 'Thammasat School of Engineering',
      role: 'Teaching Assistant',
      isActive: false,
      bullets: [
        { text: 'Supported lecturers with homework, weekly quizzes and classroom activities.', highlights: [] },
        { text: 'Graded quizzes, mid‑term and final exams, and finalized student grades.', highlights: [] }
      ],
      tags: []
    }
  ];

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
