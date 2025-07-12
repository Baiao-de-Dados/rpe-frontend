import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface DropdownButtonProps {
    items: string[];
    selected: string;
    onSelect: (item: string) => void;
    className?: string;
    buttonClassName?: string;
}

function DropdownButton({ items, selected, onSelect, className = '', buttonClassName = '' }: DropdownButtonProps) {

    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={`relative inline-block text-left w-48 select-none ${className}`}>
            <button
                type="button"
                className={`appearance-none border border-gray-300 rounded px-4 py-3 bg-white text-primary-500 focus:outline-none w-full font-bold text-lg pr-10 cursor-pointer flex items-center justify-between ${buttonClassName}`}
                onClick={() => setOpen((v) => !v)}
            >
                <span>{selected}</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    <ChevronDown size={22} className="text-gray-400" />
                </span>
            </button>
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg">
                    {items.map((item) => (
                        <div
                            key={item}
                            className={`px-4 py-2 text-base font-normal cursor-pointer hover:bg-primary-50 hover:text-primary-600 transition-colors ${item === selected ? 'font-bold text-primary-500 bg-gray-100' : 'text-gray-800'}`}
                            onClick={() => {
                                onSelect(item);
                                setOpen(false);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownButton;
