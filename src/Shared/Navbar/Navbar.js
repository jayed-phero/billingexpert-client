import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Navbar = () => {

    const { data: billingdata = [], isLoading, refetch } = useQuery({
        queryKey: ['api/billing-listt'],
        queryFn: () => fetch(`${process.env.REACT_APP_API_URL}/api/billing-listt`)
            .then(res => res.json())

    })

    const total = 0
    console.log(billingdata)


    return (
        <div className='py-3 bg-blue-200'>
            <div className=' max-w-7xl mx-auto flex items-center justify-between px-5 '>
                <h3 className='text-xl font-bold'>Billing Expert</h3>
                <h3 className='text-lg font-semibold'>Paid Total: {billingdata?.length}</h3>
            </div>
        </div>
    );
};

export default Navbar;
