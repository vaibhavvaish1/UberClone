import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";

import { Icon } from "@rneui/base";

const NavigationCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center pb-5 text-xl`}>Hello, Vaibhav</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Where to?"
            minLength={2}
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={styles}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptions");
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly mt-auto py-2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptions")}
          style={tw`flex flex-row bg-black  w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center mx-2`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row  w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw` text-center mx-2`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
