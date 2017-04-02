import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import Home from './components/pages/home/Home';
import Users from './components/pages/users/Users';
import Challenges from './components/pages/challenges/Challenges';
import Admins from './components/pages/admins/Admins';
import NotFound from './components/not-found/NotFound';

import rootReducer from './reducers/rootReducer';

import "./style.css";

injectTapEventPlugin();

const store = createStore(rootReducer, applyMiddleware(thunk));

const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/admins" component={Admins} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
