import Button from "@/components/button";
import DropMenu from "@/components/drop_menu";
import Main from "@/components/main";
import { trpc } from "@/lib/trpc/util-trpc";
import styles from "@/styles/pages/index.module.scss";
import { signOut } from "next-auth/react";

export default function Home() {
    const client = trpc.user;
    const user = client.profile.useQuery();
    function manageProfile() {
        throw new Error("Function not implemented.");
    }

    return (
        <Main>
            <>
                <div className={styles.container}>
                    <section className={styles.section}>
                        <div className={styles.info}>
                            <h2 className={styles.header}>
                                {user.data?.firstName +
                                    " " +
                                    user.data?.secondName}
                            </h2>
                            <h3 className={styles.subheader}>
                                {user.data?.phone}
                            </h3>
                        </div>
                        <Button
                            height="3.5rem"
                            style="primary"
                            disabled={false}
                            onClick={() => {
                                manageProfile();
                            }}
                        >
                            Управление профилем и подписками
                        </Button>
                    </section>
                    <section className={styles.section}>
                        <div className={styles.info}>
                            <h2 className={styles.header}>Общая статистика</h2>
                        </div>
                        <Button
                            height="3.5rem"
                            style="primary"
                            disabled={false}
                            onClick={() => {
                                manageProfile();
                            }}
                        >
                            Подробная статистика
                        </Button>
                    </section>
                    <section className={styles.section}>
                        <div className={styles.info}>
                            <h2 className={styles.header}>Способ оплаты</h2>
                        </div>
                        <Button
                            height="3.5rem"
                            style="primary"
                            disabled={false}
                            onClick={() => {
                                manageProfile();
                            }}
                        >
                            Изменить способ оплаты
                        </Button>
                    </section>
                    <Button height="3.5rem" style="error" onClick={()=>{signOut()}} disabled={false}>Выйти</Button>
                </div>
                <DropMenu user={{phone: user.data?.phone}}></DropMenu>
            </>
        </Main>
    );
}
