import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants';

class CreateUser extends React.Component {

  constructor(props) {
    super()

    this.state = {
      email: '',
      password: '',
      name: '',
      emailSubscription: false,
    }
  }

  render () {
    if (this.props.loggedInUserQuery.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.loggedInUserQuery.loggedInUser.id) {
      console.warn('Already logged in')
      this.props.history.replace('/')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
      <div className="border border-light rounded p-5 m-5">
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          </div>
          <div className="form-group">
          <input
            className="form-control"
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
          </div>
          <div className="form-group">
          <input
            className="form-control"
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          </div>

          {this.state.name && this.state.email && this.state.password &&
          <button type="button" class="btn btn-primary" onClick={this.signupUser}>Sign up</button>
          }
        </div>
      </div>
    )
  }

  signupUser = async () => {
    const { email, password, name } = this.state

    try {
      const user = await this.props.signupUserMutation({variables: {email, password, name}})
      localStorage.setItem(AUTH_TOKEN, user.data.signupUser.token)
      this.props.history.replace('/')
    } catch (e) {
      console.error(`An error occured: `, e)
      this.props.history.replace('/')
    }

  }
}

const CREATE_USER_MUTATION = gql`
  mutation SignupUserMutation ($email: String!, $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
    }
  }
`

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, {name: 'signupUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(CreateUser))