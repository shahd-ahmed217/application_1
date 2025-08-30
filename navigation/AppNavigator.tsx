// /navigation/AppNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import PostDetails from "../components/PostDetails";

// ✅ Define Post type
export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

// ✅ Define navigation stack types
export type RootStackParamList = {
  Home: undefined;
  PostDetails: { post: Post };
};

const Stack = createStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
}

