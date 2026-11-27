import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext({
  isOpen: false,
  openResumeModal: () => {},
  closeResumeModal: () => {},
});

export function ResumeProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ResumeContext.Provider
      value={{
        isOpen,
        openResumeModal: () => setIsOpen(true),
        closeResumeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeContext);
}
