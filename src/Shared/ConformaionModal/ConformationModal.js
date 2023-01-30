import React from 'react';
import SmallSpinner from '../SmallSpinner';

const ConformationModal = ({ handleDelete, data, loading }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className='text-center pb-7 text-lg font-bold'>Bill Delete Conformation</h3>
                    <h3 className="  text-lg text-center">Are you sure want to delete <span className='text-red-500'>{data._id}</span> this Bill info !!</h3>
                    <p className="py-4"></p>
                    <div className="modal-action">
                        <div className='flex items-center gap-3'>
                            <label htmlFor="my-modal-6" className=' px-5 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center ' >Cancel</label>
                            <label onClick={handleDelete} htmlFor="my-modall" className=' px-5 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center ' >

                                {
                                    loading ?
                                    <SmallSpinner/>
                                    :
                                    'Delete'
                                }
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConformationModal;