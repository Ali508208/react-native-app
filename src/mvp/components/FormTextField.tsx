import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { palette, spacing } from '../theme/theme';

type FormTextFieldProps = TextInputProps & {
  label: string;
  iconName: string;
  helperText?: string;
  trailingIconName?: string;
  onTrailingIconPress?: () => void;
};

export function FormTextField({
  label,
  iconName,
  helperText,
  trailingIconName,
  onTrailingIconPress,
  ...textInputProps
}: FormTextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputShell}>
        <Feather color={palette.primary} name={iconName} size={18} />
        <TextInput
          placeholderTextColor={palette.textMuted}
          style={styles.input}
          {...textInputProps}
        />
        {trailingIconName ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={onTrailingIconPress}
            style={styles.trailingButton}>
            <Feather color={palette.textMuted} name={trailingIconName} size={18} />
          </Pressable>
        ) : null}
      </View>
      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  inputShell: {
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 58,
    paddingHorizontal: spacing.md,
    shadowColor: palette.shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  input: {
    color: palette.text,
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.sm,
  },
  trailingButton: {
    paddingVertical: 4,
  },
  helperText: {
    color: palette.textMuted,
    fontSize: 12,
    marginLeft: 2,
  },
});