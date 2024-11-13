import { PinProvider } from './src/app/context/pinCodeContext';
import Home from './src/app';

export default function App() {
  return (
    <PinProvider>
      <Home />
    </PinProvider>
  );
}
