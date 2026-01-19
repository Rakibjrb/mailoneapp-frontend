type AuthLogin = {
    email: string;
    password: string;
    remember: boolean;
}

type AuthSignup = {
    name: string;
    email: string;
    password: string;
}

export type { AuthLogin, AuthSignup }