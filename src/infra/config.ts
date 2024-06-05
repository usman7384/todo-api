import 'dotenv/config';

interface Config {
    port: string;
    dbUri: string;
    googleClientId: string;
    googleClientSecret: string;
    jwtSecret: string;
    dbHost:string;
    dbUserName:string;
    dbPassword:string;
    dbName:string;
}

const config: Config = {
    port: process.env.PORT || '3000',
    dbUri: process.env.DB_URI || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    jwtSecret: process.env.JWT_SECRET || '',
    dbHost: process.env.DB_HOST || '',
    dbUserName: process.env.DB_USERNAME || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || ''
};

export default config;

