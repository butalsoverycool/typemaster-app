import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

const FacebookLogin = async callback => {
  await Facebook.initializeAsync('2753637984867947', 'Typemaster');
  await Facebook.setAutoInitEnabledAsync(true);

  try {
    await Facebook.initializeAsync('2753637984867947', 'Typemaster');

    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      Alert('Logged in!', `Hi ${(await response.json()).name}!`, {
        text: 'Hi',
      });

      if (typeof callback === 'function')
        callback({
          success: true,
          token,
          permissions,
          expires,
          declinedPermissions,
        });

      //redirect? https://typemaster-2c275.firebaseapp.com/__/auth/handler
    } else {
      // type === 'cancel'

      Alert('Login failed', '', {
        text: 'Ok',
      });

      if (typeof callback === 'function')
        callback({
          success: false,
          token,
          permissions,
          expires,
          declinedPermissions,
        });
    }
  } catch ({ message }) {
    Alert('Login failed', message, {
      text: 'Ok',
    });
  }
};

export default FacebookLogin;
