import './styles.scss'
import closeVector from '../../assets/close.svg'
import showPasswordVector from '../../assets/showPass.svg'
import hidePasswordVector from '../../assets/hidePass.svg'

import React, { useState } from 'react'
import { useForm } from "react-hook-form"


function RegisterFormPopup() {
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [error, setError] = useState(false)
    const [errorType, setErrorType] = useState('') // email(not valid email), pass(not valid password), passnmatch(passwords not match)
    const [errorText, setErrorText] = useState('')

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()
      function onSubmit(data) {
        if (!data.email.includes('@' && '.')) {
            setError(true)
            setErrorType('email')
            setErrorText('Введите E-mail')
            return
        }
        if (!data.password.match(/[A-Za-z0-9!#$%&()*+\-/:;<=>?@[\\\]^_]+/) && data.password.length > 7) {
            setError(true)
            setErrorType('pass')
            setErrorText('Пароль должен быть длиннее 8 символов и может включать латинские буквы, цифры и специальные символы')
            return
        }
        if (data.password !== data.repeatPassword) {
            setError(true)
            setErrorType('passnmatch')
            setErrorText('Пароли не совпадают')
            return
        }
        setError(false)
        console.log(data)
      }
    
    return (
        <div className="RegisterPopup">
            <div className='closeButton'>
                <img src={closeVector} alt="Закрыть" />
            </div>
            <div>
                <h1 className='header'>Регистрация по почте</h1>
            </div>
            <div>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='inputs'>

                        <input
                         {...register("email", { required: true })} 
                         className={error && errorType === "email" ? "input inputError" : "input"}
                         type="text" 
                         placeholder='E-mail'
                         />
                        <div>
                            <input 
                            {...register("password", {  required: true })} 
                            
                            className={error && (errorType === 'pass' || errorType === 'passnmatch')  ? 'input input2 inputError' : 'input input2'}
                            type={showPassword ? "text" : "password"}
                            placeholder='Пароль'
                            />
                            <button className="buttonB2" onClick={toggleShowPassword}>
                                {showPassword ? <img src={hidePasswordVector} alt="Спрятать пароль"></img> : <img src={showPasswordVector} alt="Показать пароль"></img>}
                            </button>
                        </div>
                        <div>
                            <input 
                            {...register("repeatPassword", { required: true })} 
                            className={error && errorType === 'passnmatch' ? 'input input2 inputError' : 'input input2'}
                            type={showPassword2 ? "text" : "password"}
                            placeholder='Повторите пароль'
                            />
                            <button className="buttonB2" onClick={toggleShowPassword2}>
                                {showPassword2 ? <img src={hidePasswordVector} alt="Спрятать пароль"></img> : <img src={showPasswordVector} alt="Показать пароль"></img>}
                            </button>
                        </div>


                        {error && <div className='error'>{errorText}</div>}
                    </div>

                    <div className='buttons'>
                        <button type='submit' className='regButton' >Зарегистрироваться</button>
                        <a href='#' className='forgetPassButton' >Забыли пароль?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterFormPopup