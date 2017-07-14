import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducers from '../Reducers/RootReducer';
import Landing from '../Components/User/LandingPage.jsx';
import ApprovalPage from '../Components/User/ApprovalPage.jsx';
import Contributing from '../Containers/User/Contributing';
import About from '../Components/User/About.jsx';
import FAQ from '../Containers/User/FAQ.jsx';
import TokenDetail from '../Components/User/TokenDetail.jsx';
import Admin from '../Containers/Admin/Admin';
import NavBar from '../Containers/NavBar';
import UserPoolInfo from '../Containers/User/UserPoolInfo'

const store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxPromise));

// import { Route, HashRouter, NavLink } from 'react-router-dom';

const App = () => {
 return (
  <Provider store={store}>
  <HashRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/approval" component={ApprovalPage}/>
        <Route path="/contributing" component={Contributing}/>
        <Route path="/tokenDetail" component={TokenDetail}/>
        <Route path="/faq" component={FAQ}/>
        <Route path="/about" component={About}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/userPoolInfo" component={UserPoolInfo}/>
      </Switch>
    </div>
   </HashRouter>
   </Provider>
 ) 
}

export default App;