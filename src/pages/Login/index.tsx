import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Typography from '../../components/common/Typography';
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types/auth';
import { useToast } from '../../hooks/useToast';
import type { AxiosError } from 'axios';

interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;

}

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginRequest>({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const {showToast}= useToast(); 

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};
        if (!form.email) newErrors.email = 'Email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = 'Email inválido';
        if (!form.password) newErrors.password = 'Senha é obrigatória';
        else if (form.password.length < 6)
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            await login(form);
            // Após login bem-sucedido, navegar para dashboard
            navigate('/dashboard', { replace: true });
        } catch (error: unknown) {
            
            const errorStatus = (error as AxiosError).status;
            const title = "Erro ao fazer login";
            let message = "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.";
            switch (errorStatus) {
                case 401: message = "Email ou senha inválidos."; break;
                case 403: message = "Acesso negado. Você não tem permissão para acessar esta área."; break;
                case 404: message = "Usuário não encontrado."; break;
                case 500: message = "Erro interno do servidor. Tente novamente mais tarde."; break;
                default: message = "Erro desconhecido. Tente novamente mais tarde."; break;
            }
            showToast(message,'error', {
                        title: title,
                        duration: 10000,
                    });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange =
        (field: keyof LoginRequest) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value =
                field === 'rememberMe' ? e.target.checked : e.target.value;
            setForm(prev => ({ ...prev, [field]: value }));

            if (field === 'email' || field === 'password') {
                if (errors[field])
                    setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        };

    return (
        <div className="min-h-screen flex">
            <aside className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
                <img
                    src="https://s32907.pcdn.co/wp-content/uploads/2019/03/ambiente-corporativo.jpg"
                    alt="Rocket Coorporation"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 flex flex-col justify-start h-full xl:px-16 text-white py-12">
                    <Typography
                        variant="h1"
                        color="gradient"
                        className="text-8xl font-black mb-5"
                    >
                        Rocket Performance & Engagement
                    </Typography>
                    <Typography
                        variant="h2"
                        color="white"
                        className="px-2 text-xl font-semibold max-w-md"
                    >
                        A nova era da avaliação de desempenho começa aqui!
                    </Typography>
                </div>
            </aside>

            <main className="flex-1 lg:w-2/5 flex items-center justify-center p-4 lg:p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                        <div className="text-center mb-8">
                            <img
                                src="/rpe-logo.png"
                                alt="RPE Logo"
                                className="w-20 h-20 mx-auto mb-2"
                            />
                            <Typography
                                variant="h1"
                                color="primary"
                                className="text-2xl"
                            >
                                Bem-vindo de volta!
                            </Typography>
                            <Typography variant="body" color="secondary">
                                Entre com sua conta para continuar
                            </Typography>
                        </div>

                        {errors.general && (
                            <div
                                role="alert"
                                className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6"
                            >
                                <Typography variant="caption" color="error">
                                    {errors.general}
                                </Typography>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <Typography
                                    variant="caption"
                                    className="block mb-1 text-gray-700"
                                >
                                    Email
                                </Typography>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={form.email}
                                    onChange={handleChange('email')}
                                    error={errors.email}
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="caption"
                                    className="block mb-1 text-gray-700"
                                >
                                    Senha
                                </Typography>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange('password')}
                                    error={errors.password}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Checkbox "Lembrar de mim" opcional */}
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={form.rememberMe || false}
                                    onChange={handleChange('rememberMe')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Lembrar de mim
                                </label>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full"
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                    <div className="text-center mt-6">
                        <Typography variant="caption" color="secondary">
                            © 2025 Rocket Corp. Todos os direitos reservados.
                        </Typography>
                    </div>
                </div>
            </main>
        </div>
    );
}
