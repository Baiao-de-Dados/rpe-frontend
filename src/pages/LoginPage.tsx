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

    // URL da imagem corporativa (deixe vazio para usar o gradiente verde)
    const corporateImage = '';

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
            alert('Login realizado!');
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

    return (
        <div className="min-h-screen flex">
            {/* Esquerda - 60% */}
            <aside className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
                {/* Imagem ou Gradiente de fundo */}
                {corporateImage ? (
                    <img
                        src={corporateImage}
                        alt="RPE Frontend"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-primary-dark" />
                )}
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/30" />
                // ...existing code...
                {/* Conteúdo */}
                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
                    <div className="max-w-lg">
                        {/* Hero Text - Estilo "The Future is Rocket" */}
                        <div className="mb-12">
                            <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-8">
                                <span className="text-white block mb-2">
                                    O Futuro é
                                </span>
                                <span
                                    className="block bg-gradient-to-r from-[#6dd4ce] via-[#3eb8b0] to-[#2B5F60] bg-clip-text text-transparent text-6xl xl:text-7xl font-black"
                                    style={{
                                        filter: 'drop-shadow(0 0 20px rgba(109, 212, 206, 0.3))',
                                    }}
                                >
                                    RPE
                                </span>
                            </h1>

                            {/* Subtítulo elegante */}
                            <p className="text-white/80 text-lg xl:text-xl leading-relaxed max-w-md">
                                Descubra inovações de ponta que redefinem a
                                excelência. Experimente a harmonia perfeita
                                entre design e performance.
                            </p>
                        </div>

                        {/* Features minimalistas */}
                        <div className="space-y-3">
                            {[
                                'Interface moderna e intuitiva',
                                'Segurança de dados garantida',
                                'Suporte técnico 24/7',
                            ].map((text, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-2 h-2 bg-[#6dd4ce] rounded-full mr-4 shadow-lg shadow-[#6dd4ce]/30"></div>
                                    <span className="text-white/90 text-base">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                // ...existing code...
            </aside>

            {/* Direita - 40% */}
            <main className="flex-1 lg:w-2/5 flex items-center justify-center p-4 lg:p-8 xl:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-100">
                        {/* Header */}
                        <header className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <svg
                                    className="w-8 h-8 text-primary-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
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

                        {/* Erro geral */}
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
                                        className="rounded border-gray-300 text-primary focus:ring-primary-400"
                                    />
                                    <span className="ml-2 text-gray-700">
                                        Lembrar de mim
                                    </span>
                                </label>
                                <a
                                    href="#"
                                    className="text-primary hover:text-primary-700 font-medium"
                                >
                                    Esqueceu a senha?
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

                        {/* Footer */}
                        <footer className="text-center mt-6">
                            <Typography variant="caption" color="secondary">
                                Não tem uma conta?{' '}
                                <a
                                    href="#"
                                    className="text-primary hover:text-primary-700 font-medium"
                                >
                                    Cadastre-se aqui
                                </a>
                            </Typography>
                        </footer>
                    </div>

                    {/* Copyright fora do card */}
                    <div className="text-center mt-6">
                        <Typography variant="caption" color="secondary">
                            © 2025 RPE Frontend. Todos os direitos reservados.
                        </Typography>
                    </div>
                </div>
            </main>
        </div>
    );
}
