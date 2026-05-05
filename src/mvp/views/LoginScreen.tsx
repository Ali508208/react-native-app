import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import { FormTextField } from '../components/FormTextField';
import { palette, spacing } from '../theme/theme';

type LoginScreenProps = {
  email: string;
  password: string;
  errorMessage: string;
  isPasswordVisible: boolean;
  isSubmitDisabled: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onTogglePasswordVisibility: () => void;
  onSubmit: () => void;
};

export function LoginScreen({
  email,
  password,
  errorMessage,
  isPasswordVisible,
  isSubmitDisabled,
  onChangeEmail,
  onChangePassword,
  onTogglePasswordVisibility,
  onSubmit,
}: LoginScreenProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <View style={styles.logoBadge}>
              <Feather color={palette.white} name="shield" size={20} />
            </View>
            <Text style={styles.kicker}>Secure Workspace</Text>
            <Text style={styles.title}>Sign in to continue your daily flow.</Text>
            <Text style={styles.subtitle}>
              Clean access for your team dashboard, updates, and account activity.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Welcome back</Text>
              <Text style={styles.formSubtitle}>
                Use your email and password to open the home screen.
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <FormTextField
                autoCapitalize="none"
                autoCorrect={false}
                iconName="mail"
                keyboardType="email-address"
                label="Email address"
                onChangeText={onChangeEmail}
                placeholder="name@company.com"
                value={email}
              />

              <FormTextField
                autoCapitalize="none"
                autoCorrect={false}
                iconName="lock"
                label="Password"
                onChangeText={onChangePassword}
                onTrailingIconPress={onTogglePasswordVisibility}
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                trailingIconName={isPasswordVisible ? 'eye-off' : 'eye'}
                value={password}
              />
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitDisabled}
              onPress={onSubmit}
              style={({ pressed }) => [
                styles.submitButton,
                isSubmitDisabled && styles.submitButtonDisabled,
                pressed && !isSubmitDisabled && styles.submitButtonPressed,
              ]}>
              <Text style={styles.submitButtonText}>Sign in</Text>
              <Feather color={palette.white} name="arrow-right" size={18} />
            </Pressable>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>Demo account is prefilled for quick preview.</Text>
              <Text style={styles.metaLink}>MVP auth flow</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.canvas,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  heroCard: {
    backgroundColor: palette.primaryDark,
    borderRadius: 32,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    padding: spacing.xl,
    shadowColor: palette.shadow,
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 1,
    shadowRadius: 24,
  },
  logoBadge: {
    alignItems: 'center',
    backgroundColor: '#ffffff24',
    borderRadius: 18,
    height: 42,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 42,
  },
  kicker: {
    color: '#cde7df',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.white,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: '#d4ddd9',
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: '#f8f4ed',
    borderRadius: 30,
    padding: spacing.lg,
  },
  formHeader: {
    marginBottom: spacing.lg,
  },
  formTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  formSubtitle: {
    color: palette.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  fieldGroup: {
    gap: spacing.md,
  },
  errorText: {
    color: palette.danger,
    fontSize: 13,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: palette.accent,
    borderRadius: 18,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.lg,
    minHeight: 56,
  },
  submitButtonDisabled: {
    opacity: 0.55,
  },
  submitButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '700',
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  metaText: {
    color: palette.textMuted,
    flex: 1,
    fontSize: 12,
    marginRight: spacing.sm,
  },
  metaLink: {
    color: palette.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});