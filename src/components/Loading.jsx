import React from 'react'
import ReactLoading from 'react-loading';
 
const Loading = ({type,color}) => {
  return (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
  )
}

export default Loading