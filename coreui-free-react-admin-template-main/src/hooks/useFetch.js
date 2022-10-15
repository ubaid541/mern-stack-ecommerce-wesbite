/* eslint-disable prettier/prettier */
import axios from 'axios'


import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async ()=>{
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false) 
    }
    fetchData()

  }, [url])

  const refetch = async ()=>{
    setLoading(true)
   try{
    const res = await axios.get(url)
    setData(res.data)
   }catch(err){
    setError(err)
   }

   setLoading(false)

  }

  return{data,loading,error,refetch}
  
}

export default useFetch
