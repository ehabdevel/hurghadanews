import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PostList extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    if (this.props.allPostsQuery.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100'>
          {this.props.allPostsQuery.allPosts.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}

export const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      title
      description
      author {
        id
        name
      }
      newsUrl
      images {
        id
        name
        url
      }
      createdAt
    }
  }
`

export default graphql(ALL_POSTS_QUERY, { name: 'allPostsQuery' })(PostList)