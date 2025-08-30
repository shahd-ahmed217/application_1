import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Post, Comment } from "../components/types";

type PostDetailsRouteProp = RouteProp<RootStackParamList, "PostDetails">;

type Props = {
  route: PostDetailsRouteProp;
};

export default function PostDetails({ route }: Props) {
  const { post } = route.params as { post: Post };
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gorest.co.in/public/v2/posts/${post.id}/comments`)
      .then((res) => res.json())
      .then((data: Comment[]) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [post.id]);

  return (
    <View style={styles.container}>
      {/* Post Card */}
      <View style={styles.postCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=" + (post.id % 70) }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>User {post.user_id}</Text>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      </View>

      {/* Comments */}
      <Text style={styles.commentsHeader}>Comments</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList<Comment>   // ✅ strongly type FlatList
          data={comments}
          keyExtractor={(item: Comment) => item.id.toString()} // ✅ now item is a Comment
          renderItem={({ item }: { item: Comment }) => (     // ✅ type item
            <View style={styles.commentCard}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=" + (item.id % 70) }}
                style={styles.commentAvatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text>{item.body}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  postCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 12,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: "#444",
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentCard: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentName: {
    fontWeight: "bold",
    marginBottom: 3,
  },
});



