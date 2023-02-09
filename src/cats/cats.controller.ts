import {Body, Controller,Delete,Get,Header,HttpCode,HttpException,Param,Post,Put,Query,Redirect,HttpStatus, ParseIntPipe, UsePipes } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/index.dto';
import { Cat } from './interfaces/cats.interface';

class ForbiddenException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN)
    }
}

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){}

    @Post()
    @Header('Cache-Control','none')
    @HttpCode(201)
    create(@Body() createCatDto:CreateCatDto ):string {
        this.catsService.create(createCatDto)
        return 'This actions returns all cats'
    }

    @Get()
    async findAll(@Query() query: ListAllEntities):Promise<Cat[]> {
        // return `This action returns all cats (limit: ${query.start}, ${query.end} items)`
        return this.catsService.findAll()
    }

    @Get('error')
    error(){
        throw new ForbiddenException()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number):string {
        console.log(id+1)
        return `This action returns a #${id} cat`
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() updateCatDto:UpdateCatDto){
        console.log(updateCatDto)
        return `This actions updates a #${id} cat`
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return `This action removes a #${id} cat`
    }

    @Get('docs')
    @Redirect('https://naver.com',302)
    getDocs(@Query('version') version){
        if(version && version === '5') {
            return {url:'https://naver.com'}
        }
    }

    
}
