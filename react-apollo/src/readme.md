# GETTING STARTED
-----------------

Before creating with Vega GraphQL a client will need to be created with apollo.
This will be done in the main react files Index.js and App.js

For further component documentation, Navigate to the components folder.

## Index.js
----

This is where the Apollo client is created for HTTP and Websocket connection to the Vega GraphQl Server, and where the react App is rendered to view.

- For Queries and Mutations, All documentation for creating a client can be found [here] (https://www.apollographql.com/docs/react/get-started/)

- For Subscriptions, client is created with a split between HTTP and Websocket connection depending on purpose,
see documentation [here] (https://www.apollographql.com/docs/react/data/subscriptions/)
***use wss:// not ws:// as indicated in Apollo Docs***

- Once the client is created ApolloProvider is wrapped around the React App provided with the client.

```
<ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
</ApolloProvider>,
```


## App.js
-------
App.js is where all the components for this application come together to be rendered on index.js
For this application we have 5 components consisting of Markets, Party Orders, Trades, and Showcase.
Routing is used to navigate the different components and display them only when requested.

The App is wrapped with Router and each component is now a route. All data must be accessed from component or send through link and parsed.

```
import  { BrowserRouter as Router, Route} from 'react-router-dom'
//App.js
function App() {
  return (
    <Router>
      <div className="App main-container">
        <Route exact path="/party/:id" component={PartyData}/>
      </div>
    </Router>
  );
}
```

Alternatively, render can be used with a route to access component data from within App.
```
function App() {
  return (
    <Router>
      <div className="App main-container">
        <Route exact path="/party/:id" render={(props) => (
          <>
            <PartyData />
          </>
        )}/>
      </div>
    </Router>
  );
}
```

Link is now used inplace of buttons and <a> tags. to="" is used to send users to url destinations with the data defined in a Route. The data attached to the url can be accessed in the component to retrieve data.
```
//PartList.js
import { Link } from 'react-router-dom';

<Link key={party.id} className="link" to={`/party/${party.id}`}>
  <Party party={party}/>
</Link>
```