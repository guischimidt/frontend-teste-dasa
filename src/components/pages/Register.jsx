import { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Input from '../form/Input';
import '../../styles/components/form/form-container.sass';

import useMask from '../../hooks/useMask';

import { Context } from '../../context/UserContext';

function Register() {
	const { maskPhone } = useMask();
	const { register } = useContext(Context);

	const [user, setUser] = useState({});
	const [phones, setPhones] = useState(['']);
	const [formatedPhones, setFormatedPhones] = useState([]);

	useEffect(() => {
		phones.map((phone, index) => {
			phone = phone.replace('(', '')
				.replace(')', '')
				.replace('-', '');
			const splitPhone = phone.split(' ');
			formatedPhones[index] = { ddd: splitPhone[0], numero: splitPhone[1] };
			setFormatedPhones([...formatedPhones]);
		});
		setUser({ ...user, telefones: formatedPhones });
	}, [phones]);

	function handlePhone(e, index) {
		phones[index] = maskPhone(e.target.value);
		setPhones([...phones]);
	}

	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		register(user);
	}

	function addPhone() {
		setPhones([...phones, '']);
	}

	function removePhone(position) {
		phones.splice(position, 1);
		formatedPhones.splice(position, 1);
		setFormatedPhones([...formatedPhones]);
		setPhones([...phones]);
	}

	return (
		<section className='form_container'>
			<h1>Faça seu cadastro</h1>
			<p>
				Preencha os campos abaixo para começar a usar nosso sistema.
				<br />
				Já tem uma conta? <Link to='/login'>Faça o login</Link>
			</p>
			<form onSubmit={handleSubmit}>
				<Input
					text='Nome'
					type='text'
					name='nome'
					required='required'
					handleOnChange={handleChange}
					value={user.nome || ''}
				/>
				<Input
					text='E-mail'
					type='email'
					name='email'
					required='required'
					handleOnChange={handleChange}
					value={user.email || ''}
				/>
				<Input
					text='Senha'
					type='password'
					name='senha'
					required='required'
					handleOnChange={handleChange}
					value={user.senha || ''}
				/>
				<a className='btnAdd' onClick={() => addPhone()}>Adicionar Telefone</a>

				{phones.map((phone, index) => (
					<Fragment key={index}>
						<a className='btnRemove' onClick={() => removePhone(index)}>Remover Telefone</a>

						<Input
							text='Telefone'
							type='text'
							name={`phone${index + 1}`}
							required='required'
							handleOnChange={(e) => handlePhone(e, index)}
							value={phone}
							maxLength='15'
						/>
					</Fragment>
				))}

				<input type='submit' value='Cadastrar' />
			</form>
		</section>
	);
}

export default Register;
