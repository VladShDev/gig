import React from 'react';

export default function Button({
                                   type = 'submit',
                                   className = '',
                                   disabled = false,
                                   processing,
                                   children,
                                   onClick = () => {
                                   }
                               }) {
    return (
        <button
            type={type}
            onClick={() => {
                onClick()
            }}
            className={
                ` ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing || disabled}
        >
            {children}
        </button>
    );
}
