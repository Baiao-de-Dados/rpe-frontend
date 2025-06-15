import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Typography from '../components/Typography';

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export default function LoginPage() {
    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    // Test credentials for demonstration purposes. You will be redirecting to /dashboard
    const testCredentials = {
        email: 'admin@baiaodedados.com',
        password: 'rocket',
    };

    const corporateImage =
        'https://s32907.pcdn.co/wp-content/uploads/2019/03/ambiente-corporativo.jpg';
    const rpeLogo = 'src/assets/rpe-logo.png';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Validate test credentials, will remove this later
            if (
                form.email === testCredentials.email &&
                form.password === testCredentials.password
            ) {
                alert('Login realizado com sucesso! Redirecionando...');
                window.location.href = '/dashboard';
            } else {
                setErrors({ general: 'Email ou senha incorretos' });
            }
        } catch {
            setErrors({ general: 'Erro ao fazer login' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange =
        (field: keyof LoginFormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm(prev => ({ ...prev, [field]: e.target.value }));
            if (errors[field])
                setErrors(prev => ({ ...prev, [field]: undefined }));
        };

    // Function to fill test credentials, will remove this later
    const fillTestCredentials = () => {
        setForm(testCredentials);
        setErrors({}); // Limpar erros
    };

    return (
        <div className="min-h-screen flex">
            {/*Left - 60%*/}
            <aside className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
                {corporateImage ? (
                    <img
                        src={corporateImage}
                        alt="Rocket Coorporation"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-primary-dark" />
                )}

                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/70" />

                {/* Conteúdo */}
                <div className="relative z-10 flex flex-col justify-between h-full px-12 xl:px-16 text-white py-12">
                    {/* Título no topo esquerdo */}
                    <div className="pt-8 overflow-visible">
                        <div className="overflow-visible">
                            <Typography
                                variant="h1"
                                color="gradient"
                                className="text-7xl xl:text-8xl font-black leading-none mb-4 block overflow-visible"
                            >
                                Rocket Performance & Engagement
                            </Typography>
                        </div>

                        <div className="max-w-md">
                            <Typography
                                variant="h2"
                                color="white"
                                className="text-xl font-medium mb-4 leading-relaxed px-2"
                            >
                                A nova era da avaliação de desempenho começa
                                aqui!
                            </Typography>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right - 40% */}
            <main className="flex-1 lg:w-2/5 flex items-center justify-center p-4 lg:p-8 xl:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-100">
                        {/* Header */}
                        <header className="text-center mb-8">
                            <div className="mx-auto mb-4">
                                <img
                                    src={rpeLogo}
                                    alt="RPE Logo"
                                    className="w-20 h-20 mx-auto object-contain"
                                />
                            </div>
                            <Typography
                                variant="h1"
                                color="primary"
                                className="mb-2 text-2xl"
                            >
                                Bem-vindo de volta!
                            </Typography>
                            <Typography variant="body" color="secondary">
                                Entre com sua conta para continuar
                            </Typography>
                        </header>

                        {/* Error */}
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

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <Typography
                                    variant="caption"
                                    className="block mb-2 text-gray-700 font-medium"
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
                                />
                            </div>

                            <div>
                                <Typography
                                    variant="caption"
                                    className="block mb-2 text-gray-700 font-medium"
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
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-400"
                                    />
                                    <Typography
                                        variant="caption"
                                        className="ml-2 text-gray-700"
                                    >
                                        Lembrar de mim
                                    </Typography>
                                </label>
                                <a
                                    href="#"
                                    className="text-primary-500 hover:text-primary-700 font-medium"
                                >
                                    <Typography
                                        variant="caption"
                                        className="text-primary-500 hover:text-primary-700 font-medium"
                                    >
                                        Esqueceu a senha?
                                    </Typography>
                                </a>
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

                        {/* Testing Credentials - To be removed later */}
                        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                            <div className="flex items-center justify-between mb-3">
                                <Typography
                                    variant="caption"
                                    className="text-primary-700 font-medium"
                                >
                                    Credenciais de teste:
                                </Typography>
                                <button
                                    type="button"
                                    onClick={fillTestCredentials}
                                    className="px-4 py-2 text-sm bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-md transition-colors duration-200 font-medium border border-primary-300"
                                >
                                    Preencher
                                </button>
                            </div>
                            <Typography
                                variant="caption"
                                className="text-primary-600 font-mono text-sm"
                            >
                                {testCredentials.email} /{' '}
                                {testCredentials.password}
                            </Typography>
                        </div>
                    </div>
                    {/* Copyright */}
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
