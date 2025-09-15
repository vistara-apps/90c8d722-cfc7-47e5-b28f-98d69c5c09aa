'use client';

import { useState } from 'react';
import { Heart, Zap, Activity } from 'lucide-react';
import { SymptomLoggerProps, MoodType, EnergyType, PhysicalSymptom } from '../lib/types';
import { formatDate } from '../lib/utils';

export function SymptomLogger({ date, onSubmit, isLoading = false }: SymptomLoggerProps) {
  const [mood, setMood] = useState<MoodType>('calm');
  const [energy, setEnergy] = useState<EnergyType>('medium');
  const [physicalSymptoms, setPhysicalSymptoms] = useState<PhysicalSymptom[]>([]);

  const moodOptions: { value: MoodType; label: string; emoji: string }[] = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'irritable', label: 'Irritable', emoji: '😤' },
    { value: 'emotional', label: 'Emotional', emoji: '🥺' },
  ];

  const energyOptions: { value: EnergyType; label: string; emoji: string }[] = [
    { value: 'high', label: 'High', emoji: '⚡' },
    { value: 'medium', label: 'Medium', emoji: '🔋' },
    { value: 'low', label: 'Low', emoji: '🪫' },
    { value: 'exhausted', label: 'Exhausted', emoji: '😴' },
  ];

  const symptomOptions: { value: PhysicalSymptom; label: string }[] = [
    { value: 'cramps', label: 'Cramps' },
    { value: 'bloating', label: 'Bloating' },
    { value: 'headache', label: 'Headache' },
    { value: 'breast_tenderness', label: 'Breast Tenderness' },
    { value: 'acne', label: 'Acne' },
    { value: 'back_pain', label: 'Back Pain' },
    { value: 'nausea', label: 'Nausea' },
  ];

  const handleSymptomToggle = (symptom: PhysicalSymptom) => {
    setPhysicalSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      mood,
      energy,
      physicalSymptoms,
    });
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-md">
        <Activity className="text-primary" size={20} />
        <div>
          <h2 className="text-heading">Daily Symptoms</h2>
          <p className="text-caption">{formatDate(date)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-lg">
        {/* Mood Selection */}
        <div>
          <div className="flex items-center gap-2 mb-sm">
            <Heart size={16} className="text-primary" />
            <label className="text-sm font-medium text-text">How are you feeling?</label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {moodOptions.map(({ value, label, emoji }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMood(value)}
                className={`p-sm rounded-md border text-sm font-medium transition-all duration-200 ${
                  mood === value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{emoji}</div>
                <div>{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <div className="flex items-center gap-2 mb-sm">
            <Zap size={16} className="text-primary" />
            <label className="text-sm font-medium text-text">Energy Level</label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {energyOptions.map(({ value, label, emoji }) => (
              <button
                key={value}
                type="button"
                onClick={() => setEnergy(value)}
                className={`p-sm rounded-md border text-sm font-medium transition-all duration-200 ${
                  energy === value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{emoji}</div>
                <div>{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Physical Symptoms */}
        <div>
          <label className="block text-sm font-medium text-text mb-sm">
            Physical Symptoms (select all that apply)
          </label>
          <div className="space-y-2">
            {symptomOptions.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={physicalSymptoms.includes(value)}
                  onChange={() => handleSymptomToggle(value)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Log Symptoms'}
        </button>
      </form>
    </div>
  );
}
