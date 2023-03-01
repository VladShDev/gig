import React, {useState} from 'react';
import Input from "@/Components/Input";

export default function (props) {
    const {configuration} = props;
    const {} = props;

    const [value, setValue] = useState(window.CACHED_SETTINGS[props.path] ? window.CACHED_SETTINGS[props.path] : configuration.default);

    const handleChange = (e) => {
        setValue(e.target.value);
        props.onChange(props.path, e.target.value)
    }

    return <Input help={configuration.help}
                  value={value}
                  description={configuration.description} handleChange={handleChange} type={'text'} name={configuration.id} label={configuration.name} placeholder={configuration.name}></Input>
}