import React from 'react';
import Home from "./src/screens/HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import FavoriteList from './src/screens/FavouriteListScreen';
import BlackList from "./src/screens/BlackListScreen";
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Provider } from 'react-redux';
import { store } from "./src/redux/store";
const Tab = createBottomTabNavigator();

const App: React.FC<any> = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen name="Favourite-List" component={FavoriteList} options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <AntDesign
                  name="profile"
                  size={30}
                  color={focused ? 'blue' : 'black'}
                />
              </View>
            )
          }} />
          <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <AntDesign
                  name="home"
                  size={30}
                  color={focused ? 'blue' : 'black'}
                />
              </View>
            )
          }} />
          <Tab.Screen name="Black-List" component={BlackList} options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <AntDesign
                  name="closecircleo"
                  size={30}
                  color={focused ? 'blue' : 'gray'}
                />
              </View>
            )
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App
