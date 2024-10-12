import { Text, View, Button } from "react-native";
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { useState } from 'react';

const LogoutButton = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log out" />
}

const LoginButton = ({ setAccessToken }) => {
  const { authorize, getCredentials } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
      const credentials = await getCredentials();
      if (credentials) {
        setAccessToken(credentials.accessToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />
}

const FetchProtectedApiButton = ({ accessToken }) => {
  console.log(accessToken);
  const fetchProtectedApi = async () => {
    if (!accessToken) {
      console.log("No access token available. Please log in.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/authorized', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`, // Attach the access token
        },
      });

      if (response.status === 401) {
        console.log('Unauthorized - Invalid token');
      } else {
        const data = await response.text();
        console.log('Protected API response:', data);
      }
    } catch (error) {
      console.error('Error fetching protected API:', error);
    }
  };

  return <Button onPress={fetchProtectedApi} title="Fetch Protected API" />
}


export default function Index() {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <Auth0Provider domain={"dev-w5mc4qlyvvazlxk2.us.auth0.com"} clientId={"lBSMealba0tfz3VOyuwVBsR6mZKfrGcX"}>
      {/* your application */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginButton setAccessToken={setAccessToken} />
        <LogoutButton />
        <FetchProtectedApiButton accessToken={accessToken} />
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </Auth0Provider>

  );
}
