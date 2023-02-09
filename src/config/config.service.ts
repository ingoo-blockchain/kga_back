import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions, EnvConfig } from './interfaces';
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

@Injectable()
export class ConfigService {
    private readonly envConfig:EnvConfig

    constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
        // const filePath = `${process.env.NODE_ENV || 'development'}.env`
        const filePath = `.env`
        const envFile = path.resolve(__dirname, '../../', options.folder, filePath)
        this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }

    get(key: string) : string {
        return this.envConfig[key]
    }
}


