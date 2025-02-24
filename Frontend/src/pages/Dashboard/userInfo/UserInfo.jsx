import React from 'react'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const username = useSelector(state=>state.auth.username);
  return (
    <div>
      {username}
    </div>
  )
}

export default UserInfo
