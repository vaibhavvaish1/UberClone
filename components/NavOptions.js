import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import image from "../assets/diet.png";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin, setOrigin } from "../slices/navSlice";

const data = [
  {
    id: 123,
    title: "Book Ride",
    image: require("../assets/sedan.png"),
    screen: "MapScreen",
  },
  {
    id: 456,
    title: "Order Food ",
    image: require("../assets/diet.png"),
    screen: "EatsScreen",
  },
];
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin)
  return (
    <View style={{ flex: 0 }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate(item.screen)} style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-40`} disabled={!origin}>
              <View style={tw`${!origin && "opacity-20"}`}>
                <Image
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                  source={item.image}
                />
                <Text style={tw`mt-2 font-semibold text-lg`}>{item.title}</Text>
                <Icon
                  style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                  name="arrowright"
                  color="white"
                  type="antdesign"
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default NavOptions;
