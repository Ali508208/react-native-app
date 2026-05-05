import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuthPresenter } from './src/mvp/presenter/useAuthPresenter';
import { HomeScreen } from './src/mvp/views/HomeScreen';
import { LoginScreen } from './src/mvp/views/LoginScreen';

function App() {
  const authPresenter = useAuthPresenter();

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={authPresenter.user ? 'light-content' : 'dark-content'}
        backgroundColor={authPresenter.user ? '#0f172a' : '#f4efe7'}
      />
      {authPresenter.user ? (
        <HomeScreen
          user={authPresenter.user}
          onLogout={authPresenter.logout}
        />
      ) : (
        <LoginScreen
          email={authPresenter.email}
          password={authPresenter.password}
          errorMessage={authPresenter.errorMessage}
          isPasswordVisible={authPresenter.isPasswordVisible}
          isSubmitDisabled={authPresenter.isSubmitDisabled}
          onChangeEmail={authPresenter.updateEmail}
          onChangePassword={authPresenter.updatePassword}
          onTogglePasswordVisibility={authPresenter.togglePasswordVisibility}
          onSubmit={authPresenter.submit}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
