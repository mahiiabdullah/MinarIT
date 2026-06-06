import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import BlogArticle from "@/components/sections/blog/BlogArticle";
import Footer from "@/components/layout/Footer";

// Generate static params at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Article Not Found | Minar Agency",
    };
  }

  return {
    title: `${post.title} | Minar Agency Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-background pt-24">
      <BlogArticle post={post} />
      <Footer />
    </main>
  );
}
