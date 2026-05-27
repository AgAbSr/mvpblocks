import { ShinyText } from '@/components/ui/shiny-text';

export default function ShinyTextHover() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-black p-8">
      <h1 className="cursor-pointer text-4xl md:text-6xl">
        <ShinyText
          text="Hover for Shine"
          shineColor="rgba(255, 215, 0, 1)"
          duration={2}
          trigger="hover"
          shimmerWidth={180}
        />
      </h1>
    </div>
  );
}
