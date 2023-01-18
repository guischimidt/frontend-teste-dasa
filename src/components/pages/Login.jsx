import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Input from '../form/Input';
import '../../styles/components/form/form-container.sass'

import { Context } from '../../context/UserContext';

function Login() {
    const [user, setUser] = useState({});
    const { login } = useContext(Context);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(user);
    }

    return (
        <section className='form_container'>
            <h1>Olá! Me informe seus dados para começar a navegar.</h1>
            <p>
                É sua primeira vez aqui? <br />
                <Link to='/register'>Cadastre-se</Link>
            </p>
            <form onSubmit={handleSubmit}>
                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    required='required'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Senha'
                    type='password'
                    name='senha'
                    required='required'
                    handleOnChange={handleChange}
                />
                <input type='submit' value='Entrar' />
            </form>
        </section>
    )
}

export default Login;