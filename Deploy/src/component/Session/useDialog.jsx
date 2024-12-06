import { useState, useCallback } from "react";

const useDialog = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return [open, openDialog, closeDialog];
};

export default useDialog;
