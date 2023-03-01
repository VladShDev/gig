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
    return <Input description={configuration.description}
                  value={value}
                  help={configuration.help} handleChange={handleChange} type={'select'} options={configuration.options} name={configuration.id} label={configuration.name} placeholder={configuration.name}></Input>
}