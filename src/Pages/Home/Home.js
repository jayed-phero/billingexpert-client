import React from 'react';
import BillingHeader from '../BillingPage/BillingHeader';
import BillingPage from '../BillingPage/BillingPage';
import BillingTable from '../BillingPage/BillingTable';
import Signin from '../Registration/Signin';

const Home = () => {
    return (
        <div>
            <BillingPage/>
            <BillingTable/>
        </div>
    );
};

export default Home;