import React, { useState } from 'react';
import { Activity, ActivityCategory, ActivityStatus, DocumentItem, QuestionItem } from '../types/activity';
import { categoryLabels } from '../pages/ActivityListPage';

interface ActivityFormProps {
  initialData?: Partial<Activity>;
  onSubmit: (data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export const ActivityForm = ({ initialData, onSubmit, onCancel, submitLabel = 'Submit Application' }: ActivityFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<ActivityCategory>(initialData?.category || 'activity');
  const [status, setStatus] = useState<ActivityStatus>(initialData?.status || 'interested');
  const [deadline, setDeadline] = useState(initialData?.deadline || new Date().toISOString().split('T')[0]);
  const [link, setLink] = useState(initialData?.link || '');
  const [memo, setMemo] = useState(initialData?.memo || '');
  const [documents, setDocuments] = useState<DocumentItem[]>(initialData?.documents || []);
  const [questions, setQuestions] = useState<QuestionItem[]>(initialData?.questions || []);

  const [newDocTitle, setNewDocTitle] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      alert('활동명과 마감일은 필수입니다.');
      return;
    }
    
    onSubmit({
      title,
      category,
      status,
      deadline,
      link,
      memo,
      documents,
      questions
    });
  };

  const handleToggleDoc = (id: string) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const handleAddDoc = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    setDocuments([...documents, { id: crypto.randomUUID(), title: newDocTitle.trim(), checked: false }]);
    setNewDocTitle('');
  };

  const handleAddQuestion = () => {
    if (!newQuestionTitle.trim()) return;
    setQuestions([...questions, { id: crypto.randomUUID(), title: newQuestionTitle.trim(), answer: '' }]);
    setNewQuestionTitle('');
  };

  const handleQuestionChange = (id: string, answer: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, answer } : q));
  };

  const progressPercent = documents.length ? Math.round((documents.filter(d => d.checked).length / documents.length) * 100) : 0;

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="mb-stack-lg border-b border-outline-variant/30 pb-stack-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div className="w-full md:w-1/2">
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value as ActivityCategory)}
              className="text-label-sm font-label-sm text-secondary uppercase tracking-widest block mb-unit bg-transparent border-none p-0 focus:ring-0 cursor-pointer"
            >
              {Object.entries(categoryLabels).filter(([k]) => k !== 'all').map(([k, v]) => (
                <option key={k} value={k}>{String(v)}</option>
              ))}
            </select>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="text-display-lg font-display-lg text-primary leading-tight w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-2 placeholder-outline/30 transition-colors"
              placeholder="Activity Title"
            />
          </div>
          <div className="flex gap-stack-sm">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-outline-variant text-primary rounded hover:bg-surface-container-low transition-colors font-label-sm text-label-sm uppercase tracking-wider">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-primary text-on-primary rounded shadow-sm hover:opacity-90 transition-opacity font-label-sm text-label-sm uppercase tracking-wider">
              {submitLabel}
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Left: Progress & Checklist */}
        <div className="md:col-span-3 space-y-stack-md">
          <div className="bg-surface-container-lowest rounded p-stack-md shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <h3 className="font-headline-md text-headline-md mb-stack-sm text-primary">Progress</h3>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mb-stack-md">
              <div className="bg-primary h-1 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            
            <ul className="space-y-stack-sm mb-4">
              {documents.map(doc => (
                <li key={doc.id} className="flex items-start gap-stack-sm cursor-pointer group" onClick={() => handleToggleDoc(doc.id)}>
                  <span className={`material-symbols-outlined transition-colors ${doc.checked ? 'text-primary' : 'text-outline group-hover:text-primary'}`} style={doc.checked ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    {doc.checked ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <div>
                    <p className={`text-on-surface font-medium transition-opacity ${doc.checked ? 'opacity-50 line-through' : ''}`}>{doc.title}</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      {doc.checked ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex border-b border-outline-variant/50 focus-within:border-primary transition-colors">
              <input 
                type="text" 
                value={newDocTitle}
                onChange={e => setNewDocTitle(e.target.value)}
                onKeyDown={handleAddDoc}
                placeholder="Add task..." 
                className="w-full bg-transparent border-none focus:ring-0 px-0 py-2 text-sm"
              />
              <button type="button" onClick={handleAddDoc} className="text-primary p-2"><span className="material-symbols-outlined text-sm">add</span></button>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded p-stack-md shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <h3 className="font-headline-md text-headline-md mb-stack-sm text-primary">Status</h3>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value as ActivityStatus)}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-lg text-on-surface cursor-pointer"
            >
              <option value="interested">관심 / 대기 중</option>
              <option value="preparing">진행 중</option>
              <option value="submitted">제출 완료</option>
              <option value="document_passed">서류 합격</option>
              <option value="interview_scheduled">면접 예정</option>
              <option value="accepted">최종 합격</option>
              <option value="rejected">불합격</option>
            </select>
            
            <h3 className="font-headline-md text-headline-md mb-stack-sm text-primary mt-6">Deadline</h3>
            <input 
              type="date" 
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-lg text-on-surface"
            />
          </div>
        </div>

        {/* Center: Form Area */}
        <div className="md:col-span-6 space-y-stack-lg">
          <section className="bg-surface-container-lowest rounded p-stack-md md:p-stack-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <h2 className="font-headline-lg text-headline-lg mb-stack-md text-primary">Application Details</h2>
            <div className="space-y-stack-md">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-unit uppercase tracking-widest">Related Link (URL)</label>
                <input 
                  type="url" 
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-lg text-on-surface placeholder-outline transition-colors" 
                  placeholder="https://..."
                />
              </div>

              {questions.map((q, idx) => (
                <div key={q.id}>
                  <div className="flex justify-between items-center mt-stack-sm mb-unit">
                    <label className="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">Question {idx + 1}</label>
                    <button type="button" onClick={() => setQuestions(questions.filter(qu => qu.id !== q.id))} className="text-error text-xs uppercase hover:underline">Remove</button>
                  </div>
                  <input 
                    type="text" 
                    value={q.title}
                    onChange={e => setQuestions(questions.map(qu => qu.id === q.id ? { ...qu, title: e.target.value } : qu))}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-2 text-on-surface mb-2 font-medium" 
                    placeholder="문항 제목"
                  />
                  <textarea 
                    value={q.answer}
                    onChange={e => handleQuestionChange(q.id, e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-lg text-on-surface placeholder-outline transition-colors resize-y min-h-[100px]" 
                    placeholder="Share your story..." 
                  />
                </div>
              ))}

              <div className="pt-4 flex items-center gap-2">
                <input 
                  type="text" 
                  value={newQuestionTitle}
                  onChange={e => setNewQuestionTitle(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddQuestion(); } }}
                  placeholder="New Question Title..." 
                  className="flex-1 bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2"
                />
                <button type="button" onClick={handleAddQuestion} className="px-4 py-2 bg-surface-container-high rounded text-sm hover:bg-surface-dim transition-colors">Add</button>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Notes */}
        <div className="md:col-span-3 space-y-stack-md">
          <div className="bg-secondary-fixed rounded p-stack-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-secondary-fixed-dim border-opacity-50 h-full min-h-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-stack-sm">
              <h3 className="font-headline-md text-headline-md text-on-secondary-fixed">Research Notes</h3>
            </div>
            <textarea 
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder="Write notes here..."
              className="flex-1 w-full bg-transparent border-none focus:ring-0 p-0 text-body-sm text-on-secondary-fixed-variant leading-relaxed resize-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
