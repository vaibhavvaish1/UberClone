import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationCard from "../components/NavigationCard";
import RideOptions from "../components/RideOptions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <TouchableOpacity
        style={tw`absolute bg-gray-100 z-50 p-3 rounded-full top-16 left-8 shadow-lg`}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigationCard"
            component={NavigationCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptions"
            component={RideOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
