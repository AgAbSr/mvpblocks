'use client';

import { Heart } from 'lucide-react';
import { NavbarButton } from '@/components/ui/resizable-navbar';
import { redirect } from 'next/navigation';
import { memo } from 'react';

const goToSponsor = () =>
  redirect('https://github.com/sponsors/subhadeeproy3902');

export const SponsorButton = memo(function SponsorButton() {
  return (
    <NavbarButton
      variant="gradient"
      className="bg-secondary/50 hover:bg-secondary/60 flex w-full items-center justify-center gap-1 hover:translate-0!"
      onClick={goToSponsor}
    >
      <Heart className="fill-primary text-primary inline-block h-4 w-4" />
      Sponsor
    </NavbarButton>
  );
});
