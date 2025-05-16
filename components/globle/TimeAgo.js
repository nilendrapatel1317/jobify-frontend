"use client";

import { TimerResetIcon } from "lucide-react";

const TimeAgo = ({ timestamp , from}) => {
  if (!timestamp) return null;

  const calculateTimeAgo = (dateString) => {
    const postedDate = new Date(dateString);
    const currentDate = new Date();
    const seconds = Math.floor((currentDate - postedDate) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };

  return (
    <p className="text-sm text-black italic flex mt-3 gap-2 items-center">
      <TimerResetIcon className="w-4 h-4" /> 
      posted {calculateTimeAgo(timestamp)}
    </p>
  );
};

export default TimeAgo;