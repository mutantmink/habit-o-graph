
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, Sparkles, Heart } from 'lucide-react';
import { Habit } from '@/utils/habitUtils';
import { toast } from 'sonner';

interface HabitFormProps {
  onAddHabit: (habit: Habit) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onAddHabit }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!habitName.trim()) {
      toast.error('Please enter a habit name');
      return;
    }
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitName.trim(),
      description: habitDescription.trim(),
      createdAt: new Date(),
      color: getRandomColor(),
    };
    
    onAddHabit(newHabit);
    toast.success(`New habit "${habitName}" added!`);
    
    // Reset form
    setHabitName('');
    setHabitDescription('');
    setIsFormOpen(false);
  };
  
  const getRandomColor = () => {
    const colors = [
      '#4f46e5', '#0ea5e9', '#059669', 
      '#d946ef', '#f59e0b', '#ec4899',
      '#6366f1', '#8b5cf6', '#a855f7',
      '#2dd4bf', '#f97316', '#06b6d4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  if (!isFormOpen) {
    return (
      <Button 
        onClick={() => setIsFormOpen(true)}
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 py-6 border border-dashed border-indigo-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 bg-gradient-to-br from-white to-indigo-50 hover:from-white hover:to-indigo-100 transition-all duration-300 group backdrop-blur-sm shadow-sm hover:shadow rounded-xl"
      >
        <PlusCircle className="h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
        <span className="font-medium">Add New Habit</span>
      </Button>
    );
  }
  
  return (
    <div className="p-5 rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 backdrop-blur-sm shadow-md scale-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          New Habit
        </h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsFormOpen(false)}
          className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-lg"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="habit-name" className="text-sm font-medium text-indigo-700">
            Habit Name
          </label>
          <Input
            id="habit-name"
            placeholder="e.g., Exercise, Read, Meditate"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full border-indigo-200 focus:border-indigo-300 bg-white/80 backdrop-blur-sm rounded-lg"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="habit-description" className="text-sm font-medium text-indigo-700">
            Description (optional)
          </label>
          <Input
            id="habit-description"
            placeholder="e.g., Walk for 30 minutes"
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
            className="w-full border-indigo-200 focus:border-indigo-300 bg-white/80 backdrop-blur-sm rounded-lg"
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsFormOpen(false)}
            className="border-indigo-200 text-indigo-600 rounded-lg"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg"
          >
            <Heart className="h-4 w-4 mr-2" />
            Add Habit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
