import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema} from './schemas/cat.schema';

@Module({
    imports:[MongooseModule.forFeature([{ name: Cat.name, schema:CatSchema }])],
    controllers: [CatsController],
    providers: [CatsService]
})
export class CatsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(LoggerMiddleware)
          .forRoutes('cats');
      }
}
