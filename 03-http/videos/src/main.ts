import { NestFactory} from '@nestjs/core';
//import * as nombre_le_demos
import {Options} from 'http-server';


import { AppModule } from './app.module';
import {a,} from "./mi-codigo";

async function bootstrap() {
  console.log(a)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
