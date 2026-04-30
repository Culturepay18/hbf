import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";

export function Blog() {
  return (
    <section id="blog" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-orange">Blog</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-hbf-dark">
            Culture, sports, and opportunity stories from HBF.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.href} className="flex min-h-72 flex-col">
              <h3 className="text-xl font-medium leading-7 text-hbf-dark">{post.title}</h3>
              <p className="mt-4 line-clamp-3 text-sm text-hbf-muted">{post.excerpt}</p>
              <Link
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="focus-hbf mt-auto inline-flex items-center gap-2 rounded-full pt-8 text-sm font-semibold text-hbf-green hover:text-hbf-orange"
              >
                Read article
                <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
