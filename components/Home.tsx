import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Post } from './types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetch('https://gorest.co.in/public/v2/posts')
      .then(res => res.json())
      .then((data: Post[]) => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetails', { post: item })}
    >
      <Image
        source={{ uri: 'https://i.pravatar.cc/100?img=' + (item.id % 70) }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.username}>User {item.user_id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.body}>
          {item.body}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  username: { fontWeight: 'bold' },
  title: { fontSize: 16, marginVertical: 4 },
  body: { color: '#555' },
});
