import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanies(search?: string, industry?: string) {
    return this.prisma.company.findMany({
      where: {
        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),

        ...(industry
          ? {
              industry: {
                equals: industry,
                mode: 'insensitive',
              },
            }
          : {}),
      },
    });
  }

  async getCompanyBySlug(slug: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        slug,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }
}