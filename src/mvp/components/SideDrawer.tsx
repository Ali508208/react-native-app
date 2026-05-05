import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Animated,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import type { User } from '../model/User';
import { palette, spacing } from '../theme/theme';

export type DrawerMenuItem = {
  id: string;
  icon: string;
  label: string;
  badge?: number;
  onPress: () => void;
};

type SideDrawerProps = {
  user: User;
  menuItems: DrawerMenuItem[];
  onClose: () => void;
  onLogout: () => void;
};

export type SideDrawerHandle = {
  close: () => void;
};

const SPRING_OPEN = { damping: 20, stiffness: 160, useNativeDriver: true } as const;
const SPRING_CLOSE = { damping: 22, stiffness: 200, useNativeDriver: true } as const;

export const SideDrawer = forwardRef<SideDrawerHandle, SideDrawerProps>(
  ({ user, menuItems, onClose, onLogout }, ref) => {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const DRAWER_WIDTH = Math.min(width * 0.82, 340);

    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const animateClose = useCallback(() => {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: -DRAWER_WIDTH, ...SPRING_CLOSE }),
        Animated.timing(overlayOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      ]).start(() => onClose());
    }, [slideAnim, overlayOpacity, DRAWER_WIDTH, onClose]);

    useImperativeHandle(ref, () => ({ close: animateClose }));

    // Animate open on mount
    useEffect(() => {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, ...SPRING_OPEN }),
        Animated.timing(overlayOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Android hardware back button
    useEffect(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        animateClose();
        return true;
      });
      return () => sub.remove();
    }, [animateClose]);

    const initials = user.displayName
      .split(' ')
      .slice(0, 2)
      .map(w => w.charAt(0))
      .join('')
      .toUpperCase();

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* ── Dimmed backdrop ── */}
        <Animated.View
          pointerEvents="auto"
          style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={animateClose} />
        </Animated.View>

        {/* ── Drawer panel ── */}
        <Animated.View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              paddingTop: insets.top + spacing.md,
              paddingBottom: Math.max(insets.bottom, spacing.lg),
              transform: [{ translateX: slideAnim }],
            },
          ]}>
          {/* Close button */}
          <Pressable
            accessibilityLabel="Close menu"
            hitSlop={12}
            onPress={animateClose}
            style={styles.closeBtn}>
            <Feather color="#94a3b8" name="x" size={18} />
          </Pressable>

          {/* ── Profile section ── */}
          <View style={styles.profileSection}>
            <View style={styles.avatarRing}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.displayName} numberOfLines={1}>
              {user.displayName}
            </Text>
            <Text style={styles.emailText} numberOfLines={1}>
              {user.email}
            </Text>
            <View style={styles.sessionPill}>
              <View style={styles.sessionDot} />
              <Text style={styles.sessionLabel}>Active session</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* ── Menu items ── */}
          <View style={styles.menuList}>
            {menuItems.map(item => (
              <Pressable
                key={item.id}
                onPress={() => {
                  item.onPress();
                  animateClose();
                }}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.menuRowPressed,
                ]}>
                <View style={styles.menuIconBox}>
                  <Feather color={palette.homeAccent} name={item.icon} size={18} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : (
                  <Feather color="#334155" name="chevron-right" size={15} />
                )}
              </Pressable>
            ))}
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Pressable
              onPress={() => {
                onLogout();
                onClose();
              }}
              style={({ pressed }) => [
                styles.logoutRow,
                pressed && styles.logoutRowPressed,
              ]}>
              <Feather color="#f87171" name="log-out" size={18} />
              <Text style={styles.logoutLabel}>Log out</Text>
            </Pressable>
            <Text style={styles.version}>v1.0.0 · MyApp</Text>
          </View>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#00000090',
  },
  drawer: {
    backgroundColor: '#0d1b35',
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.lg,
    position: 'absolute',
    top: 0,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e2d4a',
    borderRadius: 12,
    marginBottom: spacing.md,
    padding: 10,
  },
  // Profile
  profileSection: {
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  avatarRing: {
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderColor: palette.homeAccent,
    borderRadius: 36,
    borderWidth: 2.5,
    height: 72,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    width: 72,
  },
  avatarText: {
    color: palette.homeAccent,
    fontSize: 26,
    fontWeight: '800',
  },
  displayName: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 3,
  },
  emailText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  sessionPill: {
    alignItems: 'center',
    backgroundColor: '#0f3324',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  sessionDot: {
    backgroundColor: '#34d399',
    borderRadius: 999,
    height: 7,
    width: 7,
  },
  sessionLabel: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '700',
  },
  separator: {
    backgroundColor: '#1e2d4a',
    height: 1,
    marginBottom: spacing.md,
  },
  // Menu
  menuList: {
    flex: 1,
    gap: 2,
  },
  menuRow: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 13,
  },
  menuRowPressed: {
    backgroundColor: '#1e2d4a',
  },
  menuIconBox: {
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  menuLabel: {
    color: '#cbd5e1',
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 999,
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  // Footer
  footer: {
    borderTopColor: '#1e2d4a',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  logoutRow: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 13,
  },
  logoutRowPressed: {
    backgroundColor: '#2d1515',
  },
  logoutLabel: {
    color: '#f87171',
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    color: '#334155',
    fontSize: 11,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
