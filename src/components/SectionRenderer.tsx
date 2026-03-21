import type { Section } from '@/types/content';
import { AboutSectionView } from '@/components/sections/AboutSection';
import { ContactSectionView } from '@/components/sections/ContactSection';
import { FooterSectionView } from '@/components/sections/FooterSection';
import { HeroSectionView } from '@/components/sections/HeroSection';
import { IntroductorySectionView } from '@/components/sections/IntroductorySection';
import { ProjectsSectionView } from '@/components/sections/ProjectsSection';
import { ServicesSectionView } from '@/components/sections/ServicesSection';
import { VisionMissionSectionView } from '@/components/sections/VisionMissionSection';

type Props = { section: Section };

export function SectionRenderer({ section }: Props) {
  switch (section.type) {
    case 'hero':
      return <HeroSectionView section={section} />;
    case 'visionMission':
      return <VisionMissionSectionView section={section} />;
    case 'introductory':
      return <IntroductorySectionView section={section} />;
    case 'services':
      return <ServicesSectionView section={section} />;
    case 'about':
      return <AboutSectionView section={section} />;
    case 'projects':
      return <ProjectsSectionView section={section} />;
    case 'contact':
      return <ContactSectionView section={section} />;
    case 'footer':
      return <FooterSectionView section={section} />;
    default:
      return (
        <section className="border-b border-red-200 bg-red-50 px-4 py-8">
          <p className="text-sm text-red-700">
            Unknown section type: {(section as { type?: string }).type ?? 'undefined'}
          </p>
        </section>
      );
  }
}
