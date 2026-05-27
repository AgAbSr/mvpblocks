'use client';

import { PixelCard } from '../ui/pixelcards';
import { geist } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { CloudLightning, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeBadge from '../ui/home-badge';
import { Beam } from '../ui/gridbeam';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CardHoverEffect } from '../ui/pulse-card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const PIXEL_SCRIPT_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pixel-RKkUKH2OXWk9adKbDnozmndkwseTQh.js';

const HERO_CARDS = [
  {
    title: 'V0 Compatible',
    description: 'Edit and customize visually, instantly.',
    icon: <CloudLightning className="h-full w-full" />,
    variant: 'rose',
    showGridLines: true,
  },
  {
    title: 'Animated Out of Box',
    description: 'No setup and smooth UI interactions.',
    icon: <Sparkles className="h-full w-full" />,
    variant: 'rose',
    showGridLines: true,
  },
] as const;

const CARD_CONFIGURATIONS = [
  {
    color: 'rose',
    icon: 'Blocks',
    label: 'Command',
    canvasProps: { gap: 3, speed: 80, colors: '#fff, #fda4af, #e11d48' },
    number: 100,
    desc: 'Components available',
  },
  {
    color: 'rose',
    icon: 'f',
    label: 'Dropper',
    canvasProps: { gap: 3, speed: 80, colors: '#fff, #fda4af, #e11d48' },
    number: 15,
    desc: 'Categories available',
  },
] as const;

// Low-priority hints for decorative images. Passed as a spread because next/image
// types do not list fetchPriority but the underlying <img> accepts it.
const DECORATIVE_HINTS = {
  loading: 'lazy' as const,
  fetchPriority: 'low' as const,
};

