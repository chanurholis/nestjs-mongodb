import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  source: [{ id: string; name: string }];

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  urlToImage: string;

  @Prop()
  publishedAt: string;

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
