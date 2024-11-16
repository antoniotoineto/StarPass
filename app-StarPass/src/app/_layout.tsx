import { PinProvider } from './context/pinCodeContext';
import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <PinProvider>
      <Slot />
    </PinProvider>
  );
}
