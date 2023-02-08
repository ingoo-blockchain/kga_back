import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
