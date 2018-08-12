import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants';

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) { 
    authenticateUser(email: $email, password: $password) {
      token
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
class CreateLogin extends React.Component {
  
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

      return (
        <div className='w-100 pa4 flex justify-center'>
          <div>Loading</div>
        </div>
      )
    }

    // redirect if user is logged in
    if (this.props.loggedInUserQuery.loggedInUser.id) {
      console.warn('already logged in')
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

          {this.state.email && this.state.password &&
          <button type="button" class="btn btn-primary" onClick={this.authenticateUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  authenticateUser = async () => {
    const {email, password} = this.state

    const response = await this.props.authenticateUserMutation({variables: {email, password}})
    localStorage.setItem(AUTH_TOKEN, response.data.authenticateUser.token)
    this.props.history.replace('/')
    window.location.reload()
  }
}

export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, {name: 'authenticateUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(CreateLogin))
