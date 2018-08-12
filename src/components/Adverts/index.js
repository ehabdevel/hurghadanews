import React from 'react'
import Advert from './Advert'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AdvertList extends React.Component {

  render() {
    if (this.props.allAdvertsQuery.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.allAdvertsQuery.allAdverts.map((advert) =>
            <Advert key={advert.id} advert={advert} />
          )}
        </div>
      </div>
    )
  }
}

export const ALL_ADVERTS_QUERY = gql`
  query AllAdvertsQuery {
    allAdverts(orderBy: createdAt_DESC) {
      id
      title
      description
      adsUrl
      pics {
        id
        name
        url
      }
      postedBy{
        id
        name
      }
    }
  }
`

export default graphql(ALL_ADVERTS_QUERY, { name: 'allAdvertsQuery' })(AdvertList)