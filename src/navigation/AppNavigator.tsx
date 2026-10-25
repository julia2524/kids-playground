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
import ShapeStickerPreviewScreen from "../screens/test/shapeStickerScreen";
import CategoryStickerPreviewScreen from "../screens/test/CategoryStickerPreviewScreen";
import CategorySortingTestScreen from "../screens/test/CategorySortingTestScreen";
import CategoryBasketPreviewScreen from "../screens/test/CategoryBasketPreviewScreen";
import CategoryScenePreviewScreen from "../screens/test/CategoryScenePreviewScreen";
import AnimalCategoryBackgroundPreviewScreen from "../screens/test/CategoryBackgroundPreviewScreen";
import CategorySortingPlayScreen from "../screens/classification/CategorySortingPlayScreen";
import SizeSortingTestScreen from "../screens/test/SizeSortingTestScreen";
import SizeSortingPlayScreen from "../screens/classification/SizeSortingPlayScreen";
import ProgressMoonTestScreen from "../screens/test/ProgressMoonTestScreen";
import StickerDetailScreen from "../screens/sticker/StickerDetailScreen";
import PatternGeneratorTestScreen from "../screens/test/PatternGeneratorTestScreen";
import PatternTestScreen from "../screens/test/PatternTestScreen";
import PatternPlayScreen from "../screens/pattern/PatternPlayScreen";

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
        name="CategorySortingPlayScreen"
        component={CategorySortingPlayScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="SizeSortingPlayScreen"
        component={SizeSortingPlayScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="PatternPlayScreen"
        component={PatternPlayScreen}
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
      <Stack.Screen
        name="StickerDetailScreen"
        component={StickerDetailScreen}
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
      <Stack.Screen
        name="CategoryStickerPreviewScreen"
        component={CategoryStickerPreviewScreen}
      />
      <Stack.Screen
        name="CategorySortingTestScreen"
        component={CategorySortingTestScreen}
      />
      <Stack.Screen
        name="AnimalCategoryBackgroundPreviewScreen"
        component={AnimalCategoryBackgroundPreviewScreen}
      />
      <Stack.Screen
        name="CategoryScenePreviewScreen"
        component={CategoryScenePreviewScreen}
      />
      <Stack.Screen
        name="SizeSortingTestScreen"
        component={SizeSortingTestScreen}
      />
      <Stack.Screen
        name="ProgressMoonTestScreen"
        component={ProgressMoonTestScreen}
      />
      <Stack.Screen name="PatternTestScreen" component={PatternTestScreen} />
      <Stack.Screen
        name="PatternGeneratorTestScreen"
        component={PatternGeneratorTestScreen}
      />
    </Stack.Navigator>
  );
}
