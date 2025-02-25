import React, { forwardRef } from 'react'

const Input = forwardRef(({
    label,
    labelText='black',
    type='text',
    className='',
    ...props
}, ref) => {
    const internalRef = ref || null;
    
    return (
        <div>
            <div>
                {label && 
                    <label className={`inline-block mb-1 pl-1 text-${labelText}`}>
                        {label}
                    </label>
                }
            </div>
            <div>
                <input
                    ref={internalRef}
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                    {...props}
                />
            </div>
        </div>
    )
}
);

export default Input
