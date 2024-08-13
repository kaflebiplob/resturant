import React from 'react'

const ResDetails = (props) => {
    const name = props.params.name
  return (
    <div>
      this is the details page.
      {decodeURI(name)}
    </div>
  )
}

export default ResDetails
