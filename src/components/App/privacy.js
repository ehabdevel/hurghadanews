import React from 'react'


export default class Privacy extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="border-bottom border-light p-3 m-3">
                <p className="h3">Privacy policy</p>
                <strong>Who we are</strong>
                <p>Our website address is: https://hurghadanews.com.</p>
                <strong>What personal data we collect and why we collect it</strong>

                <p>We does not collect any personal data about visitors, and only collects the data shown on the User Profile screen from registered users.</p>

                <strong>Posts/Advertises/Comments</strong>

                <p>When visitors leave posts/ads/comments on the site we collect the data shown in the registeration form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>

                <p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. After approval of your post/ad/comment, your profile picture and name is visible to the public in the context of your comment.</p>

                <strong>Media</strong>

                <p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>

                <strong>Cookies</strong>

                <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>

                <p>If you have an account and you log in to this site, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>

                <p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>

                <p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>

                <strong>Embedded content from other websites</strong>

                <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.<br />
                    These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>

            </div>
        )
    }
}
