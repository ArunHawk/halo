import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {user} = useSelector(state=>state.halo)
  return (
    <div className="home">
      {!user ? (
        <>
        <h2>Please login to create your ToDo</h2>
        </>
      ):(
        <>
        <h2>Welcome Halo TODO Web APP</h2>
        <h1>Hi {user.username}</h1>
      </>
      )}
    
    </div>
  )
}

export default Home