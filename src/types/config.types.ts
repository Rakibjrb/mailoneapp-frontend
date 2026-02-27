export interface IConfig {
    _id: string;
    appName: string;
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}