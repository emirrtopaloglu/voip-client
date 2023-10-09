import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { removeTags } from "@/utils/removeTags";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function BlogCard(props: BlogCardProps) {
  const { title, description, image, href } = props;
  return (
    <Card>
      <CardHeader>
        <Link href={href}>
          <img
            src={image}
            className="w-full lg:h-64 md:h-48 object-cover"
            width="720"
            height="480"
            alt={title}
          />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href={href}>
          <CardTitle className="text-xl">{title}</CardTitle>
        </Link>
        <CardDescription className="text-base">
          {removeTags(description)}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
