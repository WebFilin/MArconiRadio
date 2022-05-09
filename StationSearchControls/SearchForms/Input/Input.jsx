import React from 'react';

import "./input.css"

// Импортируем API радиостанций
import RadioBrowserApi from "radio-browser"

function Input({ label, register, validData, errors, messageErr, dataCategory, datalistId, offsetLoad }) {

   const messageFail = <span>{messageErr}</span>

   // Получаем список категорий для отображения
   const [selectCategory, setSelectCategory] = React.useState([])

   React.useEffect(() => {

      async function getCategory() {
         const getCategory = await RadioBrowserApi.getCategory(dataCategory, {
            offset: offsetLoad
         })

         setSelectCategory(getCategory)
      }

      // Проверка на наличие поискового запроса
      if (dataCategory) {
         getCategory()
      }


   }, [dataCategory, offsetLoad])

   return (
      <div className='search-forms__input-wraper'>

         <label className='search-forms__input-title'>
            {label}
         </label>

         <input list={datalistId}
            {...register(label, { pattern: validData })}
            placeholder={`-- Search ${label} --`}
         />

         <datalist id={datalistId}>

            {selectCategory && selectCategory.map((elem) => (

               <option
                  key={`${elem.name} - ${elem.stationcount}`}
                  value={elem.name}>{elem.name}
               </option>

            ))}

         </datalist>

         <div className="search-forms__input-error">
            {errors ? messageFail : ""}
         </div>

      </div>
   );
}

export default Input;
