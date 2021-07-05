import React from 'react';
import HorizontalNavbar from './HorizontalNavbar';
import VerticalNavbar from './VerticalNavbar';
import SEO from './Seo';


// this will contain the shared header
// this will wrap the contents of our not found page



const Layout = ({ title, children, minimalNavbar=false }) => {

    return (
        <section>
            <SEO title={title} />
            <HorizontalNavbar minimalNavbar={minimalNavbar} />
            <VerticalNavbar />
            <main>
                <section>
                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </section>
    )
}

export default Layout;
