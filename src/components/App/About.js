import React from 'react'
import { Link } from 'react-router-dom'

export default class About extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="border-bottom border-light p-3 m-3">
                <p className="h3">About</p>
                <dl className="p-3">
                    <dt>Who we are</dt>
                    <dd>- Our website address is: https://hurghadanews.com.</dd>
                </dl>
                <div>
                    <p>Hurghada News website is a Free service website cares about Hurghada City.</p>
                    <p>Hurghada News website is Made for the porpose of the study, and allowing everybody to post news articles and/or advertise ads for Free.</p>
                    <p>Please read our <Link to="/privacy">privacy policy</Link> before posting any news article or advertise.</p>
                    <p>Hurghada News is free to delete and/or mark spam any content what does not fit to it's policies at anytime.</p>
                </div>
            </div>
        )
    }
}
