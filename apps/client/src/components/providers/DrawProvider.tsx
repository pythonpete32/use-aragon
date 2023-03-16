import React, { createContext, useContext, useState } from "react";

interface DrawerState {
  isOpen: boolean;
  header: string | null;
  form: JSX.Element | null;
  formId: string | null;
  formText: string | null;
  onOpen: (newContent: DrawContent) => void;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerState>({
  isOpen: false,
  header: null,
  form: null,
  formId: null,
  formText: null,
  onOpen: () => {},
  onClose: () => {},
});

export const useDrawer = () => {
  return useContext(DrawerContext);
};

interface DrawContent {
  header: string;
  form: JSX.Element;
  formId: string;
  formText: string;
}

interface DrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<string | null>(null);
  const [form, setForm] = useState<JSX.Element | null>(null);
  const [formId, setFormId] = useState<string | null>(null);
  const [formText, setFormText] = useState<string | null>(null);

  const onOpen = (newContent: DrawContent) => {
    setHeader(newContent.header);
    setFormId(newContent.formId);
    setFormText(newContent.formText);
    setForm(newContent.form);
    setIsOpen(true);
  };

  const onClose = () => {
    setHeader(null);
    setForm(null);
    setFormId(null);
    setFormText(null);
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ header, form, formId, formText, isOpen, onOpen, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
};
