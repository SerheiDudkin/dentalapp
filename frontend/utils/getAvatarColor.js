export const getAvatarColor = (letter) => {
  const charCode = letter.charCodeAt(0);
  if (charCode >= 1040 && charCode <= 1047) {
    return {
      background: '#E9F5FF',
      color: '#2A86FF',
    };
  }
  if (charCode >= 1048 && charCode <= 1055) {
    return {
      background: '#F5D6D9',
      color: '#F38181',
    };
  }
  if (charCode >= 1049 && charCode <= 1063) {
    return {
      background: '#F8ECD5',
      color: '#81a32F',
    };
  }
  if (charCode >= 1064 && charCode <= 1071) {
    return {
      background: '#DAD5F8',
      color: '#816CFF',
    };
  }
  return {
    background: '#DAD5F8',
    color: '#816CFF',
  };
};
