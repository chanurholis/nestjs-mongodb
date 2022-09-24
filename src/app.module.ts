import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CatsModule } from "./cats/cats.module";
import { ArticlesModule } from "./articles/articles.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/test"),
    CatsModule,
    ArticlesModule,
  ],
})
export class AppModule {}
