import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import Input from './Input';
import Typography from './Typography';

interface SearchBarProps<T> {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    onSubmit?: () => void;
    disabled?: boolean;
    autoFocus?: boolean;
    searchFunction?: (query: string) => T[];
    onItemSelect?: (item: T) => void;
    renderItem?: (item: T) => React.ReactNode;
    showResults?: boolean;
    maxResults?: number;
    noResultsMessage?: string;
    excludeItems?: T[];
    getItemKey?: (item: T) => string;
}

const SearchBar = <T,>({
    value,
    onChange,
    placeholder = 'Buscar...',
    className = '',
    onSubmit,
    disabled = false,
    autoFocus = false,
    searchFunction,
    onItemSelect,
    renderItem,
    showResults = true,
    maxResults = 10,
    noResultsMessage = 'Nenhum resultado encontrado',
    excludeItems = [],
    getItemKey,
}: SearchBarProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<T[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const exclude = excludeItems || [];
        const getKey = getItemKey;
        if (searchFunction && value.trim() && showResults) {
            const searchResults = searchFunction(value);
            const filteredResults =
                exclude.length > 0 && getKey
                    ? searchResults.filter(item => {
                            const itemKey = getKey(item);
                            return !exclude.some(
                                excludeItem => getKey(excludeItem) === itemKey,
                            );
                        })
                    : searchResults;

            setResults(filteredResults.slice(0, maxResults));
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [value, searchFunction, showResults, maxResults, excludeItems, getItemKey]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                containerRef.current &&
                !containerRef.current.contains(target) &&
                isOpen
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () =>
                document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit();
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleItemClick = (item: T) => {
        // Força fechamento imediato
        setIsOpen(false);
        setResults([]);
        
        // Pequeno delay para garantir que o dropdown feche antes de executar a ação
        setTimeout(() => {
            if (onItemSelect) {
                onItemSelect(item);
            }
        }, 50);
        
        // Limpa o campo de busca
        onChange('');
    };

    const clearSearch = () => {
        onChange('');
        setIsOpen(false);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        // Só executa clearSearch se o clique foi realmente fora do container
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            clearSearch();
        }
    };

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoFocus={autoFocus}
                leftIcon={<Search className="w-4 h-4" />}
                className="bg-white focus:ring-primary-500 focus:border-primary-500"
            />

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-[9998]" 
                        onClick={handleOverlayClick}
                    />
                    <div 
                        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 max-h-80 overflow-y-auto"
                        style={{ 
                            zIndex: 9999,
                            pointerEvents: 'auto',
                            position: 'absolute'
                        }}
                    >
                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <div
                                    key={getItemKey ? getItemKey(item) : index}
                                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
                                    onClick={() => handleItemClick(item)}
                                    style={{ 
                                        position: 'relative', 
                                        zIndex: 10000,
                                        pointerEvents: 'auto'
                                    }}
                                >
                                    {renderItem
                                        ? renderItem(item)
                                        : String(item)}
                                </div>
                            ))
                        ) : (
                            <div className="p-6">
                                <Typography
                                    variant="body"
                                    className="text-gray-500 text-center"
                                >
                                    {noResultsMessage}
                                </Typography>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchBar;
