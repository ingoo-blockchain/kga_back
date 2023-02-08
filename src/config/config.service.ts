import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
    private readonly envConfig:EnvConfig

    constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {

    }
}
