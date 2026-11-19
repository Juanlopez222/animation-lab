import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { exercises } from './exercises';
import { colors } from '../theme';

const Drawer = createDrawerNavigator();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

export default function AppDrawer() {
  return (
    <NavigationContainer theme={navTheme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          drawerStyle: { backgroundColor: colors.surface, width: 280 },
          drawerActiveTintColor: colors.accent,
          drawerInactiveTintColor: colors.muted,
          drawerActiveBackgroundColor: colors.bg,
          sceneStyle: { backgroundColor: colors.bg },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Animation Lab', drawerLabel: '🏠  Inicio' }}
        />
        {exercises.map((e, i) => (
          <Drawer.Screen
            key={e.name}
            name={e.name}
            component={e.component}
            options={{ title: e.label, drawerLabel: `${e.icon}  ${i + 1}. ${e.label}` }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
