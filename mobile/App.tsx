import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import TextTranslationScreen from './screens/TextTranslationScreen';
import ConversationScreen from './screens/ConversationScreen';
import PhrasebookScreen from './screens/PhrasebookScreen';
import SettingsScreen from './screens/SettingsScreen';
<<<<<<< HEAD
=======
import PrivacyScreen from './screens/PrivacyScreen';
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
import { theme } from './config/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.bg },
            headerTintColor: theme.colors.primary,
            headerTitleStyle: { fontWeight: '700' },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Conversation" component={ConversationScreen} options={{ title: 'Conversation' }} />
          <Stack.Screen name="TextTranslation" component={TextTranslationScreen} options={{ title: 'Text Translation' }} />
          <Stack.Screen name="Phrasebook" component={PhrasebookScreen} options={{ title: 'Phrasebook' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
<<<<<<< HEAD
=======
          <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
>>>>>>> a63c00d87d0b2202b8469e2efd846526db1e5863
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
