import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, spacing } from '../utils/theme';

export default function PostComposer({ onAdd }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!title.trim() || !platform.trim() || !type.trim()) {
      setError('Complete all three fields before adding content.');
      return;
    }

    onAdd({
      title: title.trim(),
      platform: platform.trim(),
      type: type.trim(),
    });

    setTitle('');
    setPlatform('');
    setType('');
    setError('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Content</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Post title"
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />

      <TextInput
        value={platform}
        onChangeText={setPlatform}
        placeholder="Platform: Instagram, TikTok, YouTube..."
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />

      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="Type: Reel, Carousel, Video..."
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        onPress={handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>ADD TO QUEUE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  heading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
  },

  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});