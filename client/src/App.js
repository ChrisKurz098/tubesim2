import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Menu from './pages/Menu';
import Signup from './pages/Signup';



const httpLink = createHttpLink({
  uri: 'https://tubesimplusbackend.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//---React App Component---//

function App() {
  
//---STATES---//
const [menuToggle, setMenuToggle] = useState(false);


//----JSX----//
return (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home client={client} menuToggle={menuToggle} setMenuToggle={setMenuToggle} />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="*"
              element={<NoMatch />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  </ApolloProvider>
);
}

export default App;
