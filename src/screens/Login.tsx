import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, Stack} from '@react-native-material/core';
import {Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export function Login(): JSX.Element {
  const navigation = useNavigation<NavigationProp<any>>();

  const {authorize, isLoading, error, user} = useAuth0();
  const [ready, setReady] = useState(false);
  const [initiated, setInitated] = useState(false);

  useEffect(() => {
    let iId: number;
    if (!isLoading && !ready) {
      iId = setTimeout(() => setReady(true), 1000);
    }

    if (!error && ready && initiated && user) {
      setInitated(false);
      navigation.navigate('Todos');
    }

    return () => {
      if (iId) {
        clearInterval(iId);
      }
    };
  }, [error, initiated, isLoading, navigation, ready, user]);

  const handleLogin = async () => {
    setInitated(true);
    if (!user) {
      await authorize({
        scope: 'openid email profile',
        prompt: 'login',
      });
    }
  };

  return (
    <View style={styles.container}>
      {!ready ? (
        <Stack fill center spacing={4}>
          <ActivityIndicator size="large" />
        </Stack>
      ) : (
        <>
          <Button variant="text" title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
