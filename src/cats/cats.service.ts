import { Injectable } from '@nestjs/common';
import {Cat} from './interfaces/cats.interface'

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];
    
    async create(cat:Cat) {
        this.cats.push(cat)
    }

    async findAll(): Promise<Cat[]> {
        return this.cats
    }

}
