import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1.2,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5W8",
  },
  {
    id: "Uber-X-789",
    title: "Uber lUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

//If we have surge pricing this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[tw`rounded-full`, { flex: 1, justifyContent: "center" }]}
            onPress={() => navigation.navigate("NavigationCard")}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
          <Text
            style={[
              tw`text-center py-5 text-xl`,
              { flex: 7, justifyContent: "center", marginRight: 50 },
            ]}
          >
            Select a Ride - {travelTimeInformation?.distance.text}
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{ uri: image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>{travelTimeInformation?.duration.text}</Text>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={tw`mt-auto border-t border-gray-200`}>
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideOptions;

const styles = StyleSheet.create({});
