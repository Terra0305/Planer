import React, { useState } from 'react';
import { DocumentItem } from '../types/activity';
import { Plus, X, GripVertical, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChecklistEditorProps {
  documents: DocumentItem[];
  onChange: (docs: DocumentItem[]) => void;
  readOnly?: boolean;
}

export const ChecklistEditor = ({ documents, onChange, readOnly = false }: ChecklistEditorProps) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!newItem.trim()) return;
    
    onChange([...documents, { id: crypto.randomUUID(), title: newItem.trim(), checked: false }]);
    setNewItem('');
  };

  const handleToggle = (id: string) => {
    onChange(documents.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const handleRemove = (id: string) => {
    if (readOnly) return;
    onChange(documents.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div key={doc.id} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-colors", doc.checked ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 hover:border-gray-300")}>
          <button 
            type="button" 
            onClick={() => handleToggle(doc.id)}
            className="flex-shrink-0 text-gray-400 hover:text-primary transition-colors focus:outline-none"
          >
            {doc.checked ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5" />}
          </button>
          <span className={cn("flex-1 text-sm transition-all", doc.checked ? "text-gray-400 line-through" : "text-gray-700")}>
            {doc.title}
          </span>
          {!readOnly && (
            <button 
              type="button" 
              onClick={() => handleRemove(doc.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      
      {!readOnly && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleAdd}
            placeholder="새로운 제출 서류 항목 추가 (엔터로 추가)"
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <button 
            type="button"
            onClick={handleAdd}
            className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
