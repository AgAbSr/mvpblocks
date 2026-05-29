'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { geist } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { blogs, type Blog } from '@/constants/blogs';

const MOTION_HIDDEN = { opacity: 0, y: 50 } as const;
const MOTION_VISIBLE = { opacity: 1, y: 0 } as const;
const HEADER_TRANSITION = { duration: 0.5, delay: 0 } as const;
const INVIEW_OPTS = { once: true, amount: 0.2 } as const;
const EMBLA_OPTIONS = { loop: true, align: 'center', skipSnaps: false } as const;

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

// ─── Embla controls ───────────────────────────────────────────────────────────

type EmblaControls = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

function useEmblaControls(
  emblaApi: EmblaCarouselType | undefined,
): EmblaControls {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotClick = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);
  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
    return () => {
      emblaApi
        .off('reInit', onInit)
        .off('reInit', onSelect)
        .off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotClick, onPrev, onNext };
}

// ─── Blog card (CSS-only scale, memoized) ─────────────────────────────────────

const BlogCard = memo(function BlogCard({
  blog,
  active,
}: {
  blog: Blog;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        'h-full transform-gpu transition-[transform,opacity] duration-500 ease-out',
        active ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-60',
      )}
    >
      <Link
        href={blog.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group border-border from-secondary/20 to-card flex h-full flex-col overflow-hidden rounded-xl border bg-gradient-to-b p-3 no-underline shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-colors"
      >
        {/* Cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
            draggable={false}
            unoptimized
            className="object-cover transition-transform duration-500 select-none group-hover:scale-105"
          />

          {/* Hover affordance */}
          <span className="bg-primary text-primary-foreground absolute top-3 right-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-2 pt-5 pb-3">
          <span className="text-primary mb-2 text-sm tracking-wide">
            {blog.subtitle}
          </span>
          <h3 className="text-foreground line-clamp-2 text-lg leading-snug font-medium tracking-tight">
            {blog.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-xs leading-relaxed">
            {blog.desc}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center gap-3 pt-4">
            <Image
              src={blog.authorAvatar}
              alt={blog.author}
              width={32}
              height={32}
              draggable={false}
              unoptimized
              className="border-border bg-foreground h-8 w-8 rounded-full border object-cover select-none"
            />
            <div className="flex min-w-0 flex-col">
              <span className="text-foreground truncate text-xs font-medium">
                {blog.author}
              </span>
              <span className="text-muted-foreground text-xs">
                {formatDate(blog.date)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

// ─── Animated dot (CSS-only, memoized) ────────────────────────────────────────

const DotButton = memo(function DotButton({
  index,
  selected,
  onSelect,
}: {
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`Go to blog ${index + 1}`}
      className={cn(
        'h-2.5 rounded-full transition-all duration-300 ease-out',
        selected ? 'bg-primary w-7' : 'bg-primary/40 w-2.5',
      )}
    />
  );
});

// ─── Header (isolated so carousel scroll never re-renders it) ──────────────────

const BlogsHeader = memo(function BlogsHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, INVIEW_OPTS);

  return (
    <motion.div
      ref={ref}
      initial={MOTION_HIDDEN}
      animate={isInView ? MOTION_VISIBLE : MOTION_HIDDEN}
      transition={HEADER_TRANSITION}
      className="mx-auto max-w-[560px]"
    >
      <h2
        className={cn(
          'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]',
          geist.className,
        )}
      >
        Featured across the web
      </h2>
      <p className="mt-5 text-center text-lg text-zinc-500">
        From roundups to deep dives — see where developers and publications are
        talking about MVPBlocks.
      </p>
    </motion.div>
  );
});

// ─── Carousel (owns all the scroll state in isolation) ────────────────────────

const BlogCarousel = memo(function BlogCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, [
    autoplay.current,
  ]);
  const { selectedIndex, scrollSnaps, onDotClick, onPrev, onNext } =
    useEmblaControls(emblaApi);

  return (
    <div className="mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex touch-pan-y">
          {blogs.map((blog, index) => (
            <div
              key={blog.link}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-6 sm:basis-[52%] lg:basis-[34%]"
            >
              <BlogCard blog={blog} active={index === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous blog"
          className="border-border bg-background hover:bg-primary/10 hover:border-primary/50 text-foreground flex h-10 w-10 items-center justify-center rounded-full border transition-colors active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              index={index}
              selected={index === selectedIndex}
              onSelect={onDotClick}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next blog"
          className="border-border bg-background hover:bg-primary/10 hover:border-primary/50 text-foreground flex h-10 w-10 items-center justify-center rounded-full border transition-colors active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
});

// ─── Section ──────────────────────────────────────────────────────────────────

function Blogs() {
  return (
    <section id="blogs" className="bg-background relative mb-24">
      <div className="mx-auto max-w-7xl px-4">
        <BlogsHeader />
        <BlogCarousel />
      </div>
    </section>
  );
}

export default memo(Blogs);
