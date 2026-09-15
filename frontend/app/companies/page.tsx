'use client';

import { FormEvent, useEffect, useState } from 'react';
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

const ecosystemItems = [
  'New',
  'Tools',
  'Agents',
  'Tasks',
  'Companies',
  'News',
  'Videos',
  'Robots',
  'Devices',
  'Models',
  'Repositories',
  'MCP',
];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCompanies = async (
    searchValue = '',
    industryValue = '',
  ) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();

      if (searchValue.trim()) {
        params.append('search', searchValue.trim());
      }

      if (industryValue) {
        params.append('industry', industryValue);
      }

      const queryString = params.toString();

      const response = await fetch(
        `${API_URL}/companies${
          queryString ? `?${queryString}` : ''
        }`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }

      const data: Company[] = await response.json();

      setCompanies(data);

      setIndustries((previousIndustries) => {
        const allIndustries = [
          ...previousIndustries,
          ...data.map((company) => company.industry),
        ];

        return [...new Set(allIndustries)].sort();
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    fetchCompanies(search, industry);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    fetchCompanies(search, value);
  };

  const clearFilters = () => {
    setSearch('');
    setIndustry('');
    fetchCompanies();
  };

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

          <nav className="hidden items-center gap-8 text-sm text-gray-500 md:flex">
            <span className="text-gray-400">Business AI</span>
            <span className="text-purple-400">Leaderboard</span>
            <span>Resources</span>
            <span>Newsletter</span>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full bg-purple-500 px-5 py-2 text-xs font-medium text-white transition hover:bg-purple-400 sm:block">
              + Submit Tool
            </button>

            <button className="rounded-full border border-white/[0.12] px-4 py-2 text-xs text-gray-300 transition hover:border-white/25 hover:text-white">
              Log In
            </button>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8">

        {/* Hero */}
        <section className="relative overflow-hidden pb-10 pt-16 text-center sm:pt-20">

          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 rounded-full bg-purple-500/[0.07] blur-3xl" />

          <div className="relative">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              The Home of Everything AI
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover companies building and shaping the future of
              artificial intelligence.
            </p>

            {/* Global Search */}
            <form
              onSubmit={handleSearch}
              className="mx-auto mt-8 max-w-2xl"
            >
              <div className="flex h-14 items-center rounded-xl border border-white/[0.09] bg-white/[0.035] px-5 shadow-2xl shadow-black/20 transition focus-within:border-white/20">

                <span className="mr-3 text-gray-500">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search AI companies..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />

                <span className="hidden rounded-md border border-white/[0.08] px-2 py-1 text-[10px] text-gray-600 sm:block">
                  ⌘ K
                </span>

              </div>
            </form>

            {/* Popular Filters */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">

              {['Trending', 'Popular', 'New', 'Free', 'Top Rated'].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-full border border-white/[0.1] bg-white/[0.025] px-4 py-2 text-xs text-gray-400 transition hover:border-white/20 hover:text-white"
                  >
                    {item}
                  </button>
                ),
              )}

            </div>
          </div>
        </section>

        {/* Ecosystem Navigation */}
        <section className="overflow-x-auto border-y border-white/[0.07] py-4">
          <div className="flex min-w-max gap-2">

            {ecosystemItems.map((item) => {
              const active = item === 'Companies';

              return (
                <Link
                  key={item}
                  href={active ? '/companies' : '#'}
                  className={`rounded-xl border px-5 py-3 text-xs font-medium transition ${
                    active
                      ? 'border-cyan-400/70 bg-cyan-400/[0.08] text-white'
                      : 'border-white/[0.07] bg-white/[0.025] text-gray-500 hover:border-white/[0.15] hover:text-gray-300'
                  }`}
                >
                  {item}
                </Link>
              );
            })}

          </div>
        </section>

        {/* Company Filters */}
        <section className="border-b border-white/[0.07] py-5">

          <div className="flex gap-2 overflow-x-auto pb-1">

            <button
              onClick={() => handleIndustryChange('')}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${
                industry === ''
                  ? 'border-white/20 bg-white/[0.08] text-white'
                  : 'border-white/[0.07] text-gray-500 hover:text-gray-300'
              }`}
            >
              All
            </button>

            {industries.map((item) => (
              <button
                key={item}
                onClick={() => handleIndustryChange(item)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${
                  industry === item
                    ? 'border-purple-400/40 bg-purple-400/[0.08] text-white'
                    : 'border-white/[0.07] text-gray-500 hover:text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        </section>

        {/* Results Header */}
        <section className="flex items-center justify-between py-6">

          <div>
            <h2 className="text-lg font-medium">
              AI Companies
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              {companies.length}{' '}
              {companies.length === 1 ? 'company' : 'companies'}
            </p>
          </div>

          {(search || industry) && (
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Clear filters
            </button>
          )}

        </section>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-16 text-center">
            <h2 className="text-lg font-medium">
              Unable to load companies
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Something went wrong while loading the company directory.
            </p>

            <button
              onClick={() => fetchCompanies(search, industry)}
              className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {!error && loading && (
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse border-b border-white/[0.06] bg-white/[0.02]"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!error && !loading && companies.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-20 text-center">
            <h2 className="text-lg font-medium">
              No companies found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or industry filter.
            </p>
          </div>
        )}

        {/* Company List */}
        {!error && !loading && companies.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">

            {/* Desktop Table Header */}
            <div className="hidden grid-cols-[2.4fr_1.5fr_1.5fr_1fr_0.8fr] gap-4 border-b border-white/[0.1] bg-white/[0.04] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 md:grid">
  <span>Company</span>
  <span>Location</span>
  <span>Industry</span>
  <span>Founded</span>
  <span></span>
</div>

            {companies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug}`}
                className="group block border-b border-white/[0.06] last:border-b-0 transition hover:bg-white/[0.025]"
              >

                {/* Desktop */}
                <div className="hidden grid-cols-[2.4fr_1.5fr_1.5fr_1fr_0.8fr] items-center gap-4 px-5 py-5 md:grid">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm font-semibold">
                      {company.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-white">
                        {company.name}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs text-gray-600">
                        {company.description}
                      </p>
                    </div>

                  </div>

                  <span className="text-xs text-gray-500">
                    {company.headquarters ?? '—'}
                  </span>

                  <span className="text-xs text-gray-400">
                    {company.industry}
                  </span>

                  <span className="text-xs text-gray-500">
                    {company.foundedYear ?? '—'}
                  </span>

                  <span className="text-right text-gray-600 transition group-hover:text-white">
                    ↗
                  </span>

                </div>

                {/* Mobile */}
                <div className="flex items-center gap-4 px-4 py-5 md:hidden">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm font-semibold">
                    {company.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-medium">
                      {company.name}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-600">
                      {company.industry}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-600">
                      {company.headquarters ?? 'Location unavailable'}
                    </p>

                  </div>

                  <span className="text-gray-600">
                    ↗
                  </span>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}