import * as yup from 'yup';

const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordValid =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!#$%&().*+\-/:;<=>?@[\]^_]).*$/;

export const schema = yup.object().shape({
	email: yup
		.string()
		.required('Поле не может быть пустым')
		.matches(emailValid, 'Некорректный email'),
	password: yup
		.string()
		.matches(
			passwordValid,
			"Пароль должен содержать заглавные и строчные латинские буквы, цифры и следующие символы: !#$%&().*+-/:;<=>?@[\\\\]^_' ",
		)
		.min(8, 'Пароль должен быть не менее 8 символов')
		.required('Пароль обязателен'),
	'second-password': yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
});
