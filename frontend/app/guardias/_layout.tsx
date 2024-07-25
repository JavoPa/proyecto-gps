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

export default function GuardiasLayout() {
  const colorScheme = useColorScheme();
  const headerShown = useClientOnlyValue(false, true);
  const { session,isLoading } = useSession();
  const router = useRouter();
  
  if (isLoading) {
    return <Text>Cagando..</Text>;
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
            name="ListaUsuarios"
            options={{
                title: 'Usuarios',
                tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
            }}
        />
      <Tabs.Screen
        name="ingreso"
        options={{
          title: 'Validar Ingreso',
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

    </Tabs>
  );
}
