import React from 'react';
import Layout from '../componenets/shared/Layout';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Layout minimalNavbar title={"Page not found"}>
            <h2>Sorry, the requested page is not available.</h2>
            <p>Please check the url or return to the <Link to="/">home page</Link>.</p>
        </Layout>
    )
}

export default NotFoundPage;
