// ─── Types ─────────────────────────────────────────────────────────────────

export type BlogPlatform =
  | 'medium'
  | 'devto'
  | 'jqueryscript'
  | 'producthunt'
  | 'devpost'
  | 'allshadcn'
  | 'allutilitycss'
  | 'mainstream'
  | 'trendshift'
  | 'peerlist'
  | 'indiehub';

export interface Blog {
  /** Full link to the article / post */
  link: string;
  /** Article headline */
  title: string;
  /** Short tagline / category (e.g. "Weekly Roundup") */
  subtitle: string;
  /** At least 50-char description shown in cards */
  desc: string;
  /** OG / hero image URL */
  image: string;
  /** Author display name */
  author: string;
  /** Author avatar URL */
  authorAvatar: string;
  /** Human-readable platform name (e.g. "Medium") */
  platform: BlogPlatform;
  /** Platform logo / icon URL */
  platformLogo: string;
  /** ISO date string or "YYYY-MM-DD" */
  date: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

export const blogs: Blog[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://next.jqueryscript.net/next-js/mvp-blocks/',
    title: 'Launch MVPs Faster with MVPBlocks UI Components',
    subtitle: 'Dedicated Feature',
    desc: 'An in-depth profile of MVPBlocks — open-source Next.js & TailwindCSS UI library. Covers CLI support, responsive blocks, Framer Motion animations, and FAQ for developers wanting copy-paste productivity.',
    image: 'https://i.postimg.cc/wT0jQVBm/image.png',
    author: 'jQueryScript',
    authorAvatar: 'https://www.jqueryscript.net/favicon.ico',
    platform: 'jqueryscript',
    platformLogo: 'https://www.jqueryscript.net/favicon.ico',
    date: '2025-05-22',
  },

