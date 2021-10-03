VEGA SHOWCASE APPLICATION
-------------------------

How this Application Works:
---

This is a react application utilizing Vega GraphQL API and Apollo. Everything starts at Index.js.

Index.js
----

This is where the Apollo client is created for HTTP and Websocket connection to the Vega GraphQl Server, and where the react App is rendered to view.

- All documentation for creating a client can be found [here] (https://www.apollographql.com/docs/react/get-started/)

- Once the client is created ApolloProvider is wrapped around the React App provided with the client.

```
<ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
```


App.js
-------
App.js is where all the components for this application come together to be rendered on index.js

