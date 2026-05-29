'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Github,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquareText,
} from 'lucide-react';
import { toast } from 'sonner';
import { geist } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const MOTION_HIDDEN = { opacity: 0, y: 50 } as const;
const MOTION_VISIBLE = { opacity: 1, y: 0 } as const;
const HEADER_TRANSITION = { duration: 0.5, delay: 0 } as const;
const BODY_TRANSITION = { duration: 0.6, delay: 0.1 } as const;
const INVIEW_OPTS = { once: true, amount: 0.2 } as const;

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CHANNELS = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'blocks@mvp-subha.me',
    href: 'mailto:blocks@mvp-subha.me',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'subhadeeproy3902/mvpblocks',
    href: siteConfig.links.github,
  },
  {
    icon: XIcon,
    label: 'X / Twitter',
    value: '@mvp_Subha',
    href: siteConfig.links.twitter,
  },
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(120),
  email: z.string().trim().email('Enter a valid email'),
  subject: z.string().trim().max(160).optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000),
});

type ContactValues = z.infer<typeof contactSchema>;

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, INVIEW_OPTS);
  const headerAnimate = useMemo(
    () => (isInView ? MOTION_VISIBLE : MOTION_HIDDEN),
    [isInView],
  );

  const [success, setSuccess] = useState(false);

  // react-hook-form keeps the inputs uncontrolled, so typing triggers ZERO
  // React re-renders. Validation only runs on submit (default mode).
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(
    async (values: ContactValues) => {
      // Best-effort browser context — IP + geo are derived server-side.
      const client = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: Array.isArray(navigator.languages)
          ? navigator.languages.join(', ')
          : undefined,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${window.screen.width}×${window.screen.height} @${window.devicePixelRatio}x`,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        referrer: document.referrer || undefined,
        page: window.location.href,
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, client }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || 'Failed to send message');

        setSuccess(true);
        toast.success("Message sent! Check your inbox — we've replied. 🎉");
        reset();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : 'Something went wrong.',
        );
      }
    },
    [reset],
  );

  const resetForm = useCallback(() => setSuccess(false), []);

  return (
    <section id="contact" className="bg-background relative mb-24">
      {/* Ambient glow */}
      <div className="bg-primary/20 pointer-events-none absolute top-24 left-1/2 -z-0 h-40 w-3/4 max-w-3xl -translate-x-1/2 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
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
              <span className="relative">Contact</span>
            </button>
          </div>
          <h2
            className={cn(
              'from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]',
              geist.className,
            )}
          >
            Let&apos;s build together
          </h2>
          <p className="mt-5 text-center text-lg text-zinc-500">
            Questions, feedback, partnerships or just a hello — drop us a line
            and we&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={MOTION_HIDDEN}
          animate={headerAnimate}
          transition={BODY_TRANSITION}
          className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5"
        >
          {/* Left: channels */}
          <div className="border-border from-secondary/30 to-card relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-b p-7 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] lg:col-span-2">
            <div className="from-primary/15 pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-b to-transparent blur-2xl" />
            <div className="relative">
              <span className="border-primary/20 bg-primary/10 text-primary inline-flex h-11 w-11 items-center justify-center rounded-2xl border">
                <MessageSquareText className="h-5 w-5" />
              </span>
              <h3 className="text-foreground mt-5 text-xl font-semibold tracking-tight">
                Reach out directly
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Prefer another channel? We&apos;re active here too and usually
                reply within a day.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {CHANNELS.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group border-border/70 bg-background/40 hover:border-primary/40 hover:bg-primary/5 flex items-center gap-3 rounded-2xl border p-3 transition-colors"
                  >
                    <span className="border-border bg-background text-foreground group-hover:text-primary flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-muted-foreground text-xs">
                        {label}
                      </span>
                      <span className="text-foreground text-sm font-medium">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="border-border bg-card relative overflow-hidden rounded-3xl border p-7 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] lg:col-span-3">
            {success ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="text-foreground mt-5 text-xl font-semibold">
                  Message sent!
                </h3>
                <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                  Thanks for reaching out. We&apos;ve sent a confirmation to your
                  inbox and will reply shortly.
                </p>
                <Button variant="secondary" className="mt-6" onClick={resetForm}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      aria-invalid={!!errors.name}
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className="text-destructive text-xs">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      {...register('email')}
                    />
                    {errors.email && (
                      <span className="text-destructive text-xs">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    placeholder="What's this about?"
                    {...register('subject')}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    aria-invalid={!!errors.message}
                    className="resize-none"
                    {...register('message')}
                  />
                  {errors.message && (
                    <span className="text-destructive text-xs">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 w-full bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:from-rose-500 hover:to-rose-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>

                <p className="text-muted-foreground text-center text-xs">
                  We&apos;ll never share your details. By sending you agree to be
                  contacted back.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Contact);
