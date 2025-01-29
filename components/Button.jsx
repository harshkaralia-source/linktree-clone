import React from 'react'

const Button = ({title, style}) => {
    return (
        <button className={`${style} py-5 px-5 sm:py-5 sm:px-6 font-medium rounded-full cursor-pointer`}>
            {title}
        </button>
    )
}

export default Button
