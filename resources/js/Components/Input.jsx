import React, {useEffect, useRef} from 'react';

export default function Input({
                                  type = 'text',
                                  label = null,
                                  name,
                                  value,
                                  className,
                                  autoComplete,
                                  required,
                                  isFocused,
                                  handleChange,
                                  placeholder = null,
                                  options = [],
                                  help = null,
                                  description = null
                              }) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);


    const getOptions = () => {
        let _options = [];
        for (let i in options) {
            _options.push({value: i, title: options[i]});
        }
        return _options

    }

    const getRenderer = () => {

        if (type == 'select') {
            return <select type={type}
                           name={name}
                           value={value}
                           placeholder={placeholder}
                           className={
                               `` +
                               className
                           }
                           ref={input}
                           autoComplete={autoComplete}
                           required={required}
                           onChange={(e) => handleChange(e)}>
                {getOptions().map(option => <option key={option.value} value={option.value}>{option.title}</option>)}
            </select>
        }

        return <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            className={
                `` +
                className
            }
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
        />;
    }


    return (
        <div className="input">
            {label ? <label>{label}</label> : null}
            {description ? <p className={'description'}>{description}</p> : null}
            {getRenderer()}
            {help ? <small>{help}</small> : null}
        </div>);
}