import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import StatusFilter from '../components/StatusFilter';

import starterPosts from '../data/starterPosts';
import createId from '../utils/createId';
import { colors, spacing } from '../utils/theme';

export default function CreatorQueueScreen() {
  const [posts, setPosts] = useState(starterPosts);
  const [selectedFilter, setSelectedFilter] = useState('All');

  function handleAddPost(formValues) {
    const newPost = {
      id: createId(),
      title: formValues.title,
      platform: formValues.platform,
      type: formValues.type,
      status: 'Draft',
    };

    setPosts((currentPosts) => [
      newPost,
      ...currentPosts,
    ]);
  }

  function handleAdvancePost(id) {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== id) {
          return post;
        }

        if (post.status === 'Draft') {
          return {
            ...post,
            status: 'Scheduled',
          };
        }

        if (post.status === 'Scheduled') {
          return {
            ...post,
            status: 'Published',
          };
        }

        return post;
      })
    );
  }

  function handleDeletePost(id) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
  }

  const filteredPosts =
    selectedFilter === 'All'
      ? posts
      : posts.filter(
          (post) => post.status === selectedFilter
        );

  const publishedCount = posts.filter(
    (post) => post.status === 'Published'
  ).length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.kicker}>CONTENT PLANNER</Text>

        <Text style={styles.title}>
          Creator Queue
        </Text>

        <Text style={styles.subtitle}>
          Plan, schedule, and publish your content.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {posts.length}
          </Text>

          <Text style={styles.statLabel}>
            Total Posts
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {publishedCount}
          </Text>

          <Text style={styles.statLabel}>
            Published
          </Text>
        </View>
      </View>

      <PostComposer onAdd={handleAddPost} />

      <Text style={styles.sectionTitle}>
        Filter Queue
      </Text>

      <StatusFilter
        selectedFilter={selectedFilter}
        onChangeFilter={setSelectedFilter}
      />

      <Text style={styles.sectionTitle}>
        Content Queue
      </Text>

      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          platform={post.platform}
          type={post.type}
          status={post.status}
          onAdvance={handleAdvancePost}
          onDelete={handleDeletePost}
        />
      ))}

      {filteredPosts.length === 0 ? (
        <Text style={styles.emptyMessage}>
          No content matches this filter.
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: 60,
  },

  header: {
    marginBottom: spacing.lg,
  },

  kicker: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },

  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
  },

  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
  },

  statNumber: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },

  statLabel: {
    color: colors.mutedText,
    fontSize: 13,
    marginTop: 4,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.md,
  },

  emptyMessage: {
    color: colors.mutedText,
    textAlign: 'center',
    paddingVertical: spacing.xl,
    fontSize: 16,
  },
});