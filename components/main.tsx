import * as React from 'react';
import styles from '../styles/components/main.module.scss'

export interface IMainProps {
    children?: React.ReactElement
}

export default function Main (props: IMainProps) {
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  );
}
