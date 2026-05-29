import { githubData } from '@/constants/github-data';
import { bricolage } from '@/lib/fonts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Contributors() {
  const contributors = githubData.contributors;

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contributors.map((contributor) => (
          <Link
            key={contributor.id}
            href={`https://github.com/${contributor.login}`}
            className="group no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="flex h-80 max-w-sm">
              <CardHeader>
                <CardTitle
                  className={`${bricolage.className} font-normal! no-underline!`}
                >
                  {contributor.name}
                </CardTitle>
                <CardDescription className="no-underline!">
                  {contributor.contributions} contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="mx-6! flex h-full items-center justify-center overflow-hidden! rounded-lg px-0!">
                <img
                  src={contributor.avatar_url}
                  alt="Contributor Avatar"
                  draggable={false}
                  className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110 select-none"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
