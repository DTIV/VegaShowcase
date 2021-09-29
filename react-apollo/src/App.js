import  { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Showcase/Header';
import Markets from './components/Markets/Markets';
import MrktData from './components/Markets/MrktData';
import Parties from './components/Party/Parties';
import PartyData from './components/Party/PartyData';

function App() {
  return (
    <Router>
      <div className="App main-container">
        <Header />
        <Route exact path="/" component={Markets}/>
        <Route exact path="/" component={Parties}/>
        <Route exact path="/:id" component={MrktData}/>
        {/* <Route exact path="/party/:id" component={PartyData}/> */}
        <Route exact path="/party/:id" component={PartyData}/>
      </div>
    </Router>
  );
}

export default App;
