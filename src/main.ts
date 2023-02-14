import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';
import { winstonLogger } from './utils/winstokn.util';


const bootstrap = async () => {
  const app = await NestFactory.create(AppModule,{
    logger: winstonLogger
  });
  
  setupSwagger(app)
  app.enableCors()

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();