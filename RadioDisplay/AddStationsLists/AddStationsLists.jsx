import React from 'react';

import RadioBrowserApi from 'radio-browser';

import "./addStationsLists.css"

import ItemsAddStations from '../ItemsAddStations/ItemsAddStations';

function AddStationsLists() {

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
               elemLocalStorage.splice(0, arrStations.length, ...arrStations)
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
      <div className='add-stations-lists__wraper'>

         {arrDrow &&
            <>
               <div className="radio-display__station-wraper-up">
                  <ItemsAddStations contryName={arrDrow[0].country} url={arrDrow[0].url} min={2} max={5} dot={"down"} />
                  <ItemsAddStations contryName={arrDrow[1].country} url={arrDrow[1].url} min={11} max={14} dot={"down"} />
                  <ItemsAddStations contryName={arrDrow[2].country} url={arrDrow[2].url} min={20} max={24} dot={"down"} />
                  <ItemsAddStations contryName={arrDrow[3].country} url={arrDrow[3].url} min={30} max={34} dot={"down"} />
                  <ItemsAddStations contryName={arrDrow[4].country} url={arrDrow[3].url} min={40} max={44} dot={"down"} />
               </div>

               <div className="radio-display__station-wraper-down">
                  <ItemsAddStations contryName={arrDrow[5].country} url={arrDrow[5].url} min={7} max={10} dot={"up"} />
                  <ItemsAddStations contryName={arrDrow[6].country} url={arrDrow[6].url} min={16} max={20} dot={"up"} />
                  <ItemsAddStations contryName={arrDrow[7].country} url={arrDrow[7].url} min={25} max={29} dot={"up"} />
                  <ItemsAddStations contryName={arrDrow[8].country} url={arrDrow[8].url} min={35} max={40} dot={"up"} />
               </div>
            </>
         }

      </div>
   );
}

export default AddStationsLists;