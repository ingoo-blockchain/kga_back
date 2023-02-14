import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import { ConfigModule } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from '../../../ormconfig'


@Module({
    imports:[
        TypeOrmModule.forRoot({...AppDataSource} as unknown),
        ConfigModule
    ],
    controllers:[AppController],
    providers:[AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
