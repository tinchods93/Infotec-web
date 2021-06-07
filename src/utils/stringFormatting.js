export const formatSearch = (word) => {
  word = word.split('+');
  word = word.join('%20');
  return word;
};
