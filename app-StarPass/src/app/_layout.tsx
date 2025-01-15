import { PinProvider } from './context/pinCodeContext';
import { AttractionProvider } from './context/attractionsContext';
import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <PinProvider>
      <AttractionProvider>
      <Slot />
      </AttractionProvider>
    </PinProvider>
  );
}
