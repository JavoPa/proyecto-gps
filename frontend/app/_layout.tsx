
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SessionProvider } from '@/flo';
import { useSession } from '@/flo';
import { useColorScheme } from '@/components/useColorScheme';
import {rolesService} from '@/services/roles.service';
import { useRouter } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {signOut, session} = useSession(); 
  const router = useRouter();
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  //console.log(`session _layout ${session}`);
  if(session){
    signOut();
  }

  if(session){
    const rol = rolesService(session);
    if(rol == "academico" || rol == "funcionario" || rol == "estudiante" || rol == "invitado"){
      return router.replace('/tabs')
    }else{
      if(rol == "Guardia"){
        return router.replace('/guardias')
      }else{
        if(rol == "Administrador"){
          return router.replace('/admin')
        }
      }
    }
  }
  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
            <Stack.Screen name="guardias" options={{ headerShown: false }} />
            <Stack.Screen name="modal.usuarios" options={{ headerShown: true , title: 'Opciones'}} />
          </Stack>
    </ThemeProvider>
   
  );
}
