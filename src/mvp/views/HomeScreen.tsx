import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import type { User } from '../model/User';
import { SideDrawer, type DrawerMenuItem, type SideDrawerHandle } from '../components/SideDrawer';
import { toast } from '../utils/toast';
import { palette, spacing } from '../theme/theme';

type HomeScreenProps = {
  user: User;
  onLogout: () => void;
};

const QUICK_ACTIONS = [
  { id: 'dashboard', icon: 'grid', label: 'Dashboard', color: '#3b82f6' },
  { id: 'alerts', icon: 'bell', label: 'Alerts', color: '#8b5cf6' },
  { id: 'profile', icon: 'user', label: 'Profile', color: '#10b981' },
  { id: 'settings', icon: 'settings', label: 'Settings', color: '#f59e0b' },
] as const;

const ACTIVITY_ITEMS = [
  { icon: 'log-in', label: 'Signed in successfully', time: 'Just now' },
  { icon: 'shield', label: 'Account verified', time: '2h ago' },
  { icon: 'settings', label: 'Profile updated', time: 'Yesterday' },
] as const;

export function HomeScreen({ user, onLogout }: HomeScreenProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<SideDrawerHandle>(null);
  const { width } = useWindowDimensions();

  // Responsive: on small phones tighten padding
  const isSmall = width < 360;
  const pad = isSmall ? spacing.md : spacing.lg;

  const menuItems: DrawerMenuItem[] = [
    {
      id: 'dashboard',
      icon: 'grid',
      label: 'Dashboard',
      onPress: () => toast.success('Dashboard', "You're already on the dashboard"),
    },
    {
      id: 'notifications',
      icon: 'bell',
      label: 'Notifications',
      badge: 3,
      onPress: () => toast.info('Notifications', 'You have 3 unread notifications'),
    },
    {
      id: 'profile',
      icon: 'user',
      label: 'My Profile',
      onPress: () => toast.info('Profile', 'Profile settings coming soon'),
    },
    {
      id: 'settings',
      icon: 'settings',
      label: 'Settings',
      onPress: () => toast.info('Settings', 'Settings coming soon'),
    },
    {
      id: 'help',
      icon: 'help-circle',
      label: 'Help & Support',
      onPress: () => toast.info('Help', 'Contact us at help@myapp.com'),
    },
  ];

  const initials = user.displayName
    .split(' ')
    .slice(0, 2)
    .map(w => w.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
      {/* ── Header ── */}
      <View style={[styles.header, { paddingHorizontal: pad }]}>
        <Pressable
          accessibilityLabel="Open menu"
          hitSlop={14}
          onPress={() => setDrawerOpen(true)}
          style={styles.headerBtn}>
          <Feather color={palette.white} name="menu" size={20} />
        </Pressable>

        <Text style={styles.headerTitle}>Home</Text>

        <Pressable
          accessibilityLabel="Notifications"
          hitSlop={14}
          onPress={() => toast.info('Notifications', 'You have 3 new notifications')}
          style={styles.headerBtn}>
          <View>
            <Feather color={palette.white} name="bell" size={20} />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>3</Text>
            </View>
          </View>
        </Pressable>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        contentContainerStyle={[styles.body, { padding: pad, paddingBottom: pad + spacing.lg }]}
        showsVerticalScrollIndicator={false}>
        {/* Welcome card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeRow}>
            <View style={styles.welcomeTextBlock}>
              <Text style={styles.welcomeHi}>Hello,</Text>
              <Text style={styles.welcomeName} numberOfLines={1}>
                {user.displayName}
              </Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          <Text style={styles.welcomeDesc}>
            Your session is active. Use the menu to navigate your account.
          </Text>

          <View style={styles.sessionChipRow}>
            <View style={styles.sessionChip}>
              <Feather color={palette.homeAccent} name="mail" size={13} />
              <Text style={styles.sessionChipText} numberOfLines={1}>
                {user.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Last login info bar */}
        <View style={styles.infoBar}>
          <View style={styles.infoBarLeft}>
            <Feather color={palette.homeAccent} name="clock" size={16} />
            <View>
              <Text style={styles.infoBarLabel}>Last login</Text>
              <Text style={styles.infoBarValue}>{user.lastLoginLabel}</Text>
            </View>
          </View>
          <View style={styles.onlinePill}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineLabel}>Online</Text>
          </View>
        </View>

        {/* Quick actions 2-column grid (twrnc style: flex-wrap + flexBasis) */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map(action => (
            <Pressable
              key={action.id}
              onPress={() => toast.info(action.label, `${action.label} coming soon`)}
              style={({ pressed }) => [
                styles.actionCard,
                // Responsive: on small phones take full width
                isSmall && styles.actionCardSmall,
                pressed && styles.actionCardPressed,
              ]}>
              <View style={[styles.actionIconBox, { backgroundColor: action.color + '22' }]}>
                <Feather color={action.color} name={action.icon} size={22} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recent activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {ACTIVITY_ITEMS.map((item, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={styles.activityIconBox}>
              <Feather color={palette.homeAccent} name={item.icon} size={15} />
            </View>
            <View style={styles.activityBody}>
              <Text style={styles.activityLabel}>{item.label}</Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
            <Feather color="#1e3a5f" name="chevron-right" size={14} />
          </View>
        ))}
      </ScrollView>

      {/* ── Side Drawer (Modal overlay) ── */}
      <Modal
        transparent
        visible={drawerOpen}
        onRequestClose={() => drawerRef.current?.close()}>
        <SideDrawer
          ref={drawerRef}
          menuItems={menuItems}
          user={user}
          onClose={() => setDrawerOpen(false)}
          onLogout={onLogout}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.homeBackground,
    flex: 1,
  },
  // Header
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  headerBtn: {
    alignItems: 'center',
    backgroundColor: '#1a2840',
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  headerTitle: {
    color: palette.white,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  notifBadge: {
    alignItems: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 999,
    height: 15,
    justifyContent: 'center',
    minWidth: 15,
    position: 'absolute',
    right: -5,
    top: -5,
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '800',
  },
  // Body
  body: {
    flexGrow: 1,
  },
  // Welcome card
  welcomeCard: {
    backgroundColor: palette.homeCard,
    borderColor: '#1f3052',
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  welcomeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  welcomeTextBlock: {
    flex: 1,
    marginRight: spacing.md,
  },
  welcomeHi: {
    color: '#7a94b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  welcomeName: {
    color: palette.white,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
  },
  avatarCircle: {
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderColor: palette.homeAccent,
    borderRadius: 30,
    borderWidth: 2,
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  avatarText: {
    color: palette.homeAccent,
    fontSize: 21,
    fontWeight: '800',
  },
  welcomeDesc: {
    color: '#7a94b8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  sessionChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sessionChip: {
    alignItems: 'center',
    backgroundColor: '#17233f',
    borderRadius: 999,
    flexDirection: 'row',
    flexShrink: 1,
    gap: 6,
    maxWidth: '100%',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  sessionChipText: {
    color: '#7a94b8',
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  // Info bar
  infoBar: {
    alignItems: 'center',
    backgroundColor: '#111c35',
    borderColor: '#1f3052',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  infoBarLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: spacing.sm,
  },
  infoBarLabel: {
    color: '#4e6480',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 1,
    textTransform: 'uppercase',
  },
  infoBarValue: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '700',
  },
  onlinePill: {
    alignItems: 'center',
    backgroundColor: '#0a2b1c',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  onlineDot: {
    backgroundColor: '#34d399',
    borderRadius: 999,
    height: 7,
    width: 7,
  },
  onlineLabel: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '700',
  },
  // Section title
  sectionTitle: {
    color: '#4e6480',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  // Quick actions grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  actionCard: {
    alignItems: 'center',
    backgroundColor: '#111c35',
    borderColor: '#1f3052',
    borderRadius: 22,
    borderWidth: 1,
    // ~47% so two per row with gap
    flexBasis: '47%',
    flexGrow: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  actionCardSmall: {
    flexBasis: '100%',
  },
  actionCardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  actionIconBox: {
    alignItems: 'center',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  actionLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
  // Activity feed
  activityRow: {
    alignItems: 'center',
    backgroundColor: '#111c35',
    borderColor: '#1f3052',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  activityIconBox: {
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  activityBody: {
    flex: 1,
  },
  activityLabel: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
  },
  activityTime: {
    color: '#3d5270',
    fontSize: 12,
    marginTop: 2,
  },
});