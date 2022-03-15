import { withRouter, Route, Switch, useHistory } from 'react-router-dom';
import Header from './../Header/Header';
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';

const App = () => {
  // const [ loggedIn, setLoggedIn ] = useState(false);
  document.documentElement.lang = 'ru';

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header isColorBackGround={false} loggedIn={false}/>
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
            <Register />
        </Route>
        <Route path="/signin">
           <Login />
        </Route>
        <Route path="/movies">
          <Header isColorBackGround={true} loggedIn={true}/>
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header isColorBackGround={true} loggedIn={true}/>
          <Movies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isColorBackGround={true} loggedIn={true}/>
          <Profile />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;