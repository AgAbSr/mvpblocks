'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { preconnect, prefetchDNS } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Play, Loader2 } from 'lucide-react';
import { geist } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from '@/components/ui/glimpse';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { featuredVideo } from '@/constants/video-feature';

const MOTION_HIDDEN = { opacity: 0, y: 50 } as const;
const MOTION_VISIBLE = { opacity: 1, y: 0 } as const;
const HEADER_TRANSITION = { duration: 0.5, delay: 0 } as const;
const INVIEW_OPTS = { once: true, amount: 0.3 } as const;

// Warm up everything the YouTube embed will reach for, so the player loads
// near-instantly once the user actually clicks.
const YT_ORIGINS = [
  'https://www.youtube-nocookie.com',
  'https://www.youtube.com',
  'https://i.ytimg.com',
  'https://yt3.ggpht.com',
  'https://www.google.com',
  'https://googleads.g.doubleclick.net',
  'https://static.doubleclick.net',
];

function VideoFeature() {
  const ref = useRef(null);
  const isInView = useInView(ref, INVIEW_OPTS);
  const headerAnimate = useMemo(
    () => (isInView ? MOTION_VISIBLE : MOTION_HIDDEN),
    [isInView],
  );

  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState(featuredVideo.thumbnail);
  // Two-stage reveal: mount the iframe only after the dialog's open animation,
  // and keep the cached poster on top until the player reports it's ready.
  const [showFrame, setShowFrame] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${featuredVideo.id}?start=${featuredVideo.startSeconds}&autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  // Lenis smooth-scroll keeps scrolling even when the dialog's scroll-lock is
  // active, so the modal feels "see-through". Pause it while the dialog is open.
  const lenis = useLenis();

  const warmConnections = useCallback(() => {
    YT_ORIGINS.forEach((origin) => {
      prefetchDNS(origin);
      preconnect(origin);
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setShowFrame(false);
      setFrameLoaded(false);
      return;
    }
    warmConnections();
    lenis?.stop();
    // Let the ~200ms dialog enter animation finish on a light DOM first.
    const t = setTimeout(() => setShowFrame(true), 180);
    return () => {
      clearTimeout(t);
      lenis?.start();
    };
  }, [open, warmConnections, lenis]);

  return (
    <section id="featured-video" className="bg-background relative mt-4 mb-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={MOTION_HIDDEN}
          animate={headerAnimate}
          transition={HEADER_TRANSITION}
          className="mx-auto max-w-[560px]"
        >
          <div className="flex justify-center">
            <button
              type="button"
              className="group bg-background/50 hover:shadow-primary/[0.1] dark:border-border relative z-[60] mx-auto rounded-full border border-zinc-500/80 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
            >
              <div className="via-primary absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4" />
              <div className="via-primary absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl transition-all duration-500 group-hover:h-px" />
              <span className="relative">As seen on YouTube</span>
            </button>
          </div>
          <h2
            className={cn(
              'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]',
              geist.className,
            )}
          >
            Creators are loving
          </h2>
          <p className="mt-5 text-center text-lg text-zinc-500">
            Content creators like{' '}
            <Glimpse closeDelay={0} openDelay={0}>
              <GlimpseTrigger asChild>
                <a
                  className="font-medium underline"
                  href="https://www.youtube.com/@janmarshalcoding"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jan Marshal
                </a>
              </GlimpseTrigger>
              <GlimpseContent className="from-secondary to-card relative w-80 rounded-2xl bg-gradient-to-b shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]">
                <div className="from-primary/10 to-card absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b blur-md" />
                <GlimpseImage
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  draggable={false}
                  className="rounded-md select-none"
                />
                <GlimpseTitle className="line-clamp-2 text-base font-semibold">
                  {featuredVideo.title}
                </GlimpseTitle>
                <GlimpseDescription className="text-xs">
                  Featured on the {featuredVideo.channelName} YouTube channel —
                  MVPBlocks highlighted among the best shadcn/ui component
                  libraries.
                </GlimpseDescription>
              </GlimpseContent>
            </Glimpse>{' '}
            featured MVPBlocks among the best React component libraries built on
            shadcn/ui.
          </p>
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={MOTION_HIDDEN}
          animate={headerAnimate}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="group border-border from-secondary/20 to-card relative flex flex-col overflow-hidden rounded-3xl border bg-gradient-to-b p-2 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] sm:p-3">
              {/* Accent glow */}
              <div className="from-primary/20 pointer-events-none absolute -top-16 left-1/2 z-10 h-40 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl" />

              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={`Play video: ${featuredVideo.title}`}
                  onMouseEnter={warmConnections}
                  onFocus={warmConnections}
                  onTouchStart={warmConnections}
                  className="relative block aspect-video w-full overflow-hidden rounded-2xl"
                >
                  <Image
                    src={thumb}
                    alt={featuredVideo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority={false}
                    draggable={false}
                    onError={() => setThumb(featuredVideo.thumbnailFallback)}
                    className="relative! object-cover transition-transform duration-500 select-none group-hover:scale-105"
                  />
                  {/* Cinematic gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                  {/* YouTube badge */}
                  <div className="bg-background text-foreground absolute top-1 left-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur sm:top-4 sm:left-4 sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
                    <svg
                      preserveAspectRatio="xMidYMid"
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      viewBox="0 0 256 180"
                    >
                      <path
                        fill="red"
                        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
                      />
                      <path
                        fill="#FFF"
                        d="m102.421 128.06 66.328-38.418-66.328-38.418z"
                      />
                    </svg>
                    YouTube
                  </div>

                  {/* Play button */}
                  <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] ring-4 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-white/30 sm:h-20 sm:w-20">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500/40" />
                    <Play className="relative ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8" />
                  </span>
                </button>
              </DialogTrigger>
              {/* Title + channel + stats overlay */}
              <div className="pb-1 pt-3 text-left px-2">
                <h3 className="line-clamp-2 text-sm font-medium text-white sm:text-lg md:text-xl">
                  {featuredVideo.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex items-center gap-2">
                    <Image
                      src={featuredVideo.channelAvatar}
                      alt={featuredVideo.channelName}
                      width={28}
                      height={28}
                      draggable={false}
                      unoptimized
                      className="h-6 w-6 rounded-full border border-white/20 object-cover select-none sm:h-7 sm:w-7"
                    />
                    <span className="text-xs font-medium text-white/90 sm:text-sm">
                      {featuredVideo.channelName}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <DialogContent className="max-w-4xl overflow-hidden border-none bg-black p-0 shadow-2xl [&>button]:hidden">
              <DialogTitle className="sr-only">
                {featuredVideo.title}
              </DialogTitle>
              <div className="relative aspect-video w-full bg-black">
                {/* Cached poster + spinner — shown instantly, hidden once the
                    player is ready, so the open never feels blank or janky. */}
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    frameLoaded
                      ? 'pointer-events-none opacity-0'
                      : 'opacity-100',
                  )}
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    sizes="896px"
                    draggable={false}
                    className="object-cover select-none"
                  />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-white/80" />
                  </div>
                </div>

                {showFrame && (
                  <iframe
                    className={cn(
                      'absolute inset-0 h-full w-full scale-[1.025] transition-opacity duration-500',
                      frameLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                    src={embedUrl}
                    title={featuredVideo.title}
                    onLoad={() => setFrameLoaded(true)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(VideoFeature);
