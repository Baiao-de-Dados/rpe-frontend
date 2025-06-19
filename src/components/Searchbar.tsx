import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';
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
        if (searchFunction && value.trim() && showResults) {
            const searchResults = searchFunction(value);
            const filteredResults =
                excludeItems.length > 0
                    ? searchResults.filter(item => {
                          const itemKey = getItemKey
                              ? getItemKey(item)
                              : JSON.stringify(item);
                          return !excludeItems.some(excludeItem => {
                              const excludeKey = getItemKey
                                  ? getItemKey(excludeItem)
                                  : JSON.stringify(excludeItem);
                              return itemKey === excludeKey;
                          });
                      })
                    : searchResults;

            setResults(filteredResults.slice(0, maxResults));
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [
        value,
        searchFunction,
        showResults,
        maxResults,
        excludeItems,
        getItemKey,
    ]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
        if (onItemSelect) {
            onItemSelect(item);
        }
        setIsOpen(false);
        onChange('');
    };

    const clearSearch = () => {
        onChange('');
        setIsOpen(false);
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
                    <div className="fixed inset-0 z-5" onClick={clearSearch} />
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-10 max-h-80 overflow-y-auto">
                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <div
                                    key={getItemKey ? getItemKey(item) : index}
                                    className="px-4 py-3 mx-2 my-1 first:mt-2 last:mb-2 hover:bg-[var(--color-neutral-100)] cursor-pointer rounded-lg transition-all duration-200 border border-transparent"
                                    onClick={() => handleItemClick(item)}
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
