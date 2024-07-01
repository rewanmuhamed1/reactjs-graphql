import { ApolloClient, InMemoryCache, HttpLink ,ApolloLink} from '@apollo/client';



const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache( {dataIdFromObject: o => false} ),
});


export default client;