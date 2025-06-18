import { useState } from 'react';
import Typography from '../components/Typography';
import Button from '../components/Button';

const sections = ['Autoavaliação', 'Avaliação 360', 'Mentoring', 'Referências'];

export function Avaliacao() {
    const [activeSection, setActiveSection] = useState('Autoavaliação');
    const isFormComplete = false; // Mude para true quando quiser ativar o botão

    // Controla quais seções têm notificações (bolinhas vermelhas)
    const sectionsWithNotifications = ['Autoavaliação', 'Avaliação 360']; // Mude aqui para adicionar/remover notificações

    const handleNavClick = (section: string) => {
        setActiveSection(section);
    };

    return (
        <>
            <header
                className="pt-12 pb-0 bg-white flex flex-col justify-between"
                style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}
            >
                <div className="p-8 flex items-center justify-between">
                    <Typography variant="h1" className="text-4xl font-bold">
                        Ciclo 2025.1
                    </Typography>
                    <div className="flex gap-4 items-center">
                        <Button
                            variant="primary"
                            size="md"
                            disabled={!isFormComplete}
                            className={`transition-all duration-200 ${
                                !isFormComplete
                                    ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200'
                                    : 'bg-primary-500 text-white hover:bg-primary-600'
                            }`}
                        >
                            Concluir e enviar
                        </Button>
                    </div>
                </div>
                <nav className="flex space-x-20 mt-2 border-t-3 pt-5 pl-14 bg border-gray-50">
                    {sections.map(section => (
                        <div
                            key={section}
                            className="relative min-w-38 text-center"
                        >
                            <Typography
                                variant="body"
                                className={`cursor-pointer pb-4 pl-5 pr-5 text-primary-600 font-normal relative ${
                                    activeSection === section
                                        ? 'border-b-4 border-primary-500 font-semibold text-primary-500'
                                        : ''
                                }`}
                                onClick={() => handleNavClick(section)}
                            >
                                <span className="invisible font-semibold absolute inset-0">
                                    {section}
                                </span>
                                {section}
                            </Typography>
                            {sectionsWithNotifications.includes(section) && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </nav>
            </header>
            <main className="p-8 pt-6">
                {activeSection === 'Autoavaliação' && (
                    <section>
                        <Typography variant="h2">Autoavaliação</Typography>
                        <p>Conteúdo da seção de Autoavaliação.</p>
                    </section>
                )}
                {activeSection === 'Avaliação 360' && (
                    <section>
                        <Typography variant="h2">Avaliação 360</Typography>
                        <p>Conteúdo da seção de Avaliação 360.</p>
                    </section>
                )}
                {activeSection === 'Mentoring' && (
                    <section>
                        <Typography variant="h2">Mentoring</Typography>
                        <p>Conteúdo da seção de Mentoring.</p>
                    </section>
                )}
                {activeSection === 'Referências' && (
                    <section>
                        <Typography variant="h2">Referências</Typography>
                        <p>Conteúdo da seção de Referências.</p>
                    </section>
                )}
            </main>
        </>
    );
}
