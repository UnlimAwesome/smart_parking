import styles from "@/styles/components/dropmenu.module.scss";
import sections from "@/styles/pages/index.module.scss";
import caricon from "@/public/car-solid 1.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IDropMenuProps {
    user: {
        phone: string | undefined;
    };
}

export default function DropMenu(props: IDropMenuProps) {
    const [style, setStyle] = useState(styles.dropmenu);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(()=>{
            setStyle(expanded ? styles.dropmenu_expanded : styles.dropmenu);
        }, 300)
        setStyle(expanded? styles.opening: styles.closing);

    }, [expanded]);
    return (
        <div className={style}>
            <div className={styles.container}>
                <button
                    aria-expanded={false}
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className={styles.caricon}>
                        <Image height={40} src={caricon} alt="car"></Image>
                    </div>
                </button>
                <div className={styles.background}></div>
                <div className={styles.foreground}></div>
            </div>
        </div>
    );
}
