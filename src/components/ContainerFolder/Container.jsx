import React from 'react'

function Container({children, className='', px='4'}) {
    return (
        <div className={`w-full mx-auto px-${px} ${className}`}>{children}</div>
    )
}

export default Container
