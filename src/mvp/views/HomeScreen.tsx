import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import type { User } from '../model/User';
import { palette, spacing } from '../theme/theme';

type HomeScreenProps = {
  user: User;
  onLogout: () => void;
};

export function HomeScreen({ user, onLogout }: HomeScreenProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroLabel}>Home</Text>
              <Text style={styles.heroTitle}>Hello, {user.displayName}</Text>
            </View>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarText}>{user.displayName.charAt(0)}</Text>
            </View>
          </View>

          <Text style={styles.heroSubtitle}>
            Your session is active. This home screen is connected to a lightweight MVP auth presenter.
          </Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Feather color={palette.homeAccent} name="mail" size={18} />
              <Text style={styles.summaryLabel}>Signed in with</Text>
              <Text style={styles.summaryValue}>{user.email}</Text>
            </View>

            <View style={styles.summaryCard}>
              <Feather color={palette.homeAccent} name="clock" size={18} />
              <Text style={styles.summaryLabel}>Last login</Text>
              <Text style={styles.summaryValue}>{user.lastLoginLabel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Today’s focus</Text>
          <Text style={styles.taskBody}>
            Keep this as your base home view, then swap the mocked metrics with API data or persistent auth state.
          </Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>MVP structure</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Ready to extend</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={onLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}>
          <Feather color={palette.homeBackground} name="log-out" size={18} />
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.homeBackground,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  heroCard: {
    backgroundColor: palette.homeCard,
    borderColor: '#223053',
    borderRadius: 30,
    borderWidth: 1,
    padding: spacing.lg,
  },
  heroTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heroLabel: {
    color: '#9bb0d1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: palette.white,
    fontSize: 28,
    fontWeight: '800',
  },
  avatarBadge: {
    alignItems: 'center',
    backgroundColor: '#233252',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  avatarText: {
    color: palette.white,
    fontSize: 18,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#d1d8e8',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    gap: spacing.md,
  },
  summaryCard: {
    backgroundColor: '#17233f',
    borderRadius: 22,
    gap: spacing.xs,
    padding: spacing.md,
  },
  summaryLabel: {
    color: '#93a4c5',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  summaryValue: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '700',
  },
  taskCard: {
    backgroundColor: '#f5efe5',
    borderRadius: 28,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  taskTitle: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  taskBody: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  tagRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  tag: {
    backgroundColor: palette.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  tagText: {
    color: palette.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  logoutButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: palette.white,
    borderRadius: 18,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 'auto',
    minHeight: 54,
    paddingHorizontal: spacing.lg,
  },
  logoutButtonPressed: {
    opacity: 0.88,
  },
  logoutButtonText: {
    color: palette.homeBackground,
    fontSize: 15,
    fontWeight: '700',
  },
});