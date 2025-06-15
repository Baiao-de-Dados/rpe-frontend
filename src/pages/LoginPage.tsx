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

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {}; // ← Mudança aqui: trocar 'any' por 'LoginFormErrors'
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
            {/* Esquerda */}
            <aside className="hidden lg:flex lg:w-1/2 bg-gradient-primary-dark relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <div className="max-w-sm">
                        <div className="mb-8">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-3">
                                {/* ícone */}
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <Typography
                                variant="h1"
                                className="text-white mb-3"
                            >
                                RPE Frontend
                            </Typography>
                        </div>

                        <Typography variant="h2" className="text-white mb-6">
                            Transforme sua experiência digital
                        </Typography>
                        <Typography
                            variant="body"
                            className="text-white/80 mb-8"
                        >
                            Nossa plataforma oferece soluções inovadoras para
                            impulsionar seu negócio. Junte-se a milhares de
                            empresas que já confiam em nossa tecnologia.
                        </Typography>

                        <div className="space-y-4">
                            {[
                                'Interface moderna e intuitiva',
                                'Segurança de dados garantida',
                                'Suporte técnico 24/7',
                            ].map((text, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <Typography
                                        variant="body"
                                        className="text-white/80"
                                    >
                                        {text}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Direita */}
            <main className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-primary-light">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-primary-200">
                    {/* Header */}
                    <header className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
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
                            className="mb-1"
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
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                    <footer className="text-center mt-8">
                        <Typography variant="caption" color="secondary">
                            © 2025 Rocket. Todos os direitos reservados.
                        </Typography>
                    </footer>
                </div>
            </main>
        </div>
    );
}
