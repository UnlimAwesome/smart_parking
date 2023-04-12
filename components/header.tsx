import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/components/header.module.scss";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [headerTop, setHeaderTop] = useState(0);

    function burgerClick(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void {
        if (!menuExpanded) {
            setMenuExpanded(true);
        } else {
            setMenuExpanded(false);
        }
    }

    useEffect(() => {
        var lastScrollTop = 0;
        document.addEventListener("scroll", (event) => {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setHeaderTop(-100);
                setMenuExpanded(false)
            } else if (st < lastScrollTop) {
                setHeaderTop(0);
                setMenuExpanded(true)
            }
            lastScrollTop = st <= 0 ? 0 : st;
        });
    }, []);

    return (
        <header
            style={{
                top: headerTop + "px",
                transitionProperty: "top",
                transitionDuration: 300 + "ms",
                transitionTimingFunction: "ease-in",
            }}
            className={styles.header}
        >
            <nav>
                <Link href="/auth/signup">SIGN UP</Link>
                <Link href="/auth/signin">SIGN IN</Link>
            </nav>
        </header>
    );
}
