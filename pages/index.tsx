import Button from "@/components/button";
import DropMenu from "@/components/drop_menu";
import Main from "@/components/main";
import { trpc } from "@/lib/trpc/util-trpc";
import styles from "@/styles/pages/index.module.scss";
import { signOut } from "next-auth/react";

export default function Home() {
    const client = trpc.user;
    const user = client.profile.useQuery();
    const places = trpc.parking.freePlaces.useQuery();
    function manageProfile() {
        throw new Error("Function not implemented.");
    }

    function openMap(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Main>
            <>
                <div className={styles.container}>
                    <h1 className={styles.places}>
                        Количество свободных мест на парковке:
                        <br />
                    </h1>
                    <Button
                        height="3.5rem"
                        style="primary"
                        disabled={false}
                        onClick={() => openMap()}
                    >
                        {places.data?.count.toString() || ""}
                    </Button>
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
                            <ul className={styles.list}>
                                <li className={styles.list_item}>
                                    <p className={styles.key}>Время использования парковки</p>
                                    <p className={styles.value}></p>
                                </li>
                            </ul>
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
                    <Button
                        height="3.5rem"
                        style="error"
                        onClick={() => {
                            signOut();
                        }}
                        disabled={false}
                    >
                        Выйти
                    </Button>
                </div>
                <DropMenu user={{ phone: user.data?.phone }}></DropMenu>
            </>
        </Main>
    );
}
