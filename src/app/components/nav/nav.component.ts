import { Component, HostListener, OnInit, signal } from '@angular/core';

interface NavLink { id: string; label: string; }

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  readonly links: NavLink[] = [
    { id: 'profile',    label: 'Profile'    },
    { id: 'experience', label: 'Experience' },
    { id: 'work',       label: 'Work'       },
    { id: 'contact',    label: 'Contact'    }
  ];

  activeSection = signal('profile');

  ngOnInit(): void {
    this.updateActive();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateActive();
  }

  private updateActive(): void {
    const sectionIds = this.links.map(l => l.id);
    let active = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) active = id;
    }
    this.activeSection.set(active);
  }

  isActive(id: string): boolean {
    return this.activeSection() === id;
  }
}
