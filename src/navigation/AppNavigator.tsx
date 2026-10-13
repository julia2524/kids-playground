import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import StageMapScreen from "../screens/stageMap/StageMapScreen";

import SettingScreen from "../screens/settings/SettingScreen";
import StickerGalleryScreen from "../screens/sticker/StickerGalleryScreen";
import ColorSortingPlayScreen from "../screens/classification/ColorSortingPlayScreen";
import ClassificationMenuScreen from "../screens/classification/ClassificationMenuScreen";
import LanguageScreen from "../screens/LanguageScreen";
import ShapeSortingTestScreen from "../screens/test/ShapeSortingTestScreen";
import ShapeStickerScreen from "../screens/test/shapeStickerScreen";
import ShapeBasketPreviewScreen from "../screens/test/ShapeBasketPreviewScreen";
import ShapeSortingPlayScreen from "../screens/classification/ShapeSortingPlayScreen";

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
        name="ColorSortingPlayScreen"
        component={ColorSortingPlayScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="ShapeSortingPlayScreen"
        component={ShapeSortingPlayScreen}
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
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
      <Stack.Screen
        name="ShapeSortingTestScreen"
        component={ShapeSortingTestScreen}
      />
      <Stack.Screen name="ShapeStickerScreen" component={ShapeStickerScreen} />
      <Stack.Screen
        name="ShapeBasketPreviewScreen"
        component={ShapeBasketPreviewScreen}
      />
    </Stack.Navigator>
  );
}
