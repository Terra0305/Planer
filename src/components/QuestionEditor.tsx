import React, { useState } from 'react';
import { QuestionItem } from '../types/activity';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils/cn';

interface QuestionEditorProps {
  questions: QuestionItem[];
  onChange: (questions: QuestionItem[]) => void;
  readOnly?: boolean;
}

export const QuestionEditor = ({ questions, onChange, readOnly = false }: QuestionEditorProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);

  const handleAdd = () => {
    const newId = crypto.randomUUID();
    onChange([...questions, { id: newId, title: '새로운 문항', answer: '' }]);
    setExpandedId(newId);
  };

  const handleUpdate = (id: string, field: 'title' | 'answer', value: string) => {
    onChange(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const handleRemove = (id: string) => {
    onChange(questions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-4">
      {questions.map((q, index) => {
        const isExpanded = expandedId === q.id || readOnly;
        
        return (
          <div key={q.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all">
            <div 
              className={cn("flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors", isExpanded ? "border-b border-gray-100" : "")}
              onClick={() => !readOnly && setExpandedId(isExpanded ? null : q.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {readOnly || !isExpanded ? (
                  <h4 className="font-medium text-gray-800 truncate">{q.title || '제목 없음'}</h4>
                ) : (
                  <input 
                    type="text" 
                    value={q.title}
                    onChange={(e) => handleUpdate(q.id, 'title', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="문항 제목을 입력하세요"
                    className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-gray-800 font-medium outline-none"
                  />
                )}
              </div>
              
              {!readOnly && (
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemove(q.id); }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="p-1.5 text-gray-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              )}
            </div>
            
            {isExpanded && (
              <div className="p-4 bg-gray-50/50">
                {readOnly ? (
                  <div className="text-gray-600 text-sm whitespace-pre-wrap min-h-[100px]">
                    {q.answer || <span className="text-gray-400 italic">작성된 내용이 없습니다.</span>}
                  </div>
                ) : (
                  <div className="relative">
                    <textarea
                      value={q.answer || ''}
                      onChange={(e) => handleUpdate(q.id, 'answer', e.target.value)}
                      placeholder="이곳에 답변을 작성하세요..."
                      className="w-full min-h-[150px] p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-y text-sm text-gray-700"
                    />
                    <div className="absolute bottom-3 right-4 text-xs text-gray-400 font-medium">
                      {q.answer?.length || 0}자
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {!readOnly && (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          새로운 문항 추가
        </button>
      )}
    </div>
  );
};
