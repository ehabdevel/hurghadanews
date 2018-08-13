import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => (
    <div className="text-center border-top border-light">
        <div className="d-sm-flex flex-column justify-content-center p-3">
            <small>CopyRights - 2018&nbsp;|&nbsp;<Link to="/privacy" className="">Privacy policy</Link></small>
            <small>Proudly developed by <Link to="https://itredsea.com">ITRedSea | Ehab Ashour</Link></small>
        </div>
    </div>
)

export default Footer;
