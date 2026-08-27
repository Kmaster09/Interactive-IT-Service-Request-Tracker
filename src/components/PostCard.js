import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing } from '../utils/theme';

export default function PostCard({
  id,
  title,
  platform,
  type,
  status,
  onAdvance,
  onDelete,
}) {
  const statusColor =
    status === 'Published'
      ? colors.published
      : status === 'Scheduled'
        ? colors.warning
        : colors.primary;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.platform}>{platform}</Text>

        <Text
          style={[
            styles.status,
            {
              color: statusColor,
              backgroundColor: `${statusColor}20`,
            },
          ]}
        >
          {status}
        </Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.type}>{type}</Text>

      <Pressable
        onPress={() => onAdvance(id)}
        style={styles.primaryButton}
        disabled={status === 'Published'}
      >
        <Text style={styles.primaryButtonText}>
          {status === 'Draft'
            ? 'MOVE TO SCHEDULED'
            : status === 'Scheduled'
              ? 'MARK PUBLISHED'
              : 'PUBLISHED ✓'}
        </Text>
      </Pressable>

      {status === 'Published' ? (
        <Pressable
          onPress={() => onDelete(id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>
            REMOVE FROM QUEUE
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  platform: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: '600',
  },

  status: {
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },

  type: {
    color: colors.mutedText,
    fontSize: 14,
    marginBottom: spacing.md,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: spacing.sm,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 10,
    padding: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  deleteButtonText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: 13,
  },
});