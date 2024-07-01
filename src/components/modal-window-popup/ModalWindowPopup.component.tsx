import { useState, KeyboardEvent } from 'react';
import styles from './ModalWindowPopup.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyesButton } from './eyes-button/EyesButton';
import { schema } from '../../libs/utils/validate-shema';

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
            event.preventDefault();
        }
    };
    return (
        <div className={styles['modal-window-popup']}>
            <form
                className={styles['modal-window-popup__form']}
                onKeyDown={handleKeyDown}
            >
                <img
                    src="close.svg"
                    alt="Закрыть"
                    className={styles['modal-window-popup__close-button']}
                />
                <div className={styles['modal-window-popup__content']}>
                    <h1 className={styles['modal-window-popup__header']}>
                        Войти по почте
                    </h1>
                    <div className={styles['modal-window-popup__body']}>
                        <div className={styles['modal-window-popup__input-wrapper']}>
                            <input
                                {...register('email')}
                                type="text"
                                placeholder="E-mail"
                                className={`${styles['modal-window-popup__input']} ${errors.email ? styles['modal-window-popup__input_error'] : ''}`}
                                aria-invalid={errors.email ? 'true' : 'false'}
                            />
                            {errors.email && (
                                <p className={styles['modal-window-popup__error']}>
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div className={styles['modal-window-popup__input-wrapper']}>
                            <input
                                {...register('password')}
                                type={showPas ? 'text' : 'password'}
                                placeholder="Пароль"
                                className={`${styles['modal-window-popup__input']} ${errors.password ? styles['modal-window-popup__input_error'] : ''}`}
                                aria-invalid={errors.password ? 'true' : 'false'}
                            />
                            <EyesButton
                                isShow={showPas}
                                className={styles['modal-window-popup__eye-button']}
                                onClick={() => setShowPas((pre) => !pre)}
                            />
                            {errors.password && (
                                <p className={styles['modal-window-popup__error']}>
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <div className={styles['modal-window-popup__input-wrapper']}>
                            <input
                                {...register('second-password')}
                                type={showSecPas ? 'text' : 'password'}
                                placeholder="Повторите пароль"
                                className={`${styles['modal-window-popup__input']} ${errors['second-password'] ? styles['modal-window-popup__input_error'] : ''}`}
                                aria-invalid={
                                    errors['second-password'] ? 'true' : 'false'
                                }
                            />
                            <EyesButton
                                isShow={showSecPas}
                                className={styles['modal-window-popup__eye-button']}
                                onClick={() => setShowSecPas((pre) => !pre)}
                            />
                            {errors['second-password'] && (
                                <p className={styles['modal-window-popup__error']}>
                                    {errors['second-password']?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className={styles['modal-window-popup__submit-button']}
                    type="button"
                    onClick={handleSubmit(submit)}
                >
                    Зарегистрироваться
                </button>
                <a
                    className={styles['modal-window-popup__forgot-password-link']}
                    href="#"
                >
                    Забыли пароль?
                </a>
            </form>
        </div>
    );
};
