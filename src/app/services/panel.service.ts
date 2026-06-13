import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    tag: '01 / BIZX · MULTI-ORG',
    title: 'BizX · Multi-Organization',
    period: 'Netbay PCL · Jan — May 2026',
    tags: ['Angular', 'Java Spring Boot', 'Ant Design', 'GitLab'],
    problem: 'Enterprise clients needed to model and manage complex corporate structures — parent companies, subsidiaries and the relationships between them — directly inside the BizX platform, where the legacy flow offered no clear way to see or edit those connections.',
    solution: 'Designed a hierarchy visualization that renders corporate relationships at a glance, paired with full CRUD for company management. Everything was built to stay compatible with the existing codebase and to integrate cleanly with Netbay\'s internal services.',
    role: 'Front-end and back-end developer on the Multi-Organization module, owning both the visualization layer and the company-management CRUD.',
    linkLabel: 'Netbay PCL',
    linkHref: 'https://www.netbay.co.th',
    figLabel: 'fig.01 — hierarchy view',
    figNumber: '01'
  },
  {
    tag: '02 / NETBAY IBOX',
    title: 'Netbay IBox',
    period: 'Netbay PCL · Jan — May 2026',
    tags: ['Angular', 'Ant Design'],
    problem: 'Admins managing IBox lacked a single place to configure the system, and configuration still living in the legacy IBox app had to move to the current platform without losing data.',
    solution: 'Built four CRUD pages covering four configuration types and migrated company configuration from the legacy app to the current one. Shipped to the development environment for QA before raising merge requests to UAT.',
    role: 'Front-end developer — built the admin CRUD UI and led the configuration migration.',
    linkLabel: 'Netbay PCL',
    linkHref: 'https://www.netbay.co.th',
    figLabel: 'fig.02 — admin console',
    figNumber: '02'
  },
  {
    tag: '03 / MEWS APP',
    title: 'MEWS Application',
    period: 'Academic · Mar 2024 — 2025',
    tags: ['Flutter', 'Firebase'],
    problem: 'Nurses needed a fast, consistent way to score patient urgency (Modified Early Warning Score) at the bedside, where manual calculation is slow and error-prone.',
    solution: 'A Flutter app with a Firebase backend that lets nurses assess and triage urgency levels in seconds. Requirements engineering with the client, plus full mockup and prototyping before development.',
    role: 'Project manager, business analyst and system analyst — plus full-stack development of the Firebase API and Flutter front-end.',
    linkLabel: 'GitHub',
    linkHref: 'https://github.com/siwasit',
    figLabel: 'fig.04 — mobile app',
    figNumber: '04'
  }
];

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
