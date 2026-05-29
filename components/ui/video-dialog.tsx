/* eslint-disable @next/next/no-img-element */
'use client';

import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { preconnect, prefetchDNS } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Play, X, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

type AnimationStyle =
  | 'from-bottom'
  | 'from-center'
  | 'from-top'
  | 'from-left'
  | 'from-right'
  | 'fade'
  | 'top-in-bottom-out'
  | 'left-in-right-out';

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  /** Optional lower-res thumbnail used if the primary one fails to load. */
  thumbnailFallback?: string;
  thumbnailAlt?: string;
  className?: string;
  /** Overlay content rendered on top of the thumbnail (badges, title, stats…). */
  children?: ReactNode;
  /** Extra origins to warm up on hover (e.g. YouTube subdomains). */
  preconnectOrigins?: string[];
}

const animationVariants = {
  'from-bottom': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'from-center': {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  'from-top': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  'from-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'from-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'top-in-bottom-out': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'left-in-right-out': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
} as const;

const OVERLAY_TRANSITION = { type: 'spring', damping: 30, stiffness: 300 } as const;

function HeroVideoDialogComponent({
  animationStyle = 'from-center',
  videoSrc,
  thumbnailSrc,
  thumbnailFallback,
  thumbnailAlt = 'Video thumbnail',
  className,
  children,
  preconnectOrigins,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [thumb, setThumb] = useState(thumbnailSrc);
  // Two-stage reveal: mount the iframe only after the open animation, and keep a
  // cached poster + spinner on top until the player reports it's ready.
  const [showFrame, setShowFrame] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);

  const selectedAnimation = animationVariants[animationStyle];

  const warm = useCallback(() => {
    try {
      const origin = new URL(videoSrc).origin;
      prefetchDNS(origin);
      preconnect(origin);
    } catch {
      /* relative or invalid URL — nothing to warm */
    }
    preconnectOrigins?.forEach((o) => {
      prefetchDNS(o);
      preconnect(o);
    });
  }, [videoSrc, preconnectOrigins]);

  const open = useCallback(() => setIsVideoOpen(true), []);
  const close = useCallback(() => setIsVideoOpen(false), []);
  const onThumbError = useCallback(() => {
    if (thumbnailFallback) setThumb(thumbnailFallback);
  }, [thumbnailFallback]);
  const onFrameLoad = useCallback(() => setFrameLoaded(true), []);

  useEffect(() => {
    if (!isVideoOpen) {
      setShowFrame(false);
      setFrameLoaded(false);
      return;
    }
    warm();
    const t = setTimeout(() => setShowFrame(true), 180);
    return () => clearTimeout(t);
  }, [isVideoOpen, warm]);

  return (
    <div className={cn('relative', className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label={thumbnailAlt}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        }}
        onMouseEnter={warm}
        onFocus={warm}
        onTouchStart={warm}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl"
      >
        <img
          src={thumb}
          alt={thumbnailAlt}
          draggable={false}
          onError={onThumbError}
          className="aspect-video w-full object-cover transition-transform duration-500 ease-out select-none group-hover:scale-105"
        />

        {/* Consumer overlay (badge / title / stats) */}
        {children}

        {/* Themed play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-primary/10 flex size-24 scale-90 items-center justify-center rounded-full backdrop-blur-md transition-transform duration-300 ease-out group-hover:scale-100">
            <span className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] ring-1 ring-white/20">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500/30" />
              <Play className="relative ml-0.5 size-7 fill-white text-white" />
            </span>
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={OVERLAY_TRANSITION}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close video"
                className="absolute -top-12 right-0 flex size-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <X className="size-5" />
              </button>

              <div className="border-border relative isolate z-[1] size-full overflow-hidden rounded-2xl border bg-black">
                {/* Poster + spinner until the player is ready */}
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    frameLoaded ? 'pointer-events-none opacity-0' : 'opacity-100',
                  )}
                >
                  <img
                    src={thumb}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-cover select-none"
                  />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin text-white/80" />
                  </div>
                </div>

                {showFrame && (
                  <iframe
                    src={videoSrc}
                    onLoad={onFrameLoad}
                    title={thumbnailAlt}
                    className={cn(
                      'absolute inset-0 size-full transition-opacity duration-500',
                      frameLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const HeroVideoDialog = memo(HeroVideoDialogComponent);
