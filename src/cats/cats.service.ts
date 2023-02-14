import { Injectable } from '@nestjs/common';
// import { ConfigService } from 'src/config/config.service';
import {Cat} from './interfaces/cats.interface'

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];
    // constructor(private readonly config:ConfigService){}

    async create(cat:Cat) {
        this.cats.push(cat)
    }

    async findAll(): Promise<Cat[]> {
        return this.cats
    }

}
