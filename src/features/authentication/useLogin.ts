import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
type LoginParams = {
  email: string;
  password: string;
};

export function useLogin() {

    const navigate = useNavigate();
    const { mutate: loginMutate, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }: LoginParams) => loginApi({ email, password }),
        onSuccess: () => {
        navigate('/dashboard');
        },
        onError: () => {
        toast.error('Login failed. Please check your credentials.');
        },
    });

    return { loginMutate, isLoggingIn };
}
