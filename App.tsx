import { ThemeProvider } from 'styled-components';
import Groups from './src/screens/Groups';
import theme from './src/theme';

import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { StatusBar } from 'react-native';
import Loading from './src/components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {fontsLoaded ? (<Groups />) : (<Loading />)}
    </ThemeProvider>
  );
}
