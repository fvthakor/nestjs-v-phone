import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from './entities/language.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])],
  controllers: [LanguagesController],
  providers: [LanguagesService]
})
export class LanguagesModule {}
