import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";

import { lastValueFrom, map } from "rxjs";
import { AxiosRequestConfig } from "axios";
import { Model } from "mongoose";

import { CreateArticleDto } from "./dto/create-article.dto";
import { Article, ArticleDocument } from "./schemas/article.schema";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    private readonly httpService: HttpService
  ) {}

  async create(createCatDto: CreateArticleDto): Promise<Article> {
    const createdCat = await this.articleModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.articleModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }

  async getAllArticles() {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "301cbe699ebe423b8b50154825aba47f",
      },
    };

    const response = await lastValueFrom(
      this.httpService
        .get("https://newsapi.org/v2/top-headlines?country=id", requestConfig)
        .pipe(
          map((response) => {
            return response.data;
          })
        )
    );

    return response?.articles;
  }

  async backupArticles() {
    const articles = await this.getAllArticles();

    return this.articleModel
      .insertMany(articles)
      .then(() => {
        console.log("Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
