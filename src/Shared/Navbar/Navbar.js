import React from 'react';

const Navbar = () => {
    return (
        <div className='py-3 bg-blue-200'>
            <div className=' max-w-7xl mx-auto flex items-center justify-between px-5 '>
                <h3 className='text-xl font-bold'>Billing Expert</h3>
                <h3 className='text-lg font-semibold'>Paid Total: 0</h3>
            </div>
        </div>
    );
};

export default Navbar;
