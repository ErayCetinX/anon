import 'react-native-gesture-handler';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const client = new ApolloClient({
  uri: 'http://192.168.1.106:4000/graphql',
  cache: new InMemoryCache(),
});

const Index = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
};

AppRegistry.registerComponent(appName, () => Index);
