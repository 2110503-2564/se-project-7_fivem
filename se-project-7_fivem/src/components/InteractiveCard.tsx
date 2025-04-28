'use client'
import React from 'react';

export default function InteractiveCard({ children, className }: { children: React.ReactNode, className?: string }) {
    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg');
            event.currentTarget.classList.remove('bg-white');
            event.currentTarget.classList.add('bg-neutral-200');
            event.currentTarget.classList.add('shadow-2xl');
        } else {
            event.currentTarget.classList.remove('bg-neutral-200');
            event.currentTarget.classList.remove('shadow-2xl');
            event.currentTarget.classList.add('shadow-lg');
            event.currentTarget.classList.add('bg-white');
        }
    }

  return (
    <div className={`w-full h-[120px] shadow-lg rounded-lg bg-white ${className || ''}`} 
    onMouseOver={(e)=> onCardMouseAction(e)}
    onMouseOut={(e)=> onCardMouseAction(e)}>
        {children}
    </div>
  )
}
