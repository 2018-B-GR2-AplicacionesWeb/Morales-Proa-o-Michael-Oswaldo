import {Get, Controller, Request, Response, HttpCode, HttpException} from '@nestjs/common';
import { AppService } from './app.service';
//http



@Controller('Usuario')//Decoradores!!!!!!
//Decorador es una Funcion!
export class AppController {

  @Get('saludar')
  saludar(
  ): string {//metodo!
    return 'Hola mundo';
  }
    @Get('despedirse')
    @HttpCode(201)
    despedirse():Promise<string> {//metodo!
    return new Promise<string>
    (
        (resolve, reject)=>{
          throw new HttpException({'error en despedirse'0mh},400)


        }
    );
    }

    @Get('tomar')
    @HttpCode(201)
    tomar(): string {//metodo!


        return 'borracho';
    }
}
