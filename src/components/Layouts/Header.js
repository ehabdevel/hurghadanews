import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }


  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _showLogin = () => {
    this.props.history.replace('/login')
    window.location.reload()
  }

  _showSignup = () => {
    this.props.history.replace('/signup')
    window.location.reload()
  }

  _isLoggedIn = () => {
    return this.props.loggedInUserQuery.loggedInUser && this.props.loggedInUserQuery.loggedInUser.id !== null
  }

  render() {

    if (this.props.loggedInUserQuery.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark info-color">
          <div className="container">
            <Link to="/" className="navbar-brand font-weight-bold">Hurghada News</Link>

            <button onClick={this.handleClick.bind(this)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={this.state.active ? "collapse navbar-collapse" : "navbar-collapse"} id="basicExampleNav">

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/privacy" className="nav-link">Privacy</Link>
                </li>
                <li className="nav-item mb-1">
                  <Link to="/createpost" className="nav-link rounded white blue-grey-text py-1 mx-1"><small><strong>Add news</strong></small></Link>
                </li>
                <li className="nav-item">
                  <Link to="/createads" className="nav-link rounded white blue-grey-text py-1 mx-1"><small><strong>Advertise</strong></small></Link>
                </li>
              </ul>

              <form className="form-inline">
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </form>

              <div className="d-flex">

                <span>
                  {/* User ID: {this.props.loggedInUserQuery.loggedInUser.id} */}
                </span>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={this._logout}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </nav>
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark info-color">
          <div className="container">
            <Link to="/" className="navbar-brand font-weight-bold">Hurghada News</Link>

            <button onClick={this.handleClick.bind(this)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={this.state.active ? "collapse navbar-collapse" : "navbar-collapse"} id="basicExampleNav">

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/privacy" className="nav-link">Privacy</Link>
                </li>
              </ul>

              <form className="form-inline">
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </form>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={this._showLogin}>Log in</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" onClick={this._showSignup}>Sign up</Link>
                </li>
              </ul>

            </div>
          </div>

        </nav>
      </div>
    )
  }


}

//export default withRouter(Header)


const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: { fetchPolicy: 'network-only' }
})(withRouter(Header))
