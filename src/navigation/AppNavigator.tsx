import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import StageMapScreen from "../screens/stageMap/StageMapScreen";
import ClassificationPlayScreen from "../screens/classification/ClassificationPlayScreen";
import SettingScreen from "../screens/settings/SettingScreen";
import StickerGalleryScreen from "../screens/sticker/StickerGalleryScreen";
import ColorSortingPlayScreen from "../screens/classification/ColorSortingPlayScreen";
import ClassificationMenuScreen from "../screens/classification/ClassificationMenuScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ClassificationMenuScreen"
        component={ClassificationMenuScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="StageMapScreen"
        component={StageMapScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="ClassificationPlayScreen"
        component={ClassificationPlayScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="ColorSortingPlayScreen"
        component={ColorSortingPlayScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="StickerGalleryScreen"
        component={StickerGalleryScreen}
        options={{
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}
