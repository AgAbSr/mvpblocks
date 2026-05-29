'use client';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { geist } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { testimonials } from '@/constants/testimonials';

const MOTION_HIDDEN = { opacity: 0, y: 50 } as const;
const MOTION_VISIBLE = { opacity: 1, y: 0 } as const;
const HEADER_TRANSITION = { duration: 0.5, delay: 0 } as const;
const INVIEW_OPTS = { once: true, amount: 0.3 } as const;

// ─── Platform icons ──────────────────────────────────────────────────────────

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="X (Twitter)"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="LinkedIn"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform = 'x' | 'linkedin';

// 11 posts → split 4 / 4 / 3 across columns
const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 11);

// ─── Column component ─────────────────────────────────────────────────────────

const TestimonialsColumn = memo(function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={cn('testimonials-marquee-track', props.className)}>
      {/* Pure CSS, transform-only animation — runs on the compositor thread so it
          stays perfectly smooth even when the main thread is busy. */}
      <div
        className="testimonials-marquee flex flex-col gap-6"
        style={{ '--marquee-duration': `${props.duration ?? 20}s` } as React.CSSProperties}
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(
              ({ text, imageSrc, name, username, platform, postUrl }) => (
                <a
                  key={`${postUrl}-${index}`}
                  href={postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-border from-secondary/10 to-card relative block w-full max-w-xs overflow-hidden rounded-3xl border bg-gradient-to-b p-10 no-underline shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                >
                  {/* Accent gradient glow */}
                  <div className="from-primary/10 to-card absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b blur-md" />

                  {/* Platform badge top-right */}
                  <div className="absolute top-4 right-4 opacity-30 transition-opacity duration-200 group-hover:opacity-70">
                    {platform === 'x' ? (
                      <XIcon className="text-foreground h-3.5 w-3.5" />
                    ) : (
                      <LinkedInIcon className="h-3.5 w-3.5 text-[#0A66C2]" />
                    )}
                  </div>

                  {/* Post text */}
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    {text}
                  </p>

                  {/* Author row */}
                  <div className="mt-5 flex items-center gap-2">
                    <Image
                      src={imageSrc}
                      alt={name}
                      height={40}
                      width={40}
                      draggable={false}
                      className="h-10 w-10 rounded-full object-cover select-none"
                      unoptimized
                    />
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm leading-5 font-medium tracking-tight">
                        {name}
                      </span>
                      <span className="text-muted-foreground text-xs leading-5 tracking-tight">
                        {username}
                      </span>
                    </div>
                  </div>
                </a>
              ),
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

// ─── Section ──────────────────────────────────────────────────────────────────

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, INVIEW_OPTS);

  const headerAnimate = useMemo(
    () => (isInView ? MOTION_VISIBLE : MOTION_HIDDEN),
    [isInView],
  );

  const handleShareClick = useCallback(async () => {
    const { tweetContents } = await import('@/lib/tweet-contents');
    const randomTweet =
      tweetContents[Math.floor(Math.random() * tweetContents.length)];
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(randomTweet)}`,
      '_blank',
    );
  }, []);

  return (
    <section id="reviews" className="bg-background mb-24">
      <div className="mx-auto max-w-7xl mt-2">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={MOTION_HIDDEN}
          animate={headerAnimate}
          transition={HEADER_TRANSITION}
          className="mx-auto max-w-[540px]"
        >
          <div className="flex justify-center">
            <button
              type="button"
              className="group bg-background/50 hover:shadow-primary/[0.1] dark:border-border relative z-[60] mx-auto rounded-full border border-zinc-500/80 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
            >
              <div className="via-primary absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4" />
              <div className="via-primary absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent to-transparent shadow-2xl transition-all duration-500 group-hover:h-px" />
              <span className="relative">Testimonials</span>
            </button>
          </div>
          <h2
            className={cn(
              'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]',
              geist.className,
            )}
          >
            What people are saying
          </h2>
          <p className="mt-5 text-center text-lg text-zinc-500">
            Developers around the world are building faster with MVPBlocks.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>

        {/* Share CTA */}
        <div className="-mt-8 flex justify-center">
          <button
            onClick={handleShareClick}
            className="group border-primary/30 bg-background text-foreground hover:border-primary/60 hover:bg-primary/10 relative inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all active:scale-95"
          >
            <div className="via-primary/40 absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent to-transparent" />
            <div className="via-primary/40 absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent to-transparent" />
            <XIcon className="text-primary h-4 w-4" />
            Share your experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
