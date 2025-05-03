import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    px='3',
    py='1',
    rounded='lg',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-${px} py-${py} rounded-${rounded} ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
