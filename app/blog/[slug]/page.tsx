"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  return <div>My Post: {params.slug}</div>;
}
