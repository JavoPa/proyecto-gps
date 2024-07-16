import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect, Stack } from 'expo-router';
import { Pressable , Text} from 'react-native';
import { setAuthToken } from '@/services/root.service';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import {rolesService} from '@/services/roles.service';

import { useSession } from '@/flo';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const headerShown = useClientOnlyValue(false, true); 
  const { session, isLoading, signOut } = useSession();

  if (isLoading) {
    return <Text>Cargando..</Text>;
  }
  //validar consistencia de token dentro de cada vista
  const rol = rolesService(session);
  if(rol == "academico" || rol == "funcionario" || rol == "estudiante"){
    signOut();
    return <Redirect href="/login" />;
  }
  
  if(!session) {
    return <Redirect href="/login" />;
  }else{
    setAuthToken(session);
  }

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: headerShown,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="ingresar"
        options={{
          title: 'Ingresar Bicicleta',
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bicicleta"
        options={{
          title: 'Mi Bicicleta',
          tabBarIcon: ({ color }) => <TabBarIcon name="bicycle" color={color} />,
        }}
      />
    </Tabs>
  );
}