export default function Hero() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          import('@/lib/load-script').then(({ loadScript }) => {
            loadScript(PIXEL_SCRIPT_URL)
              .then(() => {
                setIsScriptLoaded(true);
              })
              .catch((error) => {
                console.error('Error loading pixel script:', error);
              });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="hero-section"
      className="bg-background relative min-h-screen w-full overflow-x-hidden py-32 md:px-6"
    >
      {/* Main content first in DOM so the browser parses + paints text + the LCP rose image
          BEFORE fetching/decoding the decorative corner vectors below. */}
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <HomeBadge />
        </motion.div>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <Beam />
          <motion.h1
            className={cn(
              'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 max-w-5xl bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none',
              geist.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            Prebuilt UI
            <Image
              src="https://i.postimg.cc/Bb5yKkFF/rose.webp"
              alt="Logo"
              width={500}
              height={500}
              draggable={false}
              priority
              className="mx-4 mb-2 inline-block h-12 w-12 md:h-16 md:w-16"
            />
            blocks to ship beautiful MVPs fast.
          </motion.h1>
        </div>
        <motion.div
          className="mx-auto mt-5 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-xl">
            Copy-paste beautiful, responsive components without worrying about
            styling or animations. Build faster, launch sooner.
          </p>
        </motion.div>
        <motion.div
          className="mt-8 flex justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          <Link prefetch={false} href="/docs/introduction">
            <Button className="bg-gradient-to-b from-rose-500 to-rose-700 text-sm text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]">
              Get started
            </Button>
          </Link>
          <Link prefetch={false} href="/about">
            <Button variant={'secondary'}>
              About <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="mt-5 flex items-center justify-center gap-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          <motion.img
            draggable={false}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
            src="https://i.postimg.cc/13RxpmJ3/vector4.webp"
            alt="Next.js"
            loading="lazy"
            fetchPriority="low"
            className="mt-4 mr-2 hidden w-96 brightness-[4] select-none xl:block"
          />
          <span className="text-sm text-gray-500">
            We use industry standards like{' '}
          </span>
          <Image
            src="https://i.postimg.cc/httwXCtJ/nextjs.webp"
            draggable={false}
            alt="Next.js"
            width={28}
            height={28}
            {...DECORATIVE_HINTS}
            className="h-7 w-7 select-none"
          />
          <Image
            src="https://i.postimg.cc/RZpYKcWg/tailwind.webp"
            alt="Tailwind CSS"
            width={28}
            height={28}
            className="h-7 w-7 select-none"
            draggable={false}
            {...DECORATIVE_HINTS}
          />
          <Image
            src="https://i.postimg.cc/8CqnnNBW/framer.webp"
            alt="Framer Motion"
            width={24}
            height={24}
            className="h-6 w-6 select-none"
            draggable={false}
            {...DECORATIVE_HINTS}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-4 ml-2 hidden w-96 select-none xl:block"
          >
            <Image
              src="https://i.postimg.cc/SKjwvZ00/vector3.webp"
              alt="Vector graphic"
              width={384}
              height={100}
              draggable={false}
              {...DECORATIVE_HINTS}
              className="brightness-[4]"
            />
          </motion.div>
        </motion.div>
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <main className="bg-background dark:bg-background m-auto flex w-full flex-col items-center justify-center gap-8 p-6 text-left text-gray-800 sm:flex-row xl:p-4 dark:text-[#e3e3e3]">
            {isScriptLoaded && (
              <motion.div
                className="bg-background absolute top-[45%] left-28 z-50 hidden h-[370px] w-[300px] xl:block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.5 }}
              >
                <PixelCard
                  key={CARD_CONFIGURATIONS[0].label}
                  label={CARD_CONFIGURATIONS[0].label}
                  canvasProps={CARD_CONFIGURATIONS[0].canvasProps}
                  number={CARD_CONFIGURATIONS[0].number}
                  icon={CARD_CONFIGURATIONS[0].icon}
                  desc={CARD_CONFIGURATIONS[0].desc}
                  color={CARD_CONFIGURATIONS[1].color}
                />
              </motion.div>
            )}
            {isScriptLoaded && (
              <motion.div
                className="bg-background absolute top-[45%] right-28 z-50 hidden h-[370px] w-[300px] xl:block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.5 }}
              >
                <PixelCard
                  color={CARD_CONFIGURATIONS[1].color}
                  icon={CARD_CONFIGURATIONS[1].icon}
                  key={CARD_CONFIGURATIONS[1].label}
                  label={CARD_CONFIGURATIONS[1].label}
                  canvasProps={CARD_CONFIGURATIONS[1].canvasProps}
                  number={CARD_CONFIGURATIONS[1].number}
                  desc={CARD_CONFIGURATIONS[1].desc}
                />
              </motion.div>
            )}
            {HERO_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.25 }}
              >
                <CardHoverEffect
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  variant={card.variant}
                  glowEffect={true}
                  size={'lg'}
                  showGridLines={card.showGridLines}
                />
              </motion.div>
            ))}
          </main>
        </div>
      </div>

      {/* Decorative corner vectors moved to END of DOM. They are absolute-positioned, so
          visual layout is unchanged. Browser now fetches/decodes them AFTER main content. */}
      <Image
        src="https://i.postimg.cc/9FdVdN2J/vector1.webp"
        alt=""
        width={300}
        draggable={false}
        height={300}
        aria-hidden="true"
        {...DECORATIVE_HINTS}
        className="pointer-events-none absolute top-0 right-0 z-[2] object-cover object-center select-none"
      />
      <Image
        src="https://i.postimg.cc/qR6Hz1Qc/vector2.png"
        alt=""
        width={300}
        height={300}
        draggable={false}
        aria-hidden="true"
        {...DECORATIVE_HINTS}
        className="pointer-events-none absolute top-0 left-0 z-[2] object-cover object-center select-none"
      />
      <Image
        src="https://i.postimg.cc/25Kfksd8/vector5.webp"
        alt=""
        width={300}
        draggable={false}
        height={300}
        aria-hidden="true"
        {...DECORATIVE_HINTS}
        className="pointer-events-none absolute bottom-0 -left-44 z-[2] -rotate-90 object-cover object-center select-none"
      />
      <Image
        src="https://i.postimg.cc/bvJhjytB/vector6.png"
        alt=""
        width={300}
        draggable={false}
        height={300}
        aria-hidden="true"
        {...DECORATIVE_HINTS}
        className="pointer-events-none absolute -right-44 bottom-0 z-[2] rotate-90 object-cover object-center select-none"
      />
    </div>
  );
}
