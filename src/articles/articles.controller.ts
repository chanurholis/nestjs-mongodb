import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { Article } from "./schemas/article.schema";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly ArticleService: ArticlesService) {}

  @Get("get-all-articles")
  async getAllArticles() {
    return this.ArticleService.getAllArticles();
  }

  @Get("backup-articles")
  async backupArticles() {
    return this.ArticleService.backupArticles();
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    await this.ArticleService.create(createArticleDto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.ArticleService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Article> {
    return this.ArticleService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.ArticleService.delete(id);
  }
}
