import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

class CreateAdvert extends React.Component {

  state = {
    title: '',
    description: '',
    adsUrl: ''
  }


  componentDidMount() {
    window.scrollTo(0, 0)
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.uploadFile(this.state.file);
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  uploadFile = (files) => {
    let data = new FormData()
    data.append('data', files)

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cjkklsqqw396301562tkf7ksa', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(file => {
      console.log(file)
      // const fileId = file.id
      // const imagesId = file.id
      // this.setState({ imagesId: file })
      this.setState({
        //file: file,
        picsIds: file.id
      });
    })
  }



  render() {
    if (this.props.loggedInUserQuery.loading) {
      return (<div>Loading</div>)
    }

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className='w-100 p-3'>
        <div class="alert alert-warning">
          <ul>
            <li>Any advertising is allowed to have up to 140 letters.</li>
            <li>If your post includes a photo then upload the photo first to include it with your post</li>
            <li>Every post or advertise can not have more than one photo.</li>
            <li>Photos must not be more than 1 mb, allowed formats (.png/.jpg)</li>
            <li>Please read our <Link to="/privacy">privacy policy</Link> before posting any news article or advertise.</li>
            <li>Hurghada News is free to delete and/or mark spam any content what does not fit to it's policies at anytime.</li>
          </ul>
        </div>
        <div className="border border-light rounded p-3">

          <div className="form-group">
            <div className="previewComponent">
              <form onSubmit={(e) => this._handleSubmit(e)}>
                <input className="fileInput"
                  type="file"
                  name={"picsIds"}
                  onChange={(e) => this._handleImageChange(e)} />
                <button className="submitButton"
                  type="submit"
                  onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
              </form>
              <div className="imgPreview">
                {$imagePreview}
              </div>
            </div>
          </div>

          <input
            className='w-100 p-3 my-2'
            value={this.state.title}
            placeholder='title Here'
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <input
            className='w-100 p-3 my-2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({ description: e.target.value })}
          />
          <input
            className="form-control"
            value={this.state.adsUrl}
            onChange={(e) => this.setState({ adsUrl: e.target.value })}
            placeholder='The URL for the ads'
          />

          {this.state.description && this.state.title &&
            <button className='py-3 pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  handlePost = async () => {
    // redirect if no user is logged in
    if (!this.props.loggedInUserQuery.loggedInUser) {
      console.warn('only logged in users can create new posts')
      return
    }

    const { description, title, adsUrl, picsIds } = this.state
    const postedById = this.props.loggedInUserQuery.loggedInUser.id

    await this.props.createAdvertMutation({ variables: { description, title, adsUrl, picsIds, postedById } })
    this.props.history.replace('/')
    window.location.reload()
  }
}

const CREATE_ADVERT_MUTATION = gql`
  mutation CreateAdvertMutation ($description: String!, $title: String!, $adsUrl: String, $postedById: ID!, $picsIds: [ID!]) {
    createAdvert(description: $description, title: $title, adsUrl: $adsUrl, postedById: $postedById, picsIds: $picsIds) {
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
  graphql(CREATE_ADVERT_MUTATION, { name: 'createAdvertMutation' }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(CreateAdvert))