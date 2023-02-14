import { utilities,WinstonModule } from "nest-winston";
import * as winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file';
import * as path from 'path'

const env = process.env.NODE_ENV || 'develop'
const logDir = path.join(__dirname, '../../logs')

const dailyOptions = (level) => {
    return {
        level,
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + `/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 30, //30일치 로그파일 저장
        zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    };
}
// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: env === 'production' ? 'http' : 'silly',
            format: 
                env === 'production'
                ? winston.format.simple()
                : winston.format.combine(
                    winston.format.timestamp(),
                    utilities.format.nestLike('develRoket', {
                        prettyPrint:true,
                    })
                )
        }),
        new winstonDaily(dailyOptions('info')),
        new winstonDaily(dailyOptions('warn')),
        new winstonDaily(dailyOptions('error'))
    ]
})