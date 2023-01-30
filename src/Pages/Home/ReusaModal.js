import React from 'react';
import SmallSpinner from '../../Shared/SmallSpinner';

const ReusaModal = ({ handleSubmit, title, register, addbill, setAddBill, setData, data, addBillForm, updateBillData, loading }) => {
    console.log(data)
    return (
        <div>
            <div>
                <input type="checkbox" id="my-modall" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg text-center">{title}</h3>
                        {/* <label onClick={() => setAddBill(!addbill)} htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
                        <form onSubmit={handleSubmit(updateBillData)}>
                            <div>
                                <div class="mt-4">
                                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Full Name</label>
                                    <input id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type='text'
                                        defaultValue={data?.name}
                                        {...register('name')}
                                        required
                                    />
                                </div>

                                <div class="mt-4">
                                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Email Address</label>
                                    <input id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email"
                                        defaultValue={data?.email}
                                        {...register('email')}
                                        required />
                                </div>

                                <div class="mt-4">
                                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Phone</label>
                                    <input id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text"
                                        defaultValue={data?.phone}
                                        {...register('phone')} required />
                                </div>

                                <div class="mt-4">
                                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Payable Ammount</label>
                                    <input id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text"
                                        defaultValue={data?.amount}
                                        {...register('amount')} required />
                                </div>
                                <div className="modal-action">
                                    <button htmlFor="my-modal" type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center ">
                                        {
                                            loading ?
                                            <SmallSpinner/>
                                            :
                                            'Submit'
                                        }
                                    </button>
                                    {/* onClick={() => setAddBill(!addbill)} */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReusaModal;