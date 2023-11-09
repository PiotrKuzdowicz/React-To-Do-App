import { h, Component, render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header  from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import getTheme from './functions/theme.js';
import getAppVersion from './functions/appVersion.js';

class App extends Component {
  componentDidMount() {
    document.documentElement.classList.add(getTheme());
    document.documentElement.setAttribute('ver', getAppVersion());
  }

  render() {
    return (
        <LocationProvider>
          <Header />
          <main>
            <Router>
              <Route path="/" component={Home} />
              <Route default component={NotFound} />
            </Router>
          </main>
        </LocationProvider>
    );
  }
}

render(<App />, document.getElementById('app'));
