import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NewsletterForm from "@/views/newsletter/newsletter-form";
import { ArrowRight, PersonStanding } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home - Voip"
};

export default async function RootPage() {
  return (
    <>
      {/* start:hero */}
      <div id="hero" className="container flex py-32">
        <div className="flex-1 space-y-4">
          <h1 className="text-6xl leading-snug text-stone-800">
            Ready help you Connected with your customer 24/7
          </h1>
          <p className="text-lg text-stone-500 leading-8">
            EhyaLive is a complete customer service platform that delights you.r
            customers and fuels your sales.
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="py-8 text-base">
              Get Started
            </Button>
            <Button variant="outline" className="py-8 text-base" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <img
            src="https://ehya.designspace.io/assets/images/landing-saas2/hero@2x.png"
            className="w-2/3 h-auto object-contain"
            alt="image"
          />
        </div>
      </div>
      {/* end:hero */}
      {/* start:features */}
      <div id="features" className="container flex py-16">
        <div className="w-2/5 space-y-8">
          <h2 className="text-5xl leading-snug text-stone-800 mb-12">
            Help your customers and your team
          </h2>
          <div className="flex flex-col space-y-4 p-4 bg-transparent hover:bg-stone-50 rounded duration-200 border-l-4 border-transparent hover:border-stone-200">
            <h3 className="text-2xl leading-snug text-stone-800">
              Be Organized
            </h3>
            <p className="text-lg leading-8 text-stone-500">
              Personalized suggestions give you files and folders when you need
              them so you spend less time searching the files.
            </p>
          </div>
          <div className="flex flex-col space-y-4 p-4 bg-transparent hover:bg-stone-50 rounded duration-200 border-l-4 border-transparent hover:border-stone-200">
            <h3 className="text-2xl leading-snug text-stone-800">
              Be Organized
            </h3>
            <p className="text-lg leading-8 text-stone-500">
              Personalized suggestions give you files and folders when you need
              them so you spend less time searching the files.
            </p>
          </div>
        </div>
        <div className="w-3/5 flex justify-end">
          <img
            src="https://ehya.designspace.io/assets/images/landing-saas-illustration/ill-help@2x.png"
            className="w-2/3 h-auto object-contain"
            alt="image"
          />
        </div>
      </div>
      {/* end:features */}
      {/* start:image-section */}
      <div id="image-section" className="py-16 bg-stone-50">
        <div className="container flex items-center">
          <div className="w-3/5 flex justify-start">
            <img
              src="https://ehya.designspace.io/assets/images/landing-saas-illustration/ill-save-time.svg"
              className="w-2/3 h-auto object-contain"
              alt="image"
            />
          </div>
          <div className="w-2/5 space-y-8">
            <h2 className="text-5xl leading-snug text-stone-800">
              Save time efficiently your marketing
            </h2>
            <p className="text-xl leading-8 text-stone-500">
              Like Steve Jobs quotes, “Design is not just what it looks like and
              feels like. Design is how it works”. We always try to make a great
              output.
            </p>
            <Link
              href="#features"
              className="flex space-x-2 text-blue-500 font-medium"
            >
              <span>Learn More</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>
      {/* end:image-section */}
      {/* start:card-section */}
      <div id="card-section" className="container flex py-16 space-x-8">
        <Card className="flex-1">
          <CardHeader className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-stone-100 flex justify-center items-center">
              <PersonStanding size={32} className="text-stone-700" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle className="text-center text-xl">Easy access</CardTitle>
            <CardDescription className="text-stone-400 text-base text-center">
              Take Voip wherever you go so that you know what’s going on with
              your money at all times.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="#features"
              className="flex space-x-2 text-blue-500 font-medium text-sm"
            >
              <span>Learn More</span>
              <ArrowRight size={20} />
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-stone-100 flex justify-center items-center">
              <PersonStanding size={32} className="text-stone-700" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle className="text-center text-xl">Easy access</CardTitle>
            <CardDescription className="text-stone-400 text-base text-center">
              Take Voip wherever you go so that you know what’s going on with
              your money at all times.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="#features"
              className="flex space-x-2 text-blue-500 font-medium text-sm"
            >
              <span>Learn More</span>
              <ArrowRight size={20} />
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-stone-100 flex justify-center items-center">
              <PersonStanding size={32} className="text-stone-700" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle className="text-center text-xl">Easy access</CardTitle>
            <CardDescription className="text-stone-400 text-base text-center">
              Take Voip wherever you go so that you know what’s going on with
              your money at all times.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="#features"
              className="flex space-x-2 text-blue-500 font-medium text-sm"
            >
              <span>Learn More</span>
              <ArrowRight size={20} />
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-stone-100 flex justify-center items-center">
              <PersonStanding size={32} className="text-stone-700" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle className="text-center text-xl">Easy access</CardTitle>
            <CardDescription className="text-stone-400 text-base text-center">
              Take Voip wherever you go so that you know what’s going on with
              your money at all times.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="#features"
              className="flex space-x-2 text-blue-500 font-medium text-sm"
            >
              <span>Learn More</span>
              <ArrowRight size={20} />
            </Link>
          </CardFooter>
        </Card>
      </div>
      {/* end:card-section */}
      {/* start:newsletter */}
      <div id="newsletter" className="py-16 bg-stone-50">
        <div className="container flex justify-between items-center">
          <div className="w-2/3 space-y-2">
            <h2 className="text-2xl leading-snug text-stone-800">
              Subscribe to our newsletter
            </h2>
            <p className="text-base leading-8 text-stone-500">
              Subscribe to our newsletter to get our latest news and products
            </p>
          </div>
          <div className="w-1/3">
            <NewsletterForm />
          </div>
        </div>
      </div>
      {/* end:newsletter */}
    </>
  );
}
