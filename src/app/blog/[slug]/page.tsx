import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { POSTS, getPost } from "@/lib/blog";

const SITE_URL = "https://www.resumejp.com";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.cardTitle,
      description: post.description,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.cardTitle, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        author: { "@type": "Organization", name: "ResumeJP", url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#org` },
        keywords: post.keywords.join(", "),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const { Body } = post;

  return (
    <MarketingShell>
      <JsonLd slug={slug} />
      <article>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All guides
        </Link>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium">{post.category}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {post.description}
        </p>

        <div className="mt-2">
          <Body />
        </div>
      </article>

      <section className="mt-14 border-t pt-8">
        <h2 className="text-lg font-semibold tracking-tight">More guides</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block rounded-xl border bg-white p-4 transition-colors hover:border-primary/40"
            >
              <span className="text-sm font-medium leading-snug hover:text-primary">
                {p.cardTitle}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
