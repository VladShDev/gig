import React from 'react';


function CancelIcon(){
    return <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.7763 13.0654L12.7158 12.0049L10.5948 14.1259L8.47383 12.0049L7.41333 13.0654L9.53433 15.1864L7.41333 17.3074L8.47383 18.3679L10.5948 16.2469L12.7158 18.3679L13.7763 17.3074L11.6553 15.1864L13.7763 13.0654Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.34473 5.43652L9.84473 3.93652H20.3447L21.8447 5.43652V15.9365L20.3447 17.4365H17.3447V20.4365L15.8447 21.9365H5.34473L3.84473 20.4365V9.93652L5.34473 8.43652H8.34473V5.43652ZM9.84473 8.43652H15.8447L17.3447 9.93652V15.9365H20.3447V5.43652H9.84473V8.43652ZM15.8447 9.93652H5.34473V20.4365H15.8447V9.93652Z" fill="black"/>
    </svg>

}

export default function ({ids, actions, cancel}) {

    return <div className={'data-grid-actions'}>
         {ids.length} selected

        <a href={'#'} onClick={e=>{ e.preventDefault(); cancel()}}>
            <CancelIcon/> Cancel
        </a>


        <select>
            <option>-- Please select --</option>
            {actions.map(action=>{
                return <option>{action.name}</option>
            })}
        </select>

    </div>
}