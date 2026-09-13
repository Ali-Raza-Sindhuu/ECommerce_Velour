import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <p className="font-display text-[clamp(4rem,12vw,8rem)] font-semibold leading-none tracking-tight text-black/10">
        404
      </p>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-black">This page has stepped out</h1>
        <p className="max-w-sm text-sm text-black/50">
          The page you're looking for doesn't exist or may have been moved. Let's get you back to the atelier.
        </p>
      </div>
      <Link
        to="/shops"
        className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition hover:bg-black/90"
      >
        Return to Shop
      </Link>
    </section>
  );
};

export default NotFound;
