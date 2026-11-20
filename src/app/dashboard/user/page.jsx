'use client';
import { useSession } from '@/lib/auth-client'
import { div } from 'framer-motion/client';
import React from 'react'

const UserDashboard = () => {
    const {data: session, isPending} = useSession();
    if(isPending){
        return <div>Loading...</div>
    }
    const user = session?.user;
    console.log(session);
  return (
    <div>
        <h2>Welcome back, {user?.name}</h2>
    </div>
  )
}

export default UserDashboard
