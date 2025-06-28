import { ChangeEvent, useState } from 'react';
import { saveUser } from '@/pages/user/ipc/save-user';
import { getUser } from '../ipc/get-user';

export const User = () => {
    const user = getUser();
    const [value, setValue] = useState('');

    const onValueChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    };

    const onSave = () => {
        saveUser(value);
    };

    return (
        <>
            <div>{ JSON.stringify(user) }</div>
            <div className="input-container">
                <span className="prompt">C:\Users\User&gt;</span>
                <input type="text" className="input" value={ value } onChange={ onValueChange } placeholder="Enter command..." />
                <a className="link" onClick={ onSave }>Save</a>
            </div>
        </>
    );
};