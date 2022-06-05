import Register from './components/Register/Index';
import { FlagContextProvider } from './contexts/FlagsContext';

function App() {
  return (
    <>
      <FlagContextProvider>
        <Register />
      </FlagContextProvider>
    </>
  );
}

export default App;
