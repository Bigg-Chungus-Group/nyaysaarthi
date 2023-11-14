import { Spinner } from '@nextui-org/react'
import React from 'react'

const Loader = () => {
  return (
    <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Spinner size="lg" color="success" />
    </div>
  )
}

export default Loader