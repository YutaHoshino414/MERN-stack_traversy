import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client';
import Clients from './components/Clients';
import AddClient from './components/AddClient';
import Projects from './components/Projects';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClient />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
