import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <Link className="btn btn-default bg-light  border w-100" to="../addItem">Add password</Link>
    </div>
  )
}

export default Dashboard