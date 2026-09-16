import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.company.createMany({
    data: [
      {
        name: 'The AI Signal',
        slug: 'the-ai-signal',
        description:
          'Media company providing a daily AI newsletter and podcast, curating the most important developments in artificial intelligence for professionals and businesses.',
        industry: 'AI Media & Information',
        website: 'https://theaisignal.com',
        headquarters: 'Mumbai, India',
        foundedYear: 2026,
      },
      {
        name: 'OpenAI',
        slug: 'openai',
        description:
          'AI research and deployment company building advanced artificial intelligence systems and products.',
        industry: 'Generative AI',
        website: 'https://openai.com',
        headquarters: 'San Francisco, California',
        foundedYear: 2015,
      },
      {
        name: 'Anthropic',
        slug: 'anthropic',
        description:
          'AI safety and research company focused on building reliable, interpretable, and steerable AI systems.',
        industry: 'AI Research',
        website: 'https://www.anthropic.com',
        headquarters: 'San Francisco, California',
        foundedYear: 2021,
      },
      {
        name: 'Google DeepMind',
        slug: 'google-deepmind',
        description:
          'AI research laboratory working on fundamental advances in artificial intelligence and its applications.',
        industry: 'AI Research',
        website: 'https://deepmind.google',
        headquarters: 'London, United Kingdom',
        foundedYear: 2010,
      },
      {
        name: 'Mistral AI',
        slug: 'mistral-ai',
        description:
          'AI company developing efficient and accessible foundation models and generative AI technology.',
        industry: 'Generative AI',
        website: 'https://mistral.ai',
        headquarters: 'Paris, France',
        foundedYear: 2023,
      },
      {
        name: 'The Rundown AI',
        slug: 'the-rundown-ai',
        description:
          'Daily AI newsletter and podcast delivering concise updates on artificial intelligence breakthroughs, tools, and industry trends.',
        industry: 'AI Media & Information',
        website: 'https://www.therundown.ai',
        headquarters: 'Remote / Global',
        foundedYear: 2023,
      },
      {
        name: 'Cohere',
        slug: 'cohere',
        description:
          'Enterprise AI company building language models and AI solutions for businesses.',
        industry: 'Enterprise AI',
        website: 'https://cohere.com',
        headquarters: 'Toronto, Canada',
        foundedYear: 2019,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });