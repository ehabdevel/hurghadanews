import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Layout from '../Layouts';
import PostList from '../Posts';
import SinglePost from '../Posts/SinglePost';
import CreatePost from '../Posts/CreatePost';
import CreateAdvert from '../Adverts/CreateAdvert'
import Privacy from './privacy'
import About from './About'
import CreateLogin from '../Auth/LoginUser'
import CreateUser from '../Auth/CreateUser'

class App extends Component {
  render() {
    return (
      <Layout>
        <div className="pt-5">
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route exact path="/createpost" component={CreatePost} />
            <Route exact path="/createads" component={CreateAdvert} />
            <Route path='/post/:id' component={SinglePost} />
            <Route exact path='/about' component={About} />
            <Route exact path='/privacy' component={Privacy} />
            <Route exact path="/login" component={CreateLogin} />
            <Route exact path="/signup" component={CreateUser} />
          </Switch>
        </div>
      </Layout>
    )
  }
}

export default withRouter(App)