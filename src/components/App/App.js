import { useEffect, useState } from "react";
import {
  withRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
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

const App = () => {
  document.documentElement.lang = "ru";
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesDB, setMoviesDB] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getAllMovies(), MainApi.getUserMovies()])
        .then(([movies, userMovies]) => {
          movies = convertMovies(movies);
          // console.log(movies);
          setMoviesDB(movies);
          setFavoriteMovies(userMovies);
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
            history.push(`${location.pathname}`);
          }
        })
        .catch((err) => console.log(err));
    } else return Promise.reject("Токен не валиден");
  };

  const handleSignUp = ({ name, email, password }) => {
    signUp({ name, email, password })
      .then(() => {
        // console.log(user);
        handleSignIn({ email, password });
      })
      .catch((err) => console.log(err));
  };

  const handleSignIn = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        // console.log(res.token);
        checkToken()
          .then(() => history.push("/movies"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    console.log("logout!");
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    history.push("/signin");
  };

  const handleCurrentUserUpdate = ({ name, email }) => {
    MainApi.updateCurrentUser({ name, email })
      .then(() => {
        setCurrentUser({ name, email });
      })
      .catch((err) => console.log(err));
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
            {/* {!loggedIn ? <Register onSignUp={ handleSignUp }/> : history.push('/')} */}
            <Register onSignUp={handleSignUp} loggedIn={loggedIn} />
          </Route>
          <Route path="/signin">
            <Login onSignIn={handleSignIn} loggedIn={loggedIn} />
            {/* {!loggedIn ? <Login onSignIn={ handleSignIn }/> : history.push('/')} */}
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Header isColorBackGround={true} loggedIn={loggedIn} />
            <Movies
              movies={moviesDB}
              onAdd={handleMovieAdd}
              onDelete={handleMovieDelete}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header isColorBackGround={true} loggedIn={loggedIn} />
            <Movies
              movies={favoriteMovies}
              favoriteMovies={favoriteMovies}
              onDelete={handleMovieDelete}
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
      </div>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);
