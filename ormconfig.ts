import { DataSource } from 'typeorm'
import { ConfigService } from "src/modules/config";
import path from 'path'

const configService = new ConfigService('.env')

export const AppDataSource = new DataSource({
    type: configService.get('DB_TYPE') as 'mysql',
    host: configService.get('DB_HOST'),
    username:configService.get('DB_USERNAME'),
    password:configService.get('DB_PASSWORD'),
    database:configService.get('DB_DATABASE'),
    charset: 'utf8mb4',
    entities:[path.join(__dirname, '**','*.entity.{ts,js}')],
    synchronize:configService.get('DB_SYNC') === 'true',
    logging: configService.get('NODE_ENV') === 'dev',
    migrations:[path.join(__dirname,'/src/migrations')]
})
