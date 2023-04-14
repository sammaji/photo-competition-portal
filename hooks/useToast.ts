import { useState } from "react";

const useToasts = () => {
  const toast = useState();
  const showToasts = () => {};

  return {showToasts};
};
