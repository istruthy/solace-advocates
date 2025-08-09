export const formatPhoneNumber = (phoneNumber: string): string | null => {
  if (phoneNumber.length !== 10) {
    //TODO: Add error handling or logging to the console
    return phoneNumber;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};
