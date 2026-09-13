import { Link, useParams } from "react-router-dom";
import { Calendar1, Clock, ArrowLeft } from "lucide-react";
import { blogs, getBlogBySlug } from "../data/blogs";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-white text-center">
        <p className="text-lg font-semibold text-black">Post not found</p>
        <Link to="/blog" className="text-sm text-black/60 underline">
          Back to journal
        </Link>
      </section>
    );
  }

  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <article className="bg-white">
      {/* Cover */}
      <div className="relative h-[45vh] w-full overflow-hidden sm:h-[55vh]">
        <img src={post.img} alt={post.title} className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.75) 100%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-[clamp(1.8rem,4.5vw,3.25rem)] font-semibold leading-[1.1] text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta + body */}
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-10 lg:px-0">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-black/50 hover:text-black">
          <ArrowLeft size={15} /> Back to journal
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-black/10 pb-6 text-sm text-black/60">
          <span>By {post.author}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {post.read}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar1 size={14} /> {post.date}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-black/75">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-[#f8f8f8] px-5 py-14 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-xl font-semibold text-black">More from the journal</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((b) => (
                <Link key={b.slug} to={`/blog/${b.slug}`} className="group flex flex-col gap-3">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={b.img}
                      alt={b.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm font-medium leading-snug text-black group-hover:underline">
                    {b.title}
                  </p>
                  <p className="text-xs text-black/45">{b.read}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPost;
