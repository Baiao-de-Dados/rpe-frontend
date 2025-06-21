import { memo, useState, useRef, useEffect } from 'react';
import Typography from '../Typography';
import { type SectionType } from '../../hooks/useSectionNavigation';
import FloatingSubmitButton from '../FloatingSubmitButton';

interface EvaluationHeaderProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    sections: SectionType[];
}

function EvaluationHeaderComponent({
    activeSection,
    onSectionChange,
    sections,
}: EvaluationHeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Função para alternar o dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    // Função para selecionar seção sem fechar o dropdown
    const handleSectionSelect = (section: SectionType) => {
        onSectionChange(section);
        setIsDropdownOpen(false);
        // Não fecha o dropdown automaticamente
    };

    // Fecha o dropdown quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
            {/* Linha principal do header */}
            <div className="p-4 md:p-8 flex items-center justify-between w-full">
                <div className="flex-1 flex items-center gap-2">
                    <Typography
                        variant="h1"
                        className="text-2xl md:text-4xl font-bold leading-none"
                    >
                        Ciclo 2025.1
                    </Typography>
                    {/* Botão só aparece no mobile aqui */}
                    <div className="md:hidden ml-2">
                        <FloatingSubmitButton mobile />
                    </div>
                </div>
                {/* Desktop: espaço para alinhar com botão flutuante */}
                <div className="hidden md:flex gap-4 items-center">
                    <div className="h-8 md:h-10 lg:h-12 w-24 md:w-32 lg:w-40"></div>
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex mt-2 border-t-3 pt-5 pl-14 bg border-gray-50">
                {sections.map(section => {
                    const isActive = section === activeSection;
                    return (
                        <div key={section} className="flex-1 text-center">
                            <Typography
                                variant="body"
                                className={`cursor-pointer pb-4 pl-5 pr-5 transition-all duration-200 relative ${
                                    isActive
                                        ? 'text-primary-600 font-semibold border-b-2 border-primary-600'
                                        : 'text-gray-600 font-normal hover:text-primary-500'
                                }`}
                                onClick={() => onSectionChange(section)}
                            >
                                <span className="invisible font-semibold absolute inset-0">
                                    {section}
                                </span>
                                {section}
                            </Typography>
                        </div>
                    );
                })}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden mt-2 pt-5 bg border-gray-50">
                <div className="relative w-full" ref={dropdownRef}>
                    {/* Mobile Dropdown Button */}
                    <button
                        onClick={toggleDropdown}
                        className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        <Typography
                            variant="body"
                            className="font-medium text-gray-700"
                        >
                            {activeSection}
                        </Typography>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isDropdownOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* Mobile Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {sections.map(section => {
                                const isActive = section === activeSection;
                                return (
                                    <button
                                        key={section}
                                        onClick={() =>
                                            handleSectionSelect(section)
                                        }
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                                            isActive
                                                ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                                                : 'text-gray-700'
                                        }`}
                                        type="button"
                                    >
                                        <Typography variant="body">
                                            {section}
                                        </Typography>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export const EvaluationHeader = memo(EvaluationHeaderComponent);
