import PageHeader from "@/components/layout/web/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <PageHeader>
        <h1 className="text-4xl leading-relaxed text-stone-800">
          Contact Page
        </h1>
        <p className="text-base leading-relaxed text-stone-500 max-w-[60%]">
          You can easily contact us by filling out the form below.
        </p>
      </PageHeader>
      <div className="container py-16 max-w-[65%] text-stone-700 leading-relaxed text-base space-y-4">
        <div className="flex space-x-8">
          <div className="flex-1">
            <Label htmlFor="name">Your Name *</Label>
            <Input id="name" type="text" placeholder="Name" className="h-12" />
          </div>
          <div className="flex-1">
            <Label htmlFor="email">Contact Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              className="h-12"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Your message"
              className="h-32"
            />
          </div>
        </div>
        <div className="flex">
          <p className="text-base text-stone-500 leading-loose">
            By submitting this form you agree to our terms and conditions and
            our{" "}
            <Link href="/privacy-policy" className="text-blue-500">
              Privacy Policy
            </Link>{" "}
            which explains how we may collect, use and disclose your personal
            information including to third parties.
          </p>
        </div>
        <div className="flex">
          <Button className="h-12">Send Message</Button>
        </div>
      </div>
    </>
  );
}
