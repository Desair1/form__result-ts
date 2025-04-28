import styles from "./App.module.css";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";

type Inputs = {
	email: string;
	password: string;
	confirmedPass: string;
};

export default function App() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	const password: string = watch("password");

	const passwordValidation: RegisterOptions<Inputs> = {
		required: "Это поле обязательно для заполнения",
		minLength: {
			value: 3,
			message: "Значение поля не может быть короче 3 символов",
		},
		maxLength: {
			value: 20,
			message: "Значение поля не может быть длиннее 20 символов",
		},
		pattern: {
			value: /^[a-zA-Z0-9_-]+$/, // Используем RegExp
			message:
				"Поле может содержать только цифры, буквы, знаки нижнего подчёркивания и тире.",
		},
	};

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				{errors.email && <div>{errors.email.message}</div>}
				<input
					placeholder="Введите email"
					{...register("email", {
						required: "Это поле обязательно для заполнения",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Неверный формат email",
						},
					})}
					type="email"
				/>
				{errors.password && <div>{errors.password.message}</div>}

				<input
					placeholder="Введите пароль"
					{...register("password", passwordValidation)}
					type="password"
				/>
				{errors.confirmedPass && <div>{errors.confirmedPass.message}</div>}
				<input
					placeholder="Повторите пароль"
					{...register("confirmedPass", {
						required: "Это поле обязтельно для заполнения",
						validate: (value: string): string | boolean => {
							return value === password || "Пароли не совпадют";
						},
					})}
					type="password"
				/>
				<button type="submit">Зарегестрироваться</button>
			</form>
		</div>
	);
}
