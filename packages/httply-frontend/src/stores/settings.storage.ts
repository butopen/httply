import { PersistentStorage } from '../shared/storage.util';
import { updateAutoplay } from './input.store';

interface Settings {
  autoplay: boolean;
}

function updateSettings() {
  updateAutoplay(settings.local().autoplay);
}

window.addEventListener('storage', updateSettings);

const settings = new PersistentStorage<Settings>('httply');

export function enableAutoplay() {
  settings.withStorage((s) => {
    s.local.autoplay = true;
  });
  updateAutoplay(settings.local().autoplay);
}

export function disableAutoplay() {
  settings.withStorage((s) => {
    s.local.autoplay = false;
  });
  updateAutoplay(settings.local().autoplay);
}

if (settings.local().autoplay == null || settings.local().autoplay == undefined) {
  enableAutoplay();
}
updateAutoplay(settings.local().autoplay);
