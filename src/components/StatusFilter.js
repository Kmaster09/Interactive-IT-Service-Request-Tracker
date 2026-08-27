import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing } from '../utils/theme';

const filterOptions = [
  'All',
  'Draft',
  'Scheduled',
  'Published',
];

export default function StatusFilter({
  selectedFilter,
  onChangeFilter,
}) {
  return (
    <View style={styles.container}>
      {filterOptions.map((option) => {
        const isActive = selectedFilter === option;

        return (
          <Pressable
            key={option}
            onPress={() => onChangeFilter(option)}
            style={[
              styles.button,
              isActive && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.text,
                isActive && styles.activeText,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  button: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  text: {
    color: colors.mutedText,
    fontWeight: '700',
  },

  activeText: {
    color: '#FFFFFF',
  },
});