import React from 'react';
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

function App() {
  return (
    <Router>
      <MainNav />
      <Switch>
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
        <Route path="/posts/new">
          <NewPost />
        </Route>
        <Route path="/posts/:pid">
          <UpdatePost />
        </Route>
        <Route path="/auth/:authMode">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
    
  );
  
}

export default App;
