import api from '../utils/api.jsx';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useFlashMessage from './useFlashMessage.jsx';

export default function useAuth() {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, [])

    async function login(user) {
        let msgText = 'Login realizado com sucesso';
        let msgType = 'success';

        try {
            const data = await api.post('/sign_in', user).then((response) => {
                return response.data;
            })
            await authUser(data);

        } catch (error) {
            msgText = error.response.data.mensagem;
            msgType = 'error';
        }
        setFlashMessage(msgText, msgType);
    }

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso';
        let msgType = 'success';
        try {
            const data = await api.post('/sign_up', user).then((response) => {
                return response.data;
            })
            await authUser(data);
        } catch (error) {
            msgText = error.response.data.mensagem;
            msgType = 'error';
        }
        setFlashMessage(msgText, msgType);
    }

    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('id', JSON.stringify(data.id));
        navigate('/edit');
    }

    function logout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        api.defaults.headers.Authorization = undefined;
        navigate('/login');

    }

    return { authenticated, register, logout, login };
}