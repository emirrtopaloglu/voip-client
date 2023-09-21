import PageHeader from "@/components/layout/web/page-header";

export default function AboutPage() {
  return (
    <>
      <PageHeader>
        <h1 className="text-4xl leading-relaxed text-stone-800">About Us</h1>
        <p className="text-base leading-relaxed text-stone-500 max-w-[60%]">
          We are a team of passionate people whose goal is to improve everyone's
          life through disruptive products. We build great products to solve
          your business problems.
        </p>
      </PageHeader>
      <div className="container py-16 max-w-[65%] text-stone-700 leading-relaxed text-base space-y-8">
        <p>
          Connect your conversations with the tools and services that you use to
          get the job done. With over 1,500 apps and a robust API, the Slack
          platform team works with partners and developers globally to build
          apps and integrations that streamline your work, automate mundane
          tasks and bring context into your conversations in Voip.
        </p>
        <h2>Our Mission</h2>
        <p>
          We are a team of passionate people whose goal is to improve everyone's
          life through disruptive products. We build great products to solve
          your business problems. Our products are designed for small to medium
          size companies willing to optimize their performance.
        </p>
        <h3>Join Us and Enjoy</h3>
        <p>
          We are a team of passionate people whose goal is to improve everyone's
          life through disruptive products. We build great products to solve
          your business problems. Our products are designed for small to medium
          size companies willing to optimize their performance. Connect your
          conversations with the tools and services that you use to get the job
          done. With over 1,500 apps and a robust API, the Slack platform team
          works with partners and developers globally to build apps and
          integrations that streamline your work, automate mundane tasks and
          bring context into your conversations in Voip.
        </p>
      </div>
    </>
  );
}
