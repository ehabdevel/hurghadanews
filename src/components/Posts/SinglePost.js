import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { timeDifferenceForDate } from '../../utils'

class SinglePost extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        if (this.props.postQuery.loading) {
            return (
                <div className='d-sm-flexpt-5'>
                    <div>
                        Loading...
                    </div>
                </div>
            )
        }

        const { Post } = this.props.postQuery
        const userId = this.props.loggedInUserQuery.loggedInUser.id

        return (
            <div>
                <div className="border-bottom border-light py-3 my-3">
                    <div className='close fixed right-0 top-0 pointer' onClick={this.props.history.goBack} >
                        Back
                    </div>

                    {userId === Post.author.id ?
                        <div className='delete ttu white pointer fw6 absolute left-0 top-0 br2' onClick={this.handleDelete} >
                            Delete
                    </div> :
                        <div className="p-2"></div>
                    }
                </div>

                <div className="p-3">
                    <div className="p-3">
                        <div className="text-center my-3 p-3">
                            {Post.images.map((image) => (
                                <div key={image.id}>
                                    <img src={image.url} alt={image.name} className="rounded" style={{ maxWidth: '100%', maxHeight: 500 }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-bottom border-light p-3 my-3">
                        <p className="h3">
                            <u>
                                {Post.title}
                            </u>
                        </p>
                        <div className="d-sm-flex justify-content-between mt-3">
                            <small>
                                <span className="d-inline-block text-truncate" style={{ maxWidth: 250 }}>
                                    Source: {Post.newsUrl}
                                </span>
                            </small>
                            <small>
                                Posted by: {Post.author ? Post.author.name : 'Unknown'}
                                &nbsp; - &nbsp;
                                {timeDifferenceForDate(Post.createdAt)}
                            </small>
                        </div>
                    </div>
                    <div className='py-3'>
                        {remark().use(reactRenderer).processSync(Post.description).contents}
                    </div>
                </div>
            </div>
        )
    }

    handleDelete = async () => {
        await this.props.deletePostMutation({ variables: { id: this.props.postQuery.Post.id } })
        this.props.history.replace('/')
    }
}

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
        id
    }
 }
`

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    Post(id: $id) {
        id
        title
        description
        images {
            id
            name
            contentType
            url
        }
        newsUrl
        author {
          id
          name
        }
        createdAt
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
const DetailPostWithGraphQL = compose(
    graphql(POST_QUERY, {
        name: 'postQuery',
        // see documentation on computing query variables from props in wrapper
        // http://dev.apollodata.com/react/queries.html#options-from-props
        options: ({ match }) => ({
            variables: {
                id: match.params.id,
            },
        }),
    }),
    graphql(DELETE_POST_MUTATION, {
        name: 'deletePostMutation'
    }),
    graphql(LOGGED_IN_USER_QUERY, {
        name: 'loggedInUserQuery',
        options: { fetchPolicy: 'network-only' }
    })
)(SinglePost)



const DetailPostWithDelete = graphql(DELETE_POST_MUTATION)(DetailPostWithGraphQL)

export default withRouter(DetailPostWithDelete)