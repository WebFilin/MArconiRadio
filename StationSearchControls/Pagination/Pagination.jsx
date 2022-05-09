import React from 'react';

import "./pagination.css"

// Импортируем API радиостанций
import RadioBrowserApi from "radio-browser"

import { useDispatch } from 'react-redux';

import { getStep } from '../../store/paginationReduser';

import ReactPaginate from 'react-paginate';

import ArrowPaginate from './ArrowPaginate/ArrowPaginate';

import { useSelector } from 'react-redux';

import PaginationLoading from './PaginationLoading/PaginationLoading';

function Pagination() {

   const limitItemsPage = useSelector(state => state.totalStationInPage.totalStations)

   // Стартовый номер страницы станции
   const [numPage, setNumPage] = React.useState(0)

   // Количество страниц для отображения
   const [totalPages, setTotalPages] = React.useState(0)

   // Количество страниц для отображения при поисковом запросе
   const [totalPagesSearch, setTotalPagesSearch] = React.useState(0)

   const dispatch = useDispatch()

   // Обьект поисковых запросов из инпутов SearchForms
   const searchForms = useSelector(state => state.valueSearch.valueInput)

   //Получаем количество станций через статистику сервера
   React.useEffect(() => {

      async function getServerData() {
         const response = await fetch("https://de1.api.radio-browser.info/json/stats")

         if (response.ok) {
            const serverData = await response.json()

            // получаем количество старниц для отображения
            setTotalPages(Math.ceil(serverData.stations / limitItemsPage))
         }

         else {
            alert("Ошибка HTTP: " + response.status)
         }
      }

      getServerData()

   }, [limitItemsPage])

   // Обсчет количества станиций в поисковом запросе
   React.useEffect(() => {

      // Пoлучаем станции по поисковым запросам
      async function getSearchList() {

         const stationListsSearch = await RadioBrowserApi.searchStations({
            name: searchForms.Name.toLowerCase(),
            country: searchForms.Сountry.toLowerCase(),
            tag: searchForms.Style.toLowerCase(),
            language: searchForms.Language.toLowerCase(),

            hidebroken: false,
         })

         setTotalPagesSearch(stationListsSearch.length)
      }

      // При поисковом запросе пересчитываем пагинацию
      if (searchForms) {

         getSearchList()

         // получаем количество старниц для отображения
         setTotalPages(Math.ceil(totalPagesSearch / limitItemsPage))
      }

   }, [searchForms, totalPagesSearch, limitItemsPage])

   // Передаем шаг в StationSearch
   React.useEffect(() => {
      dispatch(getStep(numPage))
   }, [numPage, dispatch])

   function handlePageClick({ selected }) {
      setNumPage(selected)
   }

   return (
      <div className='station__control-pagination-wraper'>

         {totalPages ?

            <ReactPaginate
               // Кнопки конца и начала диапазона пагинации
               breakLabel="..."
               breakLinkClassName="station__control-pagination-break"

               // Тело пагинации
               className="station__control-pagination-body"

               // тег li каждого элемента страницы.
               pageClassName="station__control-pagination-btn-elem"

               // Элементы ссылок кнопок пагинации
               pageLinkClassName="station__control-pagination-btn-link"

               // Активный элемент
               activeLinkClassName="station__control-pagination-active-elem"

               // Элемент ли кнопкок назад вперед
               previousClassName="station__control-pagination-btn-previous"
               nextClassName="station__control-pagination-btn-next"

               // Ссылки в кнопках вперед назад
               previousLinkClassName=""
               nextLinkClassName=""

               nextLabel={<ArrowPaginate />}
               onPageChange={handlePageClick}
               pageRangeDisplayed={5}

               // Количество отображаемых страниц с концаъ
               marginPagesDisplayed={1}
               pageCount={totalPages}
               previousLabel={<ArrowPaginate />}
               renderOnZeroPageCount={null}
            />

            :

            <PaginationLoading dataFail={totalPagesSearch} />
         }

      </div>
   );
}

export default Pagination;