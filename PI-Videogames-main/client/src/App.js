import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path= '/home' component={Home} />
        <Route exact path={'/detail/:id'} element={<Detail />} />
        <Route exact path='/videogame' component={VideogameCreate} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
