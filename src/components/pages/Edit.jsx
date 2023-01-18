import { useState, useContext, useEffect, Fragment } from 'react';

import api from '../../utils/api';

import Input from '../form/Input';

import '../../styles/components/form/form-container.sass'

import useMask from '../../hooks/useMask.jsx';
import useFlashMessage from '../../hooks/useFlashMessage';
import useLoading from '../../hooks/useLoading';

import { Context } from '../../context/UserContext';

function Edit() {
    const { setFlashMessage } = useFlashMessage();
    const { setLoading } = useLoading();
    const { maskPhone } = useMask();
    const { logout } = useContext(Context);

    const [user, setUser] = useState({});
    const [phones, setPhones] = useState(['']);
    const [formatedPhones, setFormatedPhones] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const [id] = useState(localStorage.getItem(('id')) || '');

    const getUser = async () => {
        await api.get(`/buscar_usuario/${JSON.parse(id)}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then((response) => {
                response.data.user.telefones.map((telefone, index) => {
                    phones[index] = maskPhone(`${telefone.ddd}${telefone.numero}`);
                    setPhones([...phones]);
                })
                setUser(response.data.user)
            })
            .catch((err) => {
                let msgText = err.response.data.mensagem;
                let msgType = 'error';
                setFlashMessage(msgText, msgType);
                logout();
            })
    };

    const update = async () => {
        setLoading(true);
        let msgType = 'success';
        let msgText = ''
        await api.patch(`atualizar_usuario/${JSON.parse(id)}`, user, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then((response) => {
                msgText = response.data.mensagem;
                return response.data;
            })
            .catch((err) => {
                msgType = 'error';
                msgText = err.response.data.mensagem;
                err.response.status === 401 ? logout() : '';
                return err.response.data;
            })
        setLoading(false);
        setFlashMessage(msgText, msgType);
    };

    const removeAccount = async () => {
        setLoading(true);
        let msgType = 'success';
        let msgText = ''
        await api.delete(`deletar_usuario/${JSON.parse(id)}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then((response) => {
                msgText = response.data.mensagem;
                logout();
                return response.data;
            })
            .catch((err) => {
                msgType = 'error';
                msgText = err.response.data.mensagem;
                err.response.status === 401 ? logout() : '';
                return err.response.data;
            })
        setLoading(false);
        setFlashMessage(msgText, msgType);
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {

        phones.map((phone, index) => {
            phone = phone.replace('(', '')
                .replace(')', '')
                .replace('-', '');
            const splitPhone = phone.split(' ');
            formatedPhones[index] = { ddd: splitPhone[0], numero: splitPhone[1] };
            setFormatedPhones([...formatedPhones]);
        })
        setUser({ ...user, telefones: formatedPhones });
    }, [phones]);

    function handlePhone(e, index) {
        phones[index] = maskPhone(e.target.value);
        setPhones([...phones]);
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function removePhone(position) {
        phones.splice(position, 1);
        formatedPhones.splice(position, 1);
        setFormatedPhones([...formatedPhones]);
        setPhones([...phones]);
    }

    function addPhone() {
        setPhones([...phones, '']);
    }

    function handleSubmit(e) {
        e.preventDefault();
        update();
    }

    return (
        <section className='form_container'>
            <h1>Veja suas informações cadastradas</h1>
            <a className='btnRemove'
                onClick={() => {
                    window.confirm('Confirmar exclusão?',)
                        && removeAccount();
                }} >Excluir Conta</a>

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
                    handleOnChange={handleChange}
                    value={user.senha || ''}
                />
                <a className='btnAdd' onClick={() => addPhone()}>Adicionar Telefone</a>

                {phones.map((phone, index) => (<Fragment key={index}>
                    <a className='btnRemove' onClick={() => removePhone(index)}>Remover Telefone</a>

                    < Input
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
                <input type='submit' value='Salvar' />
            </form>
        </section>
    )
}

export default Edit;