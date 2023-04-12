import * as React from 'react';
import styles from '../styles/components/text-field.module.scss';

export interface ITextFieldProps {
    label: string;
    children: string;
}

export default function TextField (props: ITextFieldProps) {
  return (
    <div className={styles.textfield}>
      <h4 className={styles.label}>{props.label}</h4>
      <p className={styles.text}>{props.children}</p>
    </div>
  );
}
