import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => (
    <div className="text-center border-top border-light">
        <div className="d-flex justify-content-center p-3">
            CopyRights - 2018&nbsp;|&nbsp;<Link to="/privacy" className="">Privacy policy</Link>
        </div>
    </div>
)

export default Footer;
