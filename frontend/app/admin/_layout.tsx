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
  const { session,isLoading,signOut} = useSession();

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
        tabBarActiveTintColor: '#13293D',
        tabBarActiveBackgroundColor: '#EDF2F4',
        tabBarInactiveBackgroundColor: '#EDF2F4',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: headerShown,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="power-off"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    onPress={() => {
                      signOut();
                    }}
                  />
                )}
              </Pressable>

          ),
          headerStyle: {
            backgroundColor: '#EDF2F4'
          }
        }}
      />
        <Tabs.Screen
            name="listaJaulas"
            options={{
                title: 'Jaulas',
                tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
                headerStyle: {
                  backgroundColor: '#EDF2F4'
                }
            }}
            

        />

      <Tabs.Screen
        name="listaGuardias"
        options={{
          title: 'Guardias',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerStyle: {
            backgroundColor: '#EDF2F4'
          }
        }}
      />

      <Tabs.Screen
        name="crearUsuarios"
        options={{
          title: 'Agregar Usuario',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerStyle: {
            backgroundColor: '#EDF2F4'
          }
        }}
      />
      <Tabs.Screen
        name="horarios"
        options={{
         title: 'Horarios',
         tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
         headerStyle: {
            backgroundColor: '#EDF2F4'
        }
        }}
      />
    </Tabs>
  );
}
