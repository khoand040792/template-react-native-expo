import React from 'react';
import TitleHeader from '../components/TitleHeader';
import Notification from '../components/Notification';

export default HeaderNavigation = function (navigation, headerName) {
    const opts = {
        headerStyle: {
            backgroundColor: '#00a651',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
        },
        headerTitle: <TitleHeader name={headerName} />,
        headerRight: (
            <Notification navigations={navigation} />
        )
    }
    if (!navigation) {
        delete opts.headerRight;
    }
    return opts;
}