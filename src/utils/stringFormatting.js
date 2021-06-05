export const formatSearch = (word) => {
  word = word.split(' ');
  //   for (let index = 0; index < word.length; index++) {
  //     if (word[index] === ' ') {
  //       word[index] = 'a';
  //     }
  //   }
  word = word.join('%20');
  console.log(word);
};
