import React from 'react';

import RadioBrowserApi from 'radio-browser';

import "./addStationsLists.css"

import ItemsAddStations from '../ItemsAddStations/ItemsAddStations';

function AddStationsListsUp({ limitMax, limitMin }) {

   const [arrDrow, setArrDrow] = React.useState(null)

   // Получаем первые 5 элементов из стора
   React.useEffect(() => {

      // Стек для сбора всех радиостанций из цикла
      const elemLocalStorage = []

      // Стек расшифрованных станци из API
      const arrStations = []

      // Заполняем массив пустыми значениями 
      // Так обходим undefined
      for (let index = 0; index < 9; index++) {
         elemLocalStorage.push({})
      }

      // Получаем список радиостанций по ключам в localStorage
      async function getStationsList() {

         try {
            for (let i = 0; i <= localStorage.length; i++) {

               let key = localStorage.key(i);

               let keyValue = localStorage.getItem(key)

               let radioObj = await RadioBrowserApi.getStations({
                  by: 'byuuid',
                  searchterm: keyValue
               })

               // Расшифровываем полученый от API массив
               // Заменяем пустые элементы в массиве на элементы полученные из localStorage
               if (radioObj) {

                  radioObj.map((elem) => arrStations.push(elem))
               }
            }

            // Динамически заменяем содержимое массива получеными станциями
            if (localStorage.length > 0) {
               Array.prototype.splice.apply(elemLocalStorage, [0, arrStations.length].concat(arrStations))
            }

            setArrDrow(elemLocalStorage)
         }

         catch (err) {
            alert(err)
         }
      }

      getStationsList()

   }, [])

   return (

      <div className='add-stations-lists-up__wraper'>
         {arrDrow &&

            <>
               <ItemsAddStations contryName={`${arrDrow[0].country}`} url={arrDrow[0].url} min={2} max={5} dot={false} />
               <ItemsAddStations contryName={`${arrDrow[1].country}`} url={arrDrow[1].url} min={11} max={14} dot={false} />
               <ItemsAddStations contryName={`${arrDrow[2].country}`} url={arrDrow[2].url} min={20} max={22} dot={false} />
               <ItemsAddStations contryName={`${arrDrow[3].country}`} url={arrDrow[3].url} min={28} max={31} dot={false} />
               <ItemsAddStations contryName={`${arrDrow[3].country}`} url={arrDrow[3].url} min={37} max={40} dot={false} />
            </>
         }


      </div>
   );
}

export default AddStationsListsUp;