  // ── 2 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://www.jqueryscript.net/blog/Weekly-Web-Design-Development-News-Collective-606.html',
    title: 'Weekly Web Design & Development News: Collective #606',
    subtitle: 'Weekly Roundup · Week 22, 2025',
    desc: 'MVPBlocks is highlighted among top JavaScript & CSS picks of the week alongside shadcn/ui tools, Next.js templates, and animation libraries in this curated developer roundup.',
    image: 'https://next.jqueryscript.net/wp-content/uploads/2025/05/mvp-blocks-768x499.webp',
    author: 'jQueryScript',
    authorAvatar: 'https://www.jqueryscript.net/favicon.ico',
    platform: 'jqueryscript',
    platformLogo: 'https://www.jqueryscript.net/favicon.ico',
    date: '2025-05-26',
  },

  // ── 3 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://medium.com/sourcescribes/9-trending-github-repos-bc0ca00c0fe3',
    title: '9 Trending Github Repos',
    subtitle: 'Open Source Spotlight · Medium',
    desc: 'MVPBlocks earns a spot in this curated list of 9 trending GitHub repos for developers and tinkerers — praised for its copy-paste workflow, developer-friendly architecture, and zero install overhead.',
    image: 'https://miro.medium.com/v2/da:true/resize:fit:1200/0*x-DHC7WL7ZoEz8wb',
    author: 'C. L. Beard',
    authorAvatar: 'https://miro.medium.com/v2/resize:fill:176:176/1*AbNqrarLNvZxu6fMNctBiw.jpeg',
    platform: 'medium',
    platformLogo: 'https://cdn-images-1.medium.com/max/1024/1*W35QUSvGpcLuxPo3DRJV-g.png',
    date: '2025-09-20',
  },

  // ── 4 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://medium.com/@shivanshudev/here-are-the-best-react-component-libraries-built-on-shadcn-ui-66408ed442c4',
    title: 'Here are the BEST React Component Libraries built on Shadcn/UI',
    subtitle: 'Curated List · Medium',
    desc: 'MVPBlocks is featured among the best React component libraries built on Shadcn/UI — recognised for its animated, responsive blocks, CLI support, and rapid-MVP philosophy that stands out from the competition.',
    image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*ooRcnie5vyvpPmuZSnf1bg.jpeg',
    author: 'Shivanshu Gupta',
    authorAvatar: 'https://miro.medium.com/v2/resize:fill:176:176/1*4mU1ZYgSlvrb297cS69RrA.jpeg',
    platform: 'medium',
    platformLogo: 'https://cdn-images-1.medium.com/max/1024/1*W35QUSvGpcLuxPo3DRJV-g.png',
    date: '2025-06-01',
  },

  // ── 5 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://medium.com/lets-code-future/top-15-open-source-next-js-projects-every-dev-should-clone-in-2025-most-github-daa3d353f3ff',
    title: '15 Open Source Next.js Projects Every Dev Should Clone in 2025',
    subtitle: 'Top GitHub Projects · Medium',
    desc: 'MVPBlocks makes the cut among the 15 most-starred open-source Next.js projects to study and clone in 2025 — featured for offering production-ready UI blocks that significantly accelerate developer throughput.',
    image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NUiEoow1Tkb0c9hOfwVjZQ.png',
    author: 'CodeWithYog',
    authorAvatar: 'https://miro.medium.com/v2/resize:fill:64:64/1*v7aJZIaSy9sjUlBbWpTp8g.png',
    platform: 'medium',
    platformLogo: 'https://cdn-images-1.medium.com/max/1024/1*W35QUSvGpcLuxPo3DRJV-g.png',
    date: '2025-06-10',
  },

  // ── 6 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://allshadcn.com/blocks/mvpblocks-components/',
    title: 'MVPBlocks UI Components',
    subtitle: 'Shadcn Directory Listing · AllShadcn',
    desc: 'AllShadcn catalogues MVPBlocks as a top-tier Shadcn UI component library — covering prebuilt hero sections, pricing tables, dashboards, and animated blocks built with Framer Motion for instant project integration.',
    image: 'https://cdn.allshadcn.com/as-assets/preview-images/mvpblocks-pro.png',
    author: 'AllShadcn',
    authorAvatar: 'https://allshadcn.com/favicon.ico',
    platform: 'allshadcn',
    platformLogo: 'https://allshadcn.com/favicon.ico',
    date: '2025-05-30',
  },

  // ── 7 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://allutilitycss.com/tools/mvpblocks/',
    title: 'Mvpblocks — Prebuilt UI Blocks',
    subtitle: 'Tailwind CSS Directory · AllUtilityCSS',
    desc: 'AllUtilityCSS profiles MVPBlocks as a leading Tailwind CSS component toolkit — 100+ responsive blocks, Framer Motion animations, zero-install copy-paste workflow, and ShadCN UI for deeper customisation.',
    image: 'https://i.postimg.cc/ZYwHkG7x/image.png',
    author: 'AllUtilityCSS',
    authorAvatar: 'https://allutilitycss.com/favicon.ico',
    platform: 'allutilitycss',
    platformLogo: 'https://allutilitycss.com/favicon.ico',
    date: '2025-06-10',
  },

  // ── 8 ──────────────────────────────────────────────────────────────────
  {
    link: 'https://mainstream.dev/mvpblocks',
    title: 'Mvpblocks: Ship beautiful MVPs with prebuilt UI blocks',
    subtitle: 'Tool Feature · Mainstream',
    desc: 'Mainstream.dev features MVPBlocks for developers who want to launch faster — animated, pixel-perfect UI blocks with Next.js, Tailwind, V0 compatibility, and developer-friendly CLI or manual integration.',
    image: 'https://i.postimg.cc/bvRbxnKX/image.png',
    author: 'Mainstream',
    authorAvatar: 'https://mainstream.dev/favicon.ico',
    platform: 'mainstream',
    platformLogo: 'https://mainstream.dev/favicon.ico',
    date: '2025-07-12',
  },

  // ── 10 ─────────────────────────────────────────────────────────────────
  {
    link: 'https://www.producthunt.com/posts/mvpblocks',
    title: 'Mvpblocks — Prebuilt UI blocks to ship beautiful MVPs fast',
    subtitle: 'Product Launch · Product Hunt',
    desc: 'MVPBlocks launched on Product Hunt as a fully open-source component library — copy, paste, customize, and launch your idea faster than ever with prebuilt Next.js blocks, no installations needed.',
    image: 'https://ph-files.imgix.net/fd1b05b1-f28d-4b9a-b39b-e4baee4e77d5.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=391&h=220&fit=max&frame=1&dpr=2',
    author: 'Subhadeep Roy',
    authorAvatar: 'https://unavatar.io/twitter/mvp_Subha',
    platform: 'producthunt',
    platformLogo: 'https://www.producthunt.com/favicon.ico',
    date: '2025-05-25',
  },

  // ── 12 ─────────────────────────────────────────────────────────────────
  {
    link: 'https://trendshift.io/repositories/14279',
    title: 'MVPBlocks — Trending on Trendshift',
    subtitle: 'Trending Repository · Trendshift',
    desc: 'Trendshift tracks MVPBlocks as a rising-star GitHub repository — spotlighting its developer-first copy-paste approach, CLI workflow, and BSD 3-Clause open-source licence that makes it freely usable and commercial-safe.',
    image: 'https://i.postimg.cc/fRNfYMJQ/Chat-GPT-Image-May-29-2026-12-01-23-PM.png',
    author: 'Trendshift',
    authorAvatar: 'https://trendshift.io/favicon.ico',
    platform: 'trendshift',
    platformLogo: 'https://trendshift.io/favicon.ico',
    date: '2025-06-01',
  },
];