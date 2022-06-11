import React from 'react';

function StationNameHandler({ countryName }) {

   const [countryDrow, setCountryDrow] = React.useState()

   React.useEffect(() => {

      // Отлавливаем все длинные и сложные названия, сокрашаем
      switch (countryName) {
         case "The United Arab Emirates":
            setCountryDrow("Emirates ")
            break;

         case "American Samoa":
            setCountryDrow("Samoa")
            break;

         case "Bosnia And Herzegovina":
            setCountryDrow("Bosnia")
            break;

         case "Brunei Darussalam":
            setCountryDrow("Brunei")
            break;

         case "The Cocos Keeling Islands":
            setCountryDrow("Cocos Islands")
            break;

         case "The Democratic Republic Of The Congo":
            setCountryDrow("Congo")
            break;

         case "The Dominican Republic":
            setCountryDrow("Dominican")
            break;

         case "The Falkland Islands Malvinas":
            setCountryDrow("Falkland Islands")
            break;

         case "British Indian Ocean Territory":
            setCountryDrow("British Indian")
            break;

         case "Islamic Republic Of Iran":
            setCountryDrow("Iran")
            break;

         case "Saint Kitts And Nevis":
            setCountryDrow("Saint Kitts")
            break;

         case "The Republic Of Korea":
            setCountryDrow("Korea")
            break;

         case "The Republic Of Moldova":
            setCountryDrow("Moldova")
            break;

         case "Republic Of North Macedonia":
            setCountryDrow("Macedonia")
            break;

         case "Saint Pierre And Miquelon":
            setCountryDrow("Saint Pierre")
            break;

         case "State Of Palestine":
            setCountryDrow("Palestine")
            break;

         case "The Russian Federation":
            setCountryDrow("Russian")
            break;

         case "Ascension And Tristan Da Cunha Saint Helena":
            setCountryDrow("Saint Helena")
            break;

         case "Sao Tome And Principe":
            setCountryDrow("Sao Tome")
            break;

         case "Syrian Arab Republic":
            setCountryDrow("Syrian ")
            break;

         case "The Turks And Caicos Islands":
            setCountryDrow("Turks")
            break;

         case "The French Southern Territories":
            setCountryDrow("French Southern")
            break;

         case "Trinidad And Tobago":
            setCountryDrow("Trinidad")
            break;

         case "Taiwan Province Of China":
            setCountryDrow("Taiwan")
            break;

         case "United Republic Of Tanzania":
            setCountryDrow("Tanzania")
            break;

         case "The United States Minor Outlying Islands":
            setCountryDrow("Outlying Islands")
            break;

         case "The United States Of America":
            setCountryDrow("America")
            break;

         case "Saint Vincent And The Grenadines":
            setCountryDrow("Grenadines")
            break;


         case "Bolivarian Republic Of Venezuela":
            setCountryDrow("Venezuela")
            break;

         case "US Virgin Islands":
            setCountryDrow("Virgin Islands")
            break;


         case "Wallis And Futuna":
            setCountryDrow("Wallis Islands")
            break;

         case "The Central African Republic":
            setCountryDrow("African Republic")
            break;

         case "The United Kingdom Of Great Britain And Northern Ireland":
            setCountryDrow("Britain")
            break;

         case "Papua New Guinea":
            setCountryDrow("Papua")
            break;

         case "Antigua And Barbuda":
            setCountryDrow("Antigua")
            break;

         default:

            // Обрезаем приставку This
            let arrName = countryName.split(" ")

            arrName.forEach((elem) => {

               if (elem === "The") {

                  let index = arrName.indexOf(elem)

                  if (index !== -1) {
                     arrName.splice(index, 1)
                     let nameString = arrName.join(" ")

                     setCountryDrow(nameString)
                  }
               }

               else {
                  setCountryDrow(countryName)
               }
            })

            break;
      }

   }, [countryName])


   return (
      <div>
         {countryDrow}
      </div>
   );
}

export default StationNameHandler;