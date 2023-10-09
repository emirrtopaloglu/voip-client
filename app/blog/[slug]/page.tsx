import moment from "moment";

async function getPost(slug: string) {
  const res = await fetch(process.env.WEBSITE_URL + `/api/blogs/${slug}`, {
    cache: "no-store"
  });
  const data = await res.json();

  return data.data;
}

export default async function BlogPost({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const post = await getPost(slug);

  return (
    <article className="container py-8 lg:max-w-[65%]">
      <section id="post-header">
        <h1 className="text-4xl leading-relaxed text-stone-800">
          {post.title}
        </h1>
        <time className="block w-full text-stone-500 mb-2">
          {moment(new Date(post.created_at)).format("LLL")}
        </time>
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="h-64 md:h-[550px] w-full object-cover mb-8"
          />
        )}
      </section>
      <section
        id="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="text-stone-700 leading-relaxed text-base space-y-4"
      />
    </article>
  );
}
