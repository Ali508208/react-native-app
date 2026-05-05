import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          bounces={false}
          contentContainerStyle={[
            styles.content,
            { padding: isSmall ? spacing.md : spacing.lg },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* ── Hero banner ── */}
          <View style={styles.heroCard}>
            {/* Logo badge */}
            <View style={styles.logoBadge}>
              <Feather color="#a8f0e2" name="shield" size={22} />
            </View>

            <Text style={styles.appName}>MyApp</Text>
            <Text style={styles.heroTitle}>Secure{'\n'}workspace.</Text>
            <Text style={styles.heroSub}>
              Sign in to your account and manage everything from one place.
            </Text>

            {/* Feature chips */}
            <View style={styles.chipRow}>
              {['Encrypted', 'Fast', 'Reliable'].map(chip => (
                <View key={chip} style={styles.chip}>
                  <Text style={styles.chipText}>{chip}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Form card ── */}
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Welcome back</Text>
              <Text style={styles.formSubtitle}>
                Enter your credentials to continue.
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

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Feather color={palette.danger} name="alert-circle" size={14} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

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
  },
  // Hero banner
  heroCard: {
    backgroundColor: palette.primaryDark,
    borderRadius: 32,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    padding: spacing.xl,
  },
  logoBadge: {
    alignItems: 'center',
    backgroundColor: '#ffffff1a',
    borderRadius: 18,
    height: 46,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 46,
  },
  appName: {
    color: '#a8f0e2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: palette.white,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: spacing.sm,
  },
  heroSub: {
    color: '#b3c9c5',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.lg,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: '#ffffff1a',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  chipText: {
    color: '#a8f0e2',
    fontSize: 12,
    fontWeight: '700',
  },
  // Form card
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
    lineHeight: 20,
  },
  fieldGroup: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  // Error
  errorBox: {
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  errorText: {
    color: palette.danger,
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  // Submit button
  submitButton: {
    alignItems: 'center',
    backgroundColor: palette.accent,
    borderRadius: 18,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 58,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '700',
  },
});