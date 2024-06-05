import { OAuth2Client } from 'google-auth-library';
import config from '../../infra/config';
import axios from 'axios';

const client = new OAuth2Client(
    config.googleClientId,
    config.googleClientSecret,
    'http://localhost:3000/api/auth/google/callback'
);

export const getGoogleAuthURL = () => {
    const scopes = ['profile'];
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });

    return authUrl;
};

export const getGoogleUser = async (code: string) => {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
    return res.data;
};
