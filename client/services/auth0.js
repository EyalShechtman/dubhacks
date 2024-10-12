import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
    domain: 'YOUR_AUTH0_DOMAIN',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
});

export default auth0;
