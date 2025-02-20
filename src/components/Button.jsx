import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    px='3',
    py='1',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-${px} py-${py} rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
