import { Controller, Get, Param, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getCompanies(
    @Query('search') search?: string,
    @Query('industry') industry?: string,
  ) {
    return this.companiesService.getCompanies(search, industry);
  }

  @Get(':slug')
  getCompanyBySlug(@Param('slug') slug: string) {
    return this.companiesService.getCompanyBySlug(slug);
  }
}