import { useEffect, useState } from "react";
import {
  withRouter,
  Route,
  Switch,
  useHistory,
  useLocation
} from "react-router-dom";
import Header from "./../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "./../../context/CurrentUserContext";
import { signIn, signUp, getContent } from "../../utils/api-auth";
import MainApi from "../../utils/MainApi";
import getAllMovies from "../../utils/MoviesApi";
import { convertMovies } from "../../utils/service";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { ttMessages, defaultSearchQuery } from "../../utils/constants";

const App = () => {
  document.documentElement.lang = "ru";
  const history = useHistory();
  const location = useLocation();

  const lastUserQuery = JSON.parse(localStorage.getItem("lastSearch")) || defaultSearchQuery;

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesDB, setMoviesDB] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [lastSearch, setLastSearch] = useState(lastUserQuery);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getAllMovies(), MainApi.getUserMovies()])
        .then(([movies, userMovies]) => {
          movies = convertMovies(movies);
          setMoviesDB(movies);
          setFavoriteMovies(userMovies);

          localStorage.setItem(
            "favoriteMovies",
            JSON.stringify(userMovies.map((movie) => movie.movieId))
          );
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getCurrentUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  /**
   * User handlers
   */
  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return getContent(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            history.push(`/`);
          }
        })
        .catch((err) => console.log(err));
    } else return Promise.reject("Токен не валиден");
  };

  const handleSignUp = ({ name, email, password }) => {
    signUp({ name, email, password })
      .then(() => {
        openToolTip(true, ttMessages.registerOk);
        handleSignIn({ email, password });
      })
      .catch((err) => {
        console.log(err);
        openToolTip(false, ttMessages.registerFail + ` ${err}`);
      });
  };

  const handleSignIn = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        openToolTip(true, ttMessages.loginOk);
        localStorage.setItem("jwt", res.token);
        checkToken()
          .then(() => history.push("/"))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        openToolTip(false, ttMessages.loginFail + ` ${err}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("lastSearch")
    setLoggedIn(false);
    setCurrentUser({});
    setLastSearch(defaultSearchQuery);
    history.push("/");
  };

  const handleCurrentUserUpdate = ({ name, email }) => {

    MainApi.updateCurrentUser({ name, email })
      .then(() => {
        setCurrentUser({ name, email });
        openToolTip(true, ttMessages.profileOk);
      })
      .catch((err) => {
        console.log(err);
        openToolTip(false, ttMessages.profileFail + ` ${err}`);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  /**
   * Movie handlers
   */
  const handleMovieAdd = (movie) => {
    MainApi.addMovieToFavorite(movie)
      .then((movie) => {
        setFavoriteMovies([...favoriteMovies, movie]);
        // debugger;
        const localMovies =
          JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify([...localMovies, movie.movieId])
        );
      })
      .catch((err) => console.log(err));
  };

  const handleMovieDelete = (movie) => {

    const movieToDelete = favoriteMovies.find(
      (item) => item.movieId === movie.movieId
    );

    MainApi.deleteMovieFromFavorite(movieToDelete)
      .then(() => {
        setFavoriteMovies((favoriteMovies) =>
          favoriteMovies.filter((item) => item._id !== movieToDelete._id)
        );
        const localMovies = JSON.parse(localStorage.getItem("favoriteMovies"));

        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(
            localMovies.filter(
              (id) => id.toString() !== movie.movieId.toString()
            )
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleLastSearchUpdate = (searchQuery) => {
    if (location.pathname !== "/movies") return;
    setLastSearch(searchQuery);
    localStorage.setItem("lastSearch", JSON.stringify(searchQuery));
  }

  /**
   * Tooltip handlers
   */
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [ToolTipMessage, setToolTipMessage] = useState('');
  const [isToolTipOk, setIsToolTipOk] = useState(false);

  const closeToolTip = () => {
    setIsToolTipOpen(false);
  }

  const openToolTip = (isOk, message) => {
    setIsToolTipOpen(true);
    setToolTipMessage(message);
    setIsToolTipOk(isOk);

    // auto close
    setTimeout(() => {
      closeToolTip();
    }, 1500);
  }

  const handleEmptyQuery = () => {
    openToolTip(false, ttMessages.searchQueryFail)
  };

  useEffect(() => {
    // console.log(1)
    function closeByRandomClick(evt) {
      // console.log(evt);
      if (evt.target.classList.contains('popup')) {
        closeToolTip();
      }
    }

    document.addEventListener('mousedown', closeByRandomClick)

    return () => document.removeEventListener('mousedown', closeByRandomClick);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header isColorBackGround={false} loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            <Register onSignUp={handleSignUp} loggedIn={loggedIn} />
          </Route>
          <Route path="/signin">
            <Login onSignIn={handleSignIn} loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Header isColorBackGround={true} loggedIn={loggedIn} />
            <Movies
              movies={moviesDB}
              onAdd={handleMovieAdd}
              onDelete={handleMovieDelete}
              onEmptyQuery={handleEmptyQuery}
              lastSearch={lastSearch}
              onLastSearchUpdate={handleLastSearchUpdate}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header isColorBackGround={true} loggedIn={loggedIn} />
            <Movies
              movies={favoriteMovies}
              favoriteMovies={favoriteMovies}
              onDelete={handleMovieDelete}
              onEmptyQuery={handleEmptyQuery}
              lastSearch={defaultSearchQuery}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header isColorBackGround={true} loggedIn={loggedIn} />
            <Profile
              onLogout={handleLogout}
              onUserUpdate={handleCurrentUserUpdate}
            />
          </ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isToolTipOpen}
          isOk={isToolTipOk}
          message={ToolTipMessage}
          onClose={closeToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);
