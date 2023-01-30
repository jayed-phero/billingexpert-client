import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import SmallSpinner from '../../Shared/SmallSpinner';
import BillingTable from '../BillingPage/BillingTable';
import Signin from '../Registration/Signin';

const Home = () => {

    const [user, setUser] = useState(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onSubmit = data => {
        console.log(data)
        const email = data.email
        const password = data.pasword

        const siginpdata = {
            email,
            password
        }

        setLoading(true)
        axios.post('https://billing-expert-server.vercel.app/api/login', siginpdata)
            .then(res => {
                console.log(res)
                if (res.data.status === 'error') {
                    setLoading(false)
                    toast.error(res.data.message)
                }
                else {
                    setLoading(false)
                    navigate('/')
                    toast.success(`${res.data.message}  ${res?.data?.data?.name}`)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleGooglesubmit = () => {
        toast.success("This section in not available right now!!!")
    }
    return (
        <div>
            <BillingTable />
        </div>
    );
};

export default Home;