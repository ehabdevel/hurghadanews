import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdvertList from '../Adverts';
import ScrollButton from '../ScrollButton'

const Layout = ({ children }) => (
    <div className="container">
        <Header />
        <div className="row">
            <div className="col-sm-9 pt-5">
                {children}
            </div>
            <div className="col-sm-3 pt-5 border-left border-light">
                <AdvertList />
            </div>
        </div>
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
        <Footer />
    </div>
)

export default Layout;
