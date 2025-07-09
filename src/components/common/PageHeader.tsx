import Typography from './Typography';
import type { ReactNode } from 'react';
import NotificationBadge from './NotificationBadge';
import { useState, useRef, useEffect } from 'react';

export type PageHeaderSection<T extends string = string> = {
    name: T;
    badgeCount?: number;
    showBadge?: boolean;
};

type PageHeaderProps<T extends string = string> = {
    title?: string;
    titleContent?: ReactNode; // Novo prop para conteúdo customizado
    button?: ReactNode;
    children?: ReactNode;
    sections?: PageHeaderSection<T>[];
    activeSection?: T;
    onSectionChange?: (section: T) => void;
};

export default function PageHeader<T extends string = string>({
    title,
    titleContent,
    button,
    children,
    sections,
    activeSection,
    onSectionChange,
}: PageHeaderProps<T>) {
    const hasSections = !!sections;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sections) return;
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
    }, [isDropdownOpen, sections]);

    return (
        <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
            <div
                className={`h-20 mt-4 sm:mt-0 px-8  pl-5 sm:pl-8 flex items-center ${hasSections ? 'mb-8 sm:mb-4' : 'mb-10'} justify-between`}
            >
                {titleContent || (
                    <Typography
                        variant="h1"
                        color="primary500"
                    >
                        {title}
                    </Typography>
                )}
                <div className="flex gap-4 items-center">{button}</div>
            </div>
            {sections && onSectionChange && (
                <>
                    <nav className="hidden lg:flex w-full mt-2 sm:mt-0 border-t-3 pt-5 bg -z-1 border-gray-50 overflow-x-auto">
                        <div className="flex w-full justify-start gap-x-4">
                            {sections.map(section => {
                                const isActive = section.name === activeSection;
                                return (
                                    <div
                                        key={section.name}
                                        className="ml-14 min-w-[170px] flex flex-col justify-center items-center text-center relative"
                                    >
                                        <Typography
                                            variant="body"
                                            className={`cursor-pointer pb-4 px-4 transition-all duration-200 relative w-full truncate ${
                                                isActive
                                                    ? 'text-primary-600 font-semibold border-b-2 border-primary-600'
                                                    : 'text-gray-600 font-normal hover:text-primary-500'
                                            }`}
                                            onClick={() =>
                                                onSectionChange(section.name)
                                            }
                                        >
                                            <span className="invisible font-semibold absolute inset-0">
                                                {section.name}
                                            </span>
                                            {section.name}
                                        </Typography>
                                        <NotificationBadge
                                            show={!!section.showBadge}
                                            count={section.badgeCount}
                                            position="top-right"
                                            variant="small"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </nav>
                    <div className="lg:hidden -mt-6 border-gray-50">
                        <div className="relative w-full" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(v => !v)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                                type="button"
                            >
                                <span className="flex items-center justify-between w-full">
                                    <span className="inline-block align-middle">
                                        {activeSection}
                                    </span>
                                    <span className="flex items-center ml-auto relative -top-1 mr-2">
                                        <span className="scale-100">
                                            {sections.find(
                                                s => s.name === activeSection,
                                            )?.showBadge && (
                                                <NotificationBadge
                                                    show={true}
                                                    count={
                                                        sections.find(
                                                            s =>
                                                                s.name ===
                                                                activeSection,
                                                        )?.badgeCount
                                                    }
                                                    position="top-right"
                                                    variant="small"
                                                />
                                            )}
                                        </span>
                                    </span>
                                </span>
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    {sections.map(section => {
                                        const isActive =
                                            section.name === activeSection;
                                        return (
                                            <button
                                                key={section.name}
                                                onClick={() => {
                                                    onSectionChange(
                                                        section.name,
                                                    );
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm ${
                                                    isActive
                                                        ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                                                        : 'text-gray-700'
                                                }`}
                                                type="button"
                                            >
                                                <span className="flex items-center justify-between w-full">
                                                    <span className="inline-block align-middle">
                                                        {section.name}
                                                    </span>
                                                    <span className="flex items-center ml-auto relative -top-1">
                                                        <span className="scale-100">
                                                            {section.showBadge && (
                                                                <NotificationBadge
                                                                    show={true}
                                                                    count={
                                                                        section.badgeCount
                                                                    }
                                                                    position="top-right"
                                                                    variant="small"
                                                                />
                                                            )}
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            {children}
        </header>
    );
}
