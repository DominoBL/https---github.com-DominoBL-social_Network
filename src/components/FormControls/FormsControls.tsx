import React, { ReactNode } from 'react';
import { WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.css'


type formControlParamsType = {
    meta: {
        touched: boolean
        error: string
    },
    children: React.ReactNode
}

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
let hasError = meta.touched && meta.error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
        <textarea {...input} {...props} />
        </div>
        {hasError && <span>{meta.error}</span> }
    </div>
}


export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {

let hasError = meta.touched && meta.error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
        <input {...input} {...props} />
        </div>
        {hasError && <span>{meta.error}</span> }
    </div>
}

