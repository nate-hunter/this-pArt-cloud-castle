import React from 'react'
import HorizontalNavbar from './HorizontalNavbar'
import SEO from './Seo'


// this will contain the shared header
// this will wrap the contents of our not found page

const Layout = ({ title, children }) => {

    return (
        <section>
            <SEO title={title} />
            <HorizontalNavbar />
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

export default Layout
