import PageHeader from "@/components/layout/web/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function BlogPage() {
  return (
    <>
      <PageHeader>
        <h1 className="text-4xl leading-relaxed text-stone-800">Blog</h1>
      </PageHeader>
      <div className="container space-y-8 my-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src="https://plus.unsplash.com/premium_photo-1695339147014-32f68336c10c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  className="w-full lg:h-64 md:h-48 object-cover"
                  width="720"
                  height="480"
                  alt={"cover-image-" + index}
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl">
                  Licensed under the Unsplash
                </CardTitle>
                <CardDescription className="text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  cumque.
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </>
  );
}
