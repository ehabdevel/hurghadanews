import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'


export default class Advert extends React.Component {

    render() {
        return (
            <div className="border-bottom border-light p-3 m-3">

                <p className='h3'>
                    {this.props.advert.title}&nbsp;
                </p>
                <div className="text-center my-3">
                    {this.props.advert.pics.map((pic) => (
                        <div key={pic.id}>
                            <img src={pic.url} alt={pic.name} className="hoverable" style={{ maxWidth: 200, maxHeight: 150, }} />
                        </div>
                    ))}
                </div>
                <small className="">
                    {remark().use(reactRenderer).processSync(this.props.advert.description.substr(0, 140) + "...").contents}
                </small>
                <div className="d-flex justify-content-between pt-1">
                    <small>
                        <em className="d-inline-block text-truncate" style={{ maxWidth: 350 }}>
                            <a href={this.props.advert.adsUrl} target="_blank">{this.props.advert.adsUrl}</a>&nbsp;
                        </em>
                    </small>
                    <small>
                        <em>
                            By: {this.props.advert.postedBy.name}
                        </em>
                    </small>
                </div>
            </div>
        )
    }
}
