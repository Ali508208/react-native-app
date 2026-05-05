/**
 * Toast helper – thin wrapper around react-native-toast-message.
 *
 * Usage anywhere in the app (no context needed):
 *   toast.success('Saved!');
 *   toast.error('Something went wrong', 'Please try again');
 *   toast.info('Notifications', 'You have 3 unread messages');
 */
import Toast from 'react-native-toast-message';

const BASE_CONFIG = {
  position: 'top' as const,
  topOffset: 56,
  visibilityTime: 3000,
};

export const toast = {
  success: (title: string, message?: string) =>
    Toast.show({ ...BASE_CONFIG, type: 'success', text1: title, text2: message }),

  error: (title: string, message?: string) =>
    Toast.show({ ...BASE_CONFIG, type: 'error', text1: title, text2: message, visibilityTime: 4500 }),

  info: (title: string, message?: string) =>
    Toast.show({ ...BASE_CONFIG, type: 'info', text1: title, text2: message }),
};
