import Button from "@/components/button";
import DropMenu from "@/components/drop_menu";
import Main from "@/components/main";
import { trpc } from "@/lib/trpc/util-trpc";
import styles from "@/styles/pages/index.module.scss";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
    const client = trpc.user;
    const user = client.profile.useQuery();
    const myStats = trpc.parking.myStats.useQuery();
    const places = trpc.parking.places.useQuery();
    const freePlaces = trpc.parking.freePlaces.useQuery();
    const [mapOpened, setMapOpened] = useState(false);
    function manageProfile() {
        console.log("Function not implemented.");
    }

    function openMap(): void {
        setMapOpened((opened) => !opened);
    }

    return (
        <Main>
            <div className={styles.index}>
                <div className={styles.page}>
                    {" "}
                    <div className={styles.container}>
                        <h1 className={styles.free_places}>
                            Количество свободных мест на парковке:
                            <br />
                        </h1>
                        <Button
                            height="3.5rem"
                            style="primary"
                            disabled={false}
                            onClick={() => openMap()}
                        >
                            {freePlaces.data?.count.toString() || ""}
                        </Button>
                        {mapOpened && (
                            <div className={styles.map}>
                                <div className={styles.places}>
                                    {places.data &&
                                        places.data.sort((prev, next)=>prev.id-next.id).map((place) => {
                                            return (
                                                <div
                                                    key={place.id}
                                                    className={
                                                        place.occupated
                                                            ? styles.occupated_place
                                                            : styles.free_place
                                                    }
                                                >{place.id}</div>
                                            );
                                        })}
                                </div>
                                <div
                                    style={{ marginTop: "auto" }}
                                    className={styles.places}
                                >
                                    <p>Въезд</p>
                                    <p>Выезд</p>
                                </div>
                            </div>
                        )}
                        <section className={styles.section}>
                            <div className={styles.info}>
                                <h2 className={styles.header}>
                                    {user.data &&
                                        user.data?.firstName +
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
                                <h2 className={styles.header}>
                                    Общая статистика
                                </h2>
                                <ul className={styles.list}>
                                    <li className={styles.list_item}>
                                        <p className={styles.key}>
                                            Время использования парковки
                                        </p>
                                        <p className={styles.value}>
                                            {myStats.data?.totalTime + " мин"}
                                        </p>
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
                </div>
                <DropMenu user={{ phone: user.data?.phone }}></DropMenu>
            </div>
        </Main>
    );
}
