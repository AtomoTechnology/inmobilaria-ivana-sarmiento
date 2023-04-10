import React from 'react'

const BoxContainerPage = ({ children, className = '' }: { children: any, className?: string }) => {
    return (
        <div className={`container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center  ${className} `}>
            {children}
        </div>
    )
}

export default BoxContainerPage