import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from '@env'
import { setDestination, setOrigin } from "../slices/navSlice"
import { useDispatch } from "react-redux";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={{ uri: "https://img.icons8.com/ios/500/null/uber.png" }} />
        <GooglePlacesAutocomplete
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en'
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where From?"
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details.geometry.location, data.description)
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))

            dispatch(setDestination(null))

          }}
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18
            },
          }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
