import React from 'react'

export default function Tooltip({tabName, y='10'}) {
    return (
        <span
            className={`absolute -translate-y-${y} -translate-x-1/2 mb-2 w-max text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        >
            {tabName}
        </span>
    )
}
