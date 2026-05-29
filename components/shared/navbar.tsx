'use client';

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import { memo, useCallback, useState } from 'react';
import { ModeToggle } from '../ui/mode-toggle';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Github, Heart } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Docs', link: '/docs/introduction' },
  { name: 'About', link: '/about' },
  { name: 'Templates', link: '/templates' },
  { name: 'Hire Me', link: 'https://cal.com/aura-devs/15min' },
  { name: 'Showcase', link: '/showcase' },
] as const;

const goToGithub = () =>
  redirect('https://github.com/subhadeeproy3902/mvpblocks');
const goToSponsor = () =>
  redirect('https://github.com/sponsors/subhadeeproy3902');

const MobileNavItem = memo(function MobileNavItem({
  item,
  onClose,
}: {
  item: (typeof NAV_ITEMS)[number];
  onClose: () => void;
}) {
  return (
    <a
      href={item.link}
      onClick={onClose}
      className="relative flex items-center justify-between text-neutral-600 dark:text-neutral-300"
    >
      <span className="block">{item.name}</span>
      {item.name === 'Templates' && (
        <button className="group border-primary bg-primary pointer-events-none relative z-50 ml-1 inline-block cursor-pointer rounded-md border-2 px-1 py-0.5 text-[9px] font-medium text-white duration-1000 select-none hover:shadow-lg hover:shadow-red-500/50">
          <span className="absolute top-0 left-0 size-full rounded-sm border border-dashed border-white shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
          <span className="absolute top-0 left-0 size-full rotate-180 rounded-sm border-white shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
          New
        </button>
      )}
    </a>
  );
});

export const NavbarDemo = memo(function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    [],
  );
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <Navbar className="z-[150]">
      <NavBody>
        <NavbarLogo />
        <NavItems
          items={NAV_ITEMS as unknown as (typeof NAV_ITEMS)[number][]}
        />
        <div className="flex items-center gap-3">
          <NavbarButton variant="gradient">
            <Link
              prefetch={false}
              href="https://github.com/sponsors/subhadeeproy3902"
              className="flex items-center justify-center gap-2"
            >
              <Heart className="inline-block h-4 w-4 fill-white text-white" />
              Sponsor
            </Link>
          </NavbarButton>

          <NavbarButton
            variant="gradient"
            className="text-foreground hover:text-primary bg-secondary/50 hover:bg-secondary/60 z-50 aspect-square size-9! p-1!"
          >
            <Link
              href="https://github.com/subhadeeproy3902/mvpblocks"
              prefetch={false}
              className="h-full w-full"
            >
              <Github className="m-auto h-4 w-4" />
            </Link>
          </NavbarButton>
          <ModeToggle />
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMenu} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMenu}>
          {NAV_ITEMS.map((item) => (
            <MobileNavItem key={item.name} item={item} onClose={closeMenu} />
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              variant="gradient"
              className="bg-secondary/50 hover:bg-secondary/60 w-full"
              onClick={goToGithub}
            >
              Github
            </NavbarButton>

            <NavbarButton
              variant="gradient"
              className="flex w-full items-center justify-center gap-1"
              onClick={goToSponsor}
            >
              <Heart className="inline-block h-4 w-4 fill-white text-white" />
              Sponsor
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
});
