import styles from "@/styles/components/dropmenu.module.scss";
import sections from "@/styles/pages/index.module.scss";
import caricon from "@/public/car-solid 1.svg";
import xmark from "@/public/xmark-solid.svg";
import Image from "next/image";
import pdf from "@/public/file-pdf-regular.svg";
import { useEffect, useRef, useState } from "react";
import Button from "./button";
import { trpc } from "@/lib/trpc/util-trpc";
import InputField from "./input_field";

export interface IDropMenuProps {
    user: {
        phone: string | undefined;
    };
}

const notEmptyValidator = (str: string, setInputError: Function) => {
    if (str == "") {
        setInputError("Поле не должно быть пустым");
        return;
    } else {
        setInputError(null);
    }
};

export default function DropMenu(props: IDropMenuProps) {
    const carRouter = trpc.parking;
    const newCarMutation = carRouter.addNewCar.useMutation();
    const newCar = useRef<HTMLInputElement>(null);
    const [carFormVisible, setCarFormVisible] = useState(false);
    const [style, setStyle] = useState(styles.dropmenu);
    const [expanded, setExpanded] = useState(false);
    const [car, setCar] = useState(0);
    const [cars, setCars] = useState<string[]>([]);
    const [payments, setPayments] = useState<
        { date: string; cost: number; payed: boolean }[]
    >([]);
    const paymentMutation = carRouter.myPayments.useMutation();

    const myCars = carRouter.myCars.useQuery(undefined, {
        onSuccess(data) {
            setCars(data);
        },
    });

    useEffect(()=>{
        if(!cars[car]){
            return;
        }
        paymentMutation.mutate(cars[car], {
            onSuccess: (data) => {
                setPayments(data);
            },
        })
    }, [car])

    useEffect(() => {
        paymentMutation.mutate("", {
            onSuccess: (data) => {
                setPayments(data);
            },
        });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStyle(expanded ? styles.dropmenu_expanded : styles.dropmenu);
        }, 300);
        setStyle(expanded ? styles.opening : styles.closing);
    }, [expanded]);

    function addNewCar() {
        if (!carFormVisible || newCar.current?.value == "") {
            setCarFormVisible(!carFormVisible);
            return;
        }

        newCarMutation.mutate(newCar.current!.value, {
            onSuccess: (data) => {
                // console.log(data);
            },
        });
        setCarFormVisible(!carFormVisible);
    }

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
                <div className={styles.foreground}>
                    <section className={sections.section}>
                        <div className={sections.info}>
                            <div className={styles.header_container}>
                                <h2 className={sections.header}>Мои авто</h2>
                                <button
                                    style={{ backgroundColor: "transparent" }}
                                >
                                    <Image
                                        height={25}
                                        src={xmark}
                                        alt="car"
                                    ></Image>
                                </button>
                            </div>
                            <div className={styles.car_container}>
                                <button
                                    className={styles.left_button}
                                    onClick={() => {
                                        setCar((oldValue) =>
                                            oldValue != 0
                                                ? oldValue - 1
                                                : cars.length - 1
                                        );
                                    }}
                                ></button>
                                <h2 className={sections.header}>{cars[car]}</h2>
                                <button
                                    className={styles.right_button}
                                    onClick={() => {
                                        setCar((oldValue) =>
                                            oldValue != cars.length - 1
                                                ? oldValue + 1
                                                : 0
                                        );
                                    }}
                                ></button>
                            </div>
                        </div>
                        {carFormVisible && (
                            <InputField
                                ref={newCar}
                                validator={notEmptyValidator}
                            >
                                Номер авто
                            </InputField>
                        )}
                        <Button
                            height="3rem"
                            style="primary"
                            disabled={false}
                            onClick={() => {
                                addNewCar();
                            }}
                        >
                            Добавить авто
                        </Button>
                    </section>
                    <section className={sections.section}>
                        <div className={sections.info}>
                            <ul className={sections.list}>
                                {payments.length != 0 ? payments.map((payment, index) => {
                                    return (
                                        <li
                                            className={sections.list_item}
                                            key={index}
                                        >
                                            <p className={sections.key}>
                                                {payment.date +
                                                    "                     " +
                                                    payment.cost +
                                                    " руб."}
                                            </p>
                                            <div className={sections.value}>
                                                {payment.payed ? (
                                                    <Image
                                                        alt="pdf"
                                                        src={pdf}
                                                    ></Image>
                                                ) : (
                                                    "Не оплачено"
                                                )}
                                            </div>
                                        </li>
                                    );
                                }): "Вы еще не посещали парковку на этом автомобиле"}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
