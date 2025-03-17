
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger 
} from '@/components/ui/drawer';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle 
} from '@/components/ui/resizable';

interface User {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

const users: User[] = [
  { id: '1', name: 'You', initials: 'YO', avatar: undefined },
  { id: '2', name: 'Sarah', initials: 'SA', avatar: undefined },
  { id: '3', name: 'Alex', initials: 'AL', avatar: undefined }
];

interface SwipePanelProps {
  activeUserId: string;
  onUserChange: (userId: string) => void;
}

const SwipePanel: React.FC<SwipePanelProps> = ({ 
  activeUserId, 
  onUserChange 
}) => {
  const activeUser = users.find(user => user.id === activeUserId) || users[0];
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectUser = (userId: string) => {
    onUserChange(userId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile drawer for smaller screens */}
      <div className="md:hidden fixed z-30 right-0 top-1/2 transform -translate-y-1/2">
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button className="flex items-center p-2 bg-white/80 backdrop-blur-md rounded-l-lg border border-r-0 border-indigo-100 shadow-md hover:bg-white/90 transition-all group">
              <div className="mr-1 opacity-70 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="h-5 w-5 text-indigo-600" />
              </div>
              <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                <AvatarImage src={activeUser.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white text-xs">
                  {activeUser.initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh] pt-10 rounded-l-2xl rounded-r-none right-0 left-auto w-[85vw] max-w-md">
            <div className="px-4">
              <h3 className="text-lg font-medium mb-4">Switch Dashboard</h3>
              <div className="space-y-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className={cn(
                      "w-full flex items-center p-3 rounded-lg transition-all",
                      user.id === activeUserId 
                        ? "bg-indigo-50 text-indigo-700 font-medium border border-indigo-100" 
                        : "hover:bg-gray-50"
                    )}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className={cn(
                        "text-white",
                        user.id === "1" ? "bg-gradient-to-br from-blue-400 to-indigo-400" :
                        user.id === "2" ? "bg-gradient-to-br from-pink-400 to-purple-400" :
                        "bg-gradient-to-br from-green-400 to-teal-400"
                      )}>
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">
                        {user.id === activeUserId ? "Current dashboard" : "View dashboard"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop sidebar for larger screens */}
      <div className="hidden md:block fixed z-30 right-0 top-1/2 transform -translate-y-1/2">
        <div className="bg-white/80 backdrop-blur-md rounded-l-lg border border-r-0 border-indigo-100 shadow-md hover:shadow-lg transition-all">
          <div className="py-3 px-1">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onUserChange(user.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 my-2 rounded-md transition-all",
                  user.id === activeUserId 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Avatar className={cn(
                  "h-10 w-10 mb-1",
                  user.id === activeUserId ? "ring-2 ring-indigo-300 ring-offset-2" : ""
                )}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className={cn(
                    "text-white",
                    user.id === "1" ? "bg-gradient-to-br from-blue-400 to-indigo-400" :
                    user.id === "2" ? "bg-gradient-to-br from-pink-400 to-purple-400" :
                    "bg-gradient-to-br from-green-400 to-teal-400"
                  )}>
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{user.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SwipePanel;
