import React from 'react';
import Button from "@/Components/Button";

export default function ({
                             disabled = false,
                             onClick, text = "Save",
                             savingText = "Saving",
                             saving = false
                         }) {




    const getText = () => {
        return (saving ? savingText : text)
    }

    const isDisabled = () => {
        return saving || disabled
    }

    return <>
        <Button disabled={isDisabled()} onClick={onClick}>{getText()}</Button>
    </>
}