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

  const response = await fetch(`${API_URL}/companies/${slug}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <header className="border-b border-white/[0.08]">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
            <Link
              href="/companies"
              className="text-lg font-semibold tracking-tight"
            >
              AIORBIT
            </Link>

            <Link
              href="/companies"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              AI Companies
            </Link>
          </div>
        </header>

        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[900px] items-center justify-center px-6">
          <div className="w-full rounded-2xl border border-white/[0.1] bg-[#0a0a0b] p-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">
              404
            </p>

            <h1 className="mb-3 text-3xl font-semibold">
              Company not found
            </h1>

            <p className="mb-8 text-sm text-gray-500">
              The company you are looking for does not exist.
            </p>

            <Link
              href="/companies"
              className="inline-flex rounded-lg border border-white/[0.12] px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              ← Back to Companies
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const company: Company = await response.json();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link
            href="/companies"
            className="text-lg font-semibold tracking-tight"
          >
            AIORBIT
          </Link>

          <Link
            href="/companies"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            AI Companies
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/companies"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <span>›</span>

          <Link
            href="/companies"
            className="transition hover:text-white"
          >
            AI Companies
          </Link>

          <span>›</span>

          <span className="text-gray-300">{company.name}</span>
        </div>

        {/* Hero */}
        <section className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6 md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Company logo / initial */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-[#111113] text-4xl font-semibold text-white">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-full w-full rounded-2xl object-contain p-3"
                  />
                ) : (
                  company.name.charAt(0).toUpperCase()
                )}
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-violet-400/30 bg-violet-400/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-violet-300">
                    {company.industry}
                  </span>

                  {company.headquarters && (
                    <span className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 text-[11px] text-gray-400">
                      {company.headquarters}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  {company.name}
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 md:text-base">
                  {company.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  {company.foundedYear && (
                    <span>Founded {company.foundedYear}</span>
                  )}

                  {company.headquarters && (
                    <>
                      <span className="text-white/20">•</span>
                      <span>{company.headquarters}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Website button */}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Visit Website
                <span className="ml-2">↗</span>
              </a>
            )}
          </div>
        </section>

        {/* Main content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Overview */}
          <section className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/[0.1] text-violet-300">
                ◈
              </div>

              <h2 className="text-lg font-semibold">
                Company Overview
              </h2>
            </div>

            <p className="text-sm leading-7 text-gray-400 md:text-base">
              {company.description}
            </p>
          </section>

          {/* Specifications */}
          <aside className="rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/[0.1] text-violet-300">
                ≡
              </div>

              <h2 className="text-lg font-semibold">
                Specifications
              </h2>
            </div>

            <div className="divide-y divide-white/[0.08]">
              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-gray-500">
                  Industry
                </span>

                <span className="text-right text-sm text-gray-200">
                  {company.industry}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-gray-500">
                  Headquarters
                </span>

                <span className="text-right text-sm text-gray-200">
                  {company.headquarters || 'Not available'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-gray-500">
                  Founded
                </span>

                <span className="text-right text-sm text-gray-200">
                  {company.foundedYear || 'Not available'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-gray-500">
                  Website
                </span>

                <span className="text-sm text-gray-200">
                  {company.website ? 'Available' : 'Not available'}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Company Information */}
        <section className="mt-6 rounded-2xl border border-white/[0.1] bg-[#0a0a0c] p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Company Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Key information about {company.name}
            </p>
          </div>

          <div className="divide-y divide-white/[0.08]">
            <div className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Headquarters
              </span>

              <span className="text-sm text-gray-200">
                {company.headquarters || 'Not available'}
              </span>
            </div>

            <div className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Founded
              </span>

              <span className="text-sm text-gray-200">
                {company.foundedYear || 'Not available'}
              </span>
            </div>

            <div className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Industry
              </span>

              <span className="text-sm text-gray-200">
                {company.industry}
              </span>
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/companies"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to all companies
          </Link>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-violet-300 transition hover:text-violet-200"
            >
              Visit official website ↗
            </a>
          )}
        </div>
      </div>
    </main>
  );
}