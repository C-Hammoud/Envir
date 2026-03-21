import type { Section, SectionType } from '@/types/content';

let idCounter = 0;

function uid(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function createEmptySection(type: SectionType): Section {
  switch (type) {
    case 'hero':
      return {
        id: uid('hero'),
        type: 'hero',
        headline: 'New headline',
        metrics: [],
      };
    case 'visionMission':
      return {
        id: uid('vm'),
        type: 'visionMission',
        title: 'Vision & mission',
        visionTitle: 'Vision',
        visionBody: '',
        missionTitle: 'Mission',
        missionBody: '',
      };
    case 'introductory':
      return {
        id: uid('intro'),
        type: 'introductory',
        title: 'Introduction',
        lead: '',
        paragraphs: [''],
        highlights: [],
      };
    case 'services':
      return {
        id: uid('svc'),
        type: 'services',
        title: 'Services',
        items: [{ title: 'Service', description: '' }],
      };
    case 'about':
      return {
        id: uid('about'),
        type: 'about',
        title: 'About',
        body: [''],
      };
    case 'projects':
      return {
        id: uid('proj'),
        type: 'projects',
        title: 'Projects',
        items: [
          {
            id: uid('p'),
            name: 'Project name',
            image: '/assets/projects/placeholder-cover.svg',
          },
        ],
      };
    case 'contact':
      return {
        id: uid('contact'),
        type: 'contact',
        title: 'Contact',
      };
    case 'footer':
      return {
        id: uid('foot'),
        type: 'footer',
        copyright: '©',
      };
    default: {
      const _e: never = type;
      return _e;
    }
  }
}
