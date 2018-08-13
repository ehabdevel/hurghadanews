import React from 'react'
import { Link } from 'react-router-dom'
import remark from 'remark'
import reactRenderer from 'remark-react'

import { timeDifferenceForDate } from '../../utils'

export default class Post extends React.Component {

    render() {
        return (
            <div className='border-bottom border-light p-3 m-3'>
                <p className='h3'>
                    <Link to={`/post/${this.props.post.id}`}>
                        {this.props.post.title}
                    </Link>
                </p>
                <div className='d-sm-flex py-3 my-3'>

                    {this.props.post.images.map((image) => (
                        <div key={image.id} className="px-2 mx-2" style={{ maxWidth: 275 }}>
                            <Link to={`/post/${this.props.post.id}`}>
                                <img src={image.url} alt={image.name} className='rounded hoverable w-100' style={{ maxWidth: 250, maxHeight: 200 }} />
                            </Link>
                        </div>
                    ))}
                    <div className="p-3">
                        {remark().use(reactRenderer).processSync(this.props.post.description.substr(0, 140) + "...").contents}
                    </div>
                </div>
                <div className='d-sm-flex justify-content-between pt-3'>
                    <div className="">
                        <small>
                            <em className="d-inline-block text-truncate" style={{ maxWidth: 250 }}>
                                Source: {this.props.post.newsUrl}&nbsp;
                            </em>
                        </small>
                    </div>
                    <div className="ml-auto text-right">
                        <small>
                            <em>
                                Posted by: {this.props.post.author.name}&nbsp;
                            {timeDifferenceForDate(this.props.post.createdAt)}
                            </em>
                        </small>
                    </div>
                </div>
            </div>
        )
    }
}
