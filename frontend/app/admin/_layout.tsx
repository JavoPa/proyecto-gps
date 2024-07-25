import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable, Text , View} from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useSession } from '@/flo';
import { setAuthToken } from '@/services/root.service';
import {rolesService} from '@/services/roles.service';
import { useRouter } from 'expo-router';




// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function AdminLayout() {
  const colorScheme = useColorScheme();
  const headerShown = useClientOnlyValue(false, true);
  const { session,isLoading} = useSession();

  if (isLoading) {
    return <Text>Cargando..</Text>;
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
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal.usuarios" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="reorder"
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
            name="listaJaulas"
            options={{
                title: 'Jaulas',
                tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
            }}
        />

      <Tabs.Screen
        name="listaGuardias"
        options={{
          title: 'guardias',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
        <Tabs.Screen
            name="crearJaula"
            options={{
                title: 'Agregar Jaula',
                tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
            }}
        />
      <Tabs.Screen
        name="crearGuardia"
        options={{
          title: 'Agregar Guardia',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="crearUsuarios"
        options={{
          title: 'Crear User',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="horarios"
        options={{
         title: 'Horarios',
         tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
