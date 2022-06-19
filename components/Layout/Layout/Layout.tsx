import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { lightTheme } from '../../../theme';
import Navbar from '../Navbar/Navbar';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ( { children } ) => {

    const isLoggedIn = false;
    return (
        // <Provider store={store}>
        <>
            <Head>
                <title>Next Commerce</title>
            </Head>
            <ThemeProvider theme={lightTheme}>
                <Navbar isLoggedIn={isLoggedIn} />
                {children}
                {/* Bottom Navbar */}
                {/* Footer */}
            </ThemeProvider>
            </>
        // </Provider>
    );
};

export default Layout;
