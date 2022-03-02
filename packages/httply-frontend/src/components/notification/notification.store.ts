import {loggedWritable} from '../../shared/store.util';

export interface Notifications {
  message: string;
  show: boolean;
  valideUpTo: number;
}

export const notificationStore = loggedWritable<Notifications>({
    message: '',
    show: false,
    valideUpTo: 0
});

export function updateNotification(message, timeMs = 4000) {
  notificationStore.update({
    message,
    show: true,
      valideUpTo: new Date().getTime() + timeMs
  });
}

export function updateHideNotification() {
  notificationStore.update({ show: false });
}
