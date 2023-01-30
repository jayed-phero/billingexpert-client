import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import ReusaModal from '../Home/ReusaModal';
import ReuseModal from '../../Shared/ResueModal/ReuseModal';
import SmallSpinner from '../../Shared/SmallSpinner';

const BillingTable = () => {
    const [loading, setLoading] = useState(false)

    const { handleSubmit, register } = useForm()
    const [addbill, setAddBill] = useState(false)

    const [billdata, setData] = useState(null)



    const { data: billingdata = [], isLoading, refetch } = useQuery({
        queryKey: ['api/billing-list'],
        queryFn: () => fetch(`${process.env.REACT_APP_API_URL}/api/billing-list`)
            .then(res => res.json())

    })


    const addBillForm = (data) => {
        console.log(data)
        const billdata = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            ammount: data.amount

        }
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/api/add-billing`, billdata)
            .then(res => {
                console.log(res)
                if (res.data.acknowledged === true) {
                    setAddBill(false)
                }
                refetch()
            })
            .catch(err => {
                console.log(err)
            })
    }



    const updateBillData = (data) => {
        console.log(data)
        const billdata = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            ammount: data.amount

        }
        setLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/api/update-billing/:${billdata._id}`, billdata)
            .then(res => {
                console.log(res)
                if (res.data.matchcount === true) {

                    setData(null)
                }
                refetch()
            })
            .catch(err => {
                console.log(err)
            })
    }
    // useEffect(() => {
    //     axios.get()
    // }, [])



    console.log(billingdata)
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='max-w-7xl mx-auto bg-gray-300 py-2 mt-11 mb-5 px-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-5 flex-1'>
                        <h3 className='text-lg font-semibold'>Billings</h3>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>

                            <input type="text" class="w-full py-1 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Search" />
                        </div>
                    </div>
                    <label htmlFor="my-modal" className=" px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" onClick={() => setAddBill(!addbill)}>Add New Bill</label>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr className='capitalized'>
                            <th className='border-r'>Biling ID</th>
                            <th> Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>ACtion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billingdata.map(data =>
                                <tr className='border'>
                                    <th className='border-r'>{
                                        loading ?
                                            <SmallSpinner />
                                            :
                                            `${data._id}`
                                    }</th>
                                    <td>  {data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.amount}</td>
                                    <td>
                                        <div className='flex items-center gap-3'>
                                            <h3 className=' px-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center '>Delete</h3>
                                            <label htmlFor="my-modal" className=' px-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center ' onClick={() => setData(data)}>Update</label>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                            <th>Last Login</th>
                            <th>Favorite Color</th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>

            {
                addbill &&
                <ReuseModal
                    handleSubmit={handleSubmit}
                    addBillForm={addBillForm}
                    register={register}
                    addbill={addbill}
                    setAddBill={setAddBill}
                    title={"Add New Bill Form"}
                    loading={loading}
                />

            }

            {
                billdata &&
                <ReusaModal
                    handleSubmit={handleSubmit}
                    updateBillData={updateBillData}
                    register={register}
                    addbill={addbill}
                    setAddBill={setAddBill}
                    title={"Update Bill Data"}
                    data={billdata}
                    setData={setData}
                />

            }
        </div>
    );
};

export default BillingTable;