import { useFonts } from 'expo-font'
// navigation
import { NavigationContainer } from '@react-navigation/native';
// components
import { MainStack } from './navigation/MainStack';
import { AuthStack } from './navigation/AuthStack';
// Apollo client:
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Apollo Client
const httpLink = createHttpLink({
  // complete after cloning
  uri: "",
});

const authLink = setContext(async (_, { headers }) => {
  // Obtén el token JWT de AsyncStorage
  const token = await AsyncStorage.getItem('token');
  console.log('from app   ' + token);
  

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Agrega el token en el encabezado si está disponible
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins300': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins400': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins500': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins600': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins700': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins800': require('./assets/fonts/Poppins-Black.ttf'),
  });

  if (!fontsLoaded) return null; 

  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
    {/* <AuthStack /> */}
    <MainStack />
    </NavigationContainer>
    </ApolloProvider>
  );
}

