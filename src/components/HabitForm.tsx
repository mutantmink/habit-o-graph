
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X } from 'lucide-react';
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
    const colors = ['#c6e48b', '#7bc96f', '#239a3b', '#196127'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  if (!isFormOpen) {
    return (
      <div className="my-4">
        <Button 
          onClick={() => setIsFormOpen(true)}
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6 border border-dashed border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 animate-fade-in bg-white/50 hover:bg-white/70 transition-all duration-300 group"
        >
          <PlusCircle className="h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
          <span className="font-medium">Add New Habit</span>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="my-6 p-4 rounded-xl border border-gray-100 bg-white shadow-sm animate-scale-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Add New Habit</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsFormOpen(false)}
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="habit-name" className="text-sm font-medium text-gray-700">
            Habit Name
          </label>
          <Input
            id="habit-name"
            placeholder="e.g., Exercise, Read, Meditate"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="habit-description" className="text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <Input
            id="habit-description"
            placeholder="e.g., Walk for 30 minutes"
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Add Habit</Button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
