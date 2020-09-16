import React, {useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


import Posts from './posts/pages/Posts';
import MainNav from './shared/components/Nav/MainNav';
import Users from './users/pages/Users';
import UserPosts from './posts/pages/UserPosts';
import NewPost from './posts/pages/NewPost';
import UpdatePost from './posts/pages/UpdatePost';
import UpdateUser from './users/pages/UpdateUser';
import UserLikes from './posts/pages/UserLikes';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Posts />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:uid/posts" exact>
          <UserPosts />
        </Route>
        <Route path="/:uid/edit" exact>
          <UpdateUser />
        </Route>
        <Route path="/:uid/likes" exact>
          <UserLikes />
        </Route>
        <Route path="/new" exact>
          <NewPost />
        </Route>
        <Route path="/posts/:pid" exact>
          <UpdatePost />
        </Route>
        <Redirect to="/"/>
      </React.Fragment>
        

    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Posts />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:uid/posts" exact>
          <UserPosts />
        </Route>
        <Route path="/auth/:authMode">
          <Auth />
        </Route>
        <Redirect to="/"/>
      </React.Fragment>
        
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout}}>
       <Router>
      <MainNav />
      <Switch>
        {routes}
      </Switch>
    </Router>
    </AuthContext.Provider>
   
    
  );
  
}

export default App;
