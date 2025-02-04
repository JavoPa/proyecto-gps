import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable, Text , View} from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useSession } from '@/flo';
import { setAuthToken } from '@/services/root.service';



// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function GuardiasLayout() {
  const { signOut } = useSession();
  const colorScheme = useColorScheme();
  const headerShown = useClientOnlyValue(false, true);
  const { session,isLoading } = useSession();
  
  if (isLoading) {
    return <Text>Cagando..</Text>;
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
        headerStyle: {
          backgroundColor: '#EDF2F4'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable onPress={signOut}>
              {({ pressed }) => (
                <FontAwesome
                  name="power-off"
                  size={25}
                  color='#13293D'
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
        <Tabs.Screen
            name="ListaUsuarios"
            options={{
                title: 'Usuarios',
                tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
            }}
        />
      <Tabs.Screen
        name="ingreso"
        options={{
          title: 'Ingresar',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />
      <Tabs.Screen
        name="escaneo"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
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
        name="incidente"
        options={{
          title: 'Incidentes',
          tabBarIcon: ({ color }) => <TabBarIcon name="warning" color={color} />,
        }}
      />
    </Tabs>
  );
}
