
function WordCutUpHandler({ str, amount, spliterator, jumper }) {

   // Устанавливаем первую букву слова заглавной
   // Обрезаем строку до нужного количества слов
   if (!str) {
      return str
   }

   else {
      let bufferStr = []
      let arrStr = str.split(spliterator)

      // либо значение из пропса, либо вся длинна массива
      let strLenght = amount > 0 ? amount : arrStr.length

      for (let i = 0; i < strLenght; i++) {
         const word = arrStr[i]

         if (word) {
            const uppedWord = word.charAt(0).toUpperCase() + word.slice(1)
            bufferStr.push(uppedWord)
         }
      }
      return bufferStr.join(jumper)
   }
}

export default WordCutUpHandler;