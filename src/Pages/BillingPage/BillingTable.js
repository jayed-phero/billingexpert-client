import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import ReusaModal from '../Home/ReusaModal';
import ReuseModal from '../../Shared/ResueModal/ReuseModal';
import SmallSpinner from '../../Shared/SmallSpinner';
import './Billing.css'
import ConformationModal from '../../Shared/ConformaionModal/ConformationModal';
import { toast } from 'react-hot-toast';

const BillingTable = () => {
    const [loading, setLoading] = useState(false)

    const { handleSubmit, register } = useForm()
    const [addbill, setAddBill] = useState(false)

    const [billdata, setData] = useState(null)

    const [deleteBill, setDeleteBill] = useState(null)

    console.log(billdata)


    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [billings, setBillings] = useState([])




    const { data: billingdata = [], isLoading, refetch } = useQuery({
        queryKey: ['api/billing-list'],
        queryFn: () => fetch(`${process.env.REACT_APP_API_URL}/api/billing-list?page=${page}&size=${size}`)
            .then(res => res.json())

    })


    // get billling 

    useEffect(() => {
        getallbilling()
    }, [page, size])

    const getallbilling = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/billing-list?page=${page}&size=${size}`)
            .then(res => {
                console.log(res)
                setCount(res.data.count);
                setBillings(res.data.billings);
            })
    }

    const pages = Math.ceil(count / size);


    // post billing 

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
                    setLoading(false)
                    getallbilling()
                    setAddBill(false)
                }
                refetch()
            })
            .catch(err => {
                console.log(err)
                setAddBill(false)
                setLoading(false)
            })
    }




    // update billinng 

    const updateBillData = (data) => {
        console.log(data)
        const billinfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            ammount: data.amount

        }
        setLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/api/update-billing/${billdata._id}`, billinfo)
            .then(res => {
                console.log(res)
                if (res?.data?.acknowledged === true) {
                    toast.success('Billing Info Updated Successfully')
                    getallbilling()
                    refetch()
                    setLoading(false)
                    setData(null)
                }
                setData(null)
            })
            .catch(err => {
                console.log(err)
                setData(null)
                setLoading(false)
            })
    }



    // delete billling 

    const handleDelete = (data) => {
        setLoading(true)
        axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-billing/${deleteBill._id}`)
            .then(res => {
                console.log(res)
                if (res?.data?.acknowledged === true) {
                    setLoading(false)
                    getallbilling()
                    toast.success('Billing Deleted Successfullly')
                    refetch()
                    setDeleteBill(null)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                toast.success('Please check your internety Connection')
                setDeleteBill(null)
            })
    }





    console.log(billingdata)
    console.log(billingdata.billings)
    return (
        <div className='max-w-7xl mx-auto px-5 lg:px-0 mb-16'>
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
                            <th className='border-r'> Full Name</th>
                            <th className='border-r'>Email</th>
                            <th className='border-r'>Phone</th>
                            <th className='border-r'>Paid Amount</th>
                            <th className='border-r'>ACtion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billings.map(data =>
                                <tr className='border-2'>
                                    <th className='border-r-2'>{
                                        loading ?
                                            <SmallSpinner />
                                            :
                                            `${data._id}`
                                    }</th>
                                    <td className='border-r-2'>  {data.name}</td>
                                    <td className='border-r-2'>{data.email}</td>
                                    <td className='border-r-2'>{data.phone}</td>
                                    <td className='border-r-2 text-center'>{data.ammount}</td>
                                    <td className='border-r-2'>
                                        <div className='flex items-center gap-3'>
                                            <label htmlFor="my-modal-6" className=' px-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center ' onClick={() => setDeleteBill(data)}>Delete</label>
                                            <label htmlFor="my-modall" className=' px-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center ' onClick={() => setData(data)}>Update</label>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <div className='mt-7'>
                    <div class="flex items-center justify-center">
                        <a href="#" class="flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>

                        <div className='flex items-center gap-3'>

                            {
                                [...Array(pages).keys()].map(number => <button
                                    key={number}
                                    className={page === number ? 'flex items-center justify-center px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200' : 'flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 border-2'}
                                    onClick={() => setPage(number)}
                                >
                                    {number + 1}
                                </button>)
                            }

                            <select className='border px-3 py-2 rounded outline-none' onChange={event => setSize(event.target.value)}>
                                <option value="5">5</option>
                                <option value="10" selected>10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>



                        <a href="#" class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
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
                    loading={loading}
                />

            }

            {
                deleteBill &&
                <ConformationModal
                    handleDelete={handleDelete}
                    data={deleteBill}
                    loading={loading}
                />
            }
        </div>
    );
};

export default BillingTable;