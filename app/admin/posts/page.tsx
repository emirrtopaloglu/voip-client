import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PostsPage() {
  return (
    <section id="posts-page">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Posts</h1>
        <Link href="/admin/posts/new-post">
          <Button>
            <Plus size={16} className="inline-block mr-2" />
            Create Post
          </Button>
        </Link>
      </div>
    </section>
  );
}
