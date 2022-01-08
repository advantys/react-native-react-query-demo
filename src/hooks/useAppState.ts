import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(onChange: (appState: AppStateStatus) => void) {
  useEffect(() => {
    return AppState.addEventListener('change', onChange);
  }, [onChange]);
}
