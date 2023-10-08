import BlogCard from "@/components/blog-card";
import PageHeader from "@/components/layout/web/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog - Voip"
};

async function getData(limit: string = "6", page: string = "1") {
  const res = await fetch(
    process.env.WEBSITE_URL + `/api/blogs?limit=${limit}&page=${page}`,
    {
      cache: "no-store"
    }
  );
  const data = await res.json();
  return data;
}

export default async function BlogPage({ searchParams }) {
  const posts = await getData(searchParams?.limit || 6, searchParams.page || 1);

  return (
    <>
      <PageHeader>
        <h1 className="text-4xl leading-relaxed text-stone-800">Blog</h1>
      </PageHeader>
      <div className="container space-y-8 my-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.data?.length > 0 ? (
            posts?.data.map((post: any, index: number) => (
              <BlogCard
                key={index}
                title={post.title}
                description={post.content?.substring(0, 100) + "..."}
                image={post.featured_image}
                href={`/blog/${post.slug}`}
              />
            ))
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-stone-700 text-center">
                No posts found.
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center space-x-4">
          {searchParams?.page && Number(searchParams?.page) > 1 && (
            <Link href={`/blog?page=${Number(searchParams?.page || 1) - 1}`}>
              <Button variant="outline" size="icon">
                <ChevronLeft size={20} />
              </Button>
            </Link>
          )}
          <span className="text-stone-700">
            Page {searchParams?.page || 1} of {Math.ceil(posts.totalCount / 6)}
          </span>
          {searchParams?.page &&
            Number(searchParams?.page) < Math.ceil(posts.totalCount / 6) && (
              <Link href={`/blog?page=${Number(searchParams?.page || 1) + 1}`}>
                <Button variant="outline" size="icon">
                  <ChevronRight size={20} />
                </Button>
              </Link>
            )}
        </div>
      </div>
    </>
  );
}
