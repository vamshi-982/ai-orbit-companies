import Link from 'next/link';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type Company = {
  id: number;
  name: string;
  slug: string;
  description: string;
  industry: string;
  website: string | null;
  logo: string | null;
  headquarters: string | null;
  foundedYear: number | null;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CompanyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${API_URL}/companies/${slug}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">

        {/* Header */}
        <header className="border-b border-white/[0.07]">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">

            <Link
              href="/"
              className="text-xl font-semibold tracking-tight"
            >
              <span className="text-white">AI</span>
              <span className="text-gray-400">ORBIT</span>
            </Link>

            <Link
              href="/companies"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              AI Companies
            </Link>

          </div>
        </header>

        {/* Not Found */}
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">

          <Link
            href="/companies"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to Companies
          </Link>

          <section className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-20 text-center sm:mt-20">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-xl text-gray-400">
              ?
            </div>

            <h1 className="mt-6 text-2xl font-semibold">
              Company not found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              The company you are looking for does not exist or may
              have been removed.
            </p>

            <Link
              href="/companies"
              className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Browse companies
            </Link>

          </section>

        </div>
      </main>
    );
  }

  const company: Company = await response.json();

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Header */}
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">

          <Link
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            <span className="text-white">AI</span>
            <span className="text-gray-400">ORBIT</span>
          </Link>

          <Link
            href="/companies"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            AI Companies
          </Link>

        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">

        {/* Back */}
        <div className="pt-8">
          <Link
            href="/companies"
            className="inline-flex items-center text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to Companies
          </Link>
        </div>

        {/* Hero */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-500/[0.08] blur-3xl" />

          <div className="relative p-7 sm:p-10">

            {/* Company Identity */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-3xl font-semibold">
                {company.name.charAt(0)}
              </div>

              <div className="min-w-0">

                <div className="mb-3 inline-flex rounded-full border border-purple-400/20 bg-purple-400/[0.06] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-purple-300">
                  {company.industry}
                </div>

                <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  {company.name}
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                  {company.description}
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* Company Information */}
        <section className="mt-6">

          <div className="mb-4">
            <h2 className="text-lg font-medium">
              Company Information
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Key information about {company.name}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">

            {/* Headquarters */}
            <div className="grid gap-2 border-b border-white/[0.06] px-5 py-5 sm:grid-cols-[180px_1fr] sm:items-center">

              <span className="text-xs uppercase tracking-wider text-gray-600">
                Headquarters
              </span>

              <span className="text-sm text-gray-300">
                {company.headquarters ?? 'Not available'}
              </span>

            </div>

            {/* Founded */}
            <div className="grid gap-2 border-b border-white/[0.06] px-5 py-5 sm:grid-cols-[180px_1fr] sm:items-center">

              <span className="text-xs uppercase tracking-wider text-gray-600">
                Founded
              </span>

              <span className="text-sm text-gray-300">
                {company.foundedYear ?? 'Not available'}
              </span>

            </div>

            {/* Industry */}
            <div className="grid gap-2 px-5 py-5 sm:grid-cols-[180px_1fr] sm:items-center">

              <span className="text-xs uppercase tracking-wider text-gray-600">
                Industry
              </span>

              <span className="text-sm text-gray-300">
                {company.industry}
              </span>

            </div>

          </div>

        </section>

        {/* Website */}
        <section className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:flex sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium text-gray-200">
              Official website
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Visit {company.name} online
            </p>
          </div>

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-200 sm:mt-0"
            >
              Visit Website ↗
            </a>
          ) : (
            <span className="mt-4 text-sm text-gray-600 sm:mt-0">
              Website unavailable
            </span>
          )}

        </section>

        {/* Bottom Navigation */}
        <div className="mt-10 border-t border-white/[0.07] pt-6">

          <Link
            href="/companies"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            ← Explore all AI Companies
          </Link>

        </div>

      </div>
    </main>
  );
}