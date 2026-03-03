import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Home from '@src/screens/Home'
import Settings from '@src/screens/Settings'
import CreateNote from '@src/screens/CreateNote'
import NoteDetails from '@src/screens/NoteDetails'
import CreateGroup from '@src/screens/CreateGroup'
import GroupList from '@src/screens/GroupList'
import { NoteWithTimestamp } from '@src/services/storage'
import { useTheme } from '@src/contexts/ThemeContext'

export type RootStackParamList = {
  HomeTabs: undefined
  CreateNote: undefined
  NoteDetails: { note: NoteWithTimestamp }
  GroupList: undefined
  CreateGroup: undefined
}

export type TabParamList = {
  Home: undefined
  Settings: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

function HomeTabs() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.product.green_500,
        tabBarInactiveTintColor: theme.base.placeholder,
        tabBarStyle: {
          backgroundColor: theme.base.shape_primary,
          borderTopColor: theme.base.shape_third,
          borderTopWidth: 1,
          height: 60,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function Routes() {
  const { theme, themeMode } = useTheme()

  return (
    <NavigationContainer
      theme={{
        dark: themeMode === 'dark',
        colors: {
          primary: theme.product.green_500,
          background: theme.base.background,
          card: theme.base.shape_primary,
          text: theme.base.title,
          border: theme.base.shape_third,
          notification: theme.product.red_500,
        },
        fonts: {
          regular: {
            fontFamily: theme.font.family.regular,
            fontWeight: '400',
          },
          medium: {
            fontFamily: theme.font.family.regular,
            fontWeight: '500',
          },
          bold: {
            fontFamily: theme.font.family.bold,
            fontWeight: '700',
          },
          heavy: {
            fontFamily: theme.font.family.bold,
            fontWeight: '900',
          },
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="NoteDetails" component={NoteDetails} />
        <Stack.Screen name="GroupList" component={GroupList} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
