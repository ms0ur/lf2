import { useState, KeyboardEvent } from 'react';
import styles from './ModalWindowPopup.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyesButton } from './eyes-button/EyesButton';
import { schema } from '../../libs/validate-shema';

interface IRegisterFormContents {
    email: string;
    password: string;
    'second-password': string;
}

export const ModalWindowPopup = () => {
    const [showPas, setShowPas] = useState(false);
    const [showSecPas, setShowSecPas] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterFormContents>({
        resolver: yupResolver(schema),
    });

    const submit = (data: any) => {
        console.log(data);
    };

    const errorSubmit = (errors: any) => {
        console.log(errors);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === ' ') {
            event.preventDefault(); // Запрещаем ввод пробела
        }
    };
    return (
        <div className={styles.overlay}>
            <form className={styles.popup} onKeyDown={handleKeyDown}>
                <img
                    src="close.svg"
                    alt="Закрыть"
                    className={styles.popup__button_close}
                />
                <div className={styles.forma}>
                    <h1 className={styles.forma__header}>Войти по почте</h1>
                    <div className={styles.forma__body}>
                        <div className={styles.forma__body__wrapper}>
                            <div className={styles.forma__body__wrapper__inputBox}>
                                <input
                                    {...register('email')}
                                    type="text"
                                    placeholder="E-mail"
                                    className={
                                        errors.email
                                            ? styles.forma__body__wrapper__inputBox__input_error
                                            : styles.forma__body__wrapper__inputBox__input
                                    }
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                />
                            </div>
                            <p
                                className={
                                    errors.email
                                        ? styles.forma__body__wrapper__error
                                        : styles.forma__body__wrapper__error_hidden
                                }
                            >
                                {errors.email?.message}
                            </p>
                        </div>
                        <div className={styles.forma__body__wrapper}>
                            <div className={styles.forma__body__wrapper__inputBox}>
                                <input
                                    {...register('password')}
                                    type={showPas ? 'text' : 'password'}
                                    placeholder="Пароль"
                                    className={
                                        errors.password
                                            ? styles.forma__body__wrapper__inputBox__input_error
                                            : styles.forma__body__wrapper__inputBox__input
                                    }
                                    aria-invalid={errors.password ? 'true' : 'false'}
                                />
                                <EyesButton
                                    isShow={showPas}
                                    className={
                                        styles.forma__body__wrapper__inputBox__eyeBut1
                                    }
                                    onClick={() => setShowPas((pre) => !pre)}
                                />
                            </div>
                            <p
                                className={
                                    errors.password
                                        ? styles.forma__body__wrapper__error
                                        : styles.forma__body__wrapper__error_hidden
                                }
                            >
                                {errors.password?.message}
                            </p>
                        </div>
                        <div className={styles.forma__body__wrapper}>
                            <div className={styles.forma__body__wrapper__inputBox}>
                                <input
                                    {...register('second-password')}
                                    type={showSecPas ? 'text' : 'password'}
                                    placeholder="Повторите пароль"
                                    className={
                                        errors['second-password']
                                            ? styles.forma__body__wrapper__inputBox__input_error
                                            : styles.forma__body__wrapper__inputBox__input
                                    }
                                    aria-invalid={
                                        errors['second-password'] ? 'true' : 'false'
                                    }
                                />
                                <EyesButton
                                    isShow={showSecPas}
                                    className={
                                        styles.forma__body__wrapper__inputBox__eyeBut2
                                    }
                                    onClick={() => setShowSecPas((pre) => !pre)}
                                />
                            </div>
                            <p
                                className={
                                    errors['second-password']
                                        ? styles.forma__body__wrapper__error
                                        : styles.forma__body__wrapper__error_hidden
                                }
                            >
                                {errors['second-password']?.message}
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    className={styles.button}
                    type="button"
                    onClick={handleSubmit(submit)}
                >
                    Зарегистрироваться
                </button>
                <a className={styles.link} href="#">
                    Забыли пароль?
                </a>
            </form>
        </div>
    );
};
