import React from 'react';

import "./searchForms.css"

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import { getValueSearch } from '../../store/searchImputsValueReduser';

import Input from "./Input/Input"

import ButtonSubmit from './ButtonSubmit/ButtonSubmit';

function SearchForms() {

   const dispatch = useDispatch()

   // Выражение для проверки валидности формы
   const validDataLanguage = /^[а-яА-Яa-zA-Z\s]+$/
   //eslint-disable-next-line 
   const validDataName = /^[а-яА-ЯёЁa-zA-Z0-9\s\d\#\d]+$/
   //eslint-disable-next-line
   const validDataStyle = /^[а-яА-Яa-zA-Z0-9\s\w\d\#\d\W]+$/
   const validDataCountry = /^[a-zA-Z\s]+$/

   // register - регистрируем изменения в форме
   // handleSubmit - колбек для обработки формы
   // reset - очищаем форму после отправки
   // formState: { errors } - слушатель статуса формы 
   // isValid - флаг если форма валидна

   const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
      mode: "onChange",
      criteriaMode: "all",
      shouldFocusError: true,
   });

   // Обработчик запросов формы
   const onSubmit = (data) => {

      // Отправляет данные через redux в StationSearch
      dispatch(getValueSearch(data))

      //Очищаем формы
      reset()
   };

   return (
      <div className="search-forms__wraper">

         {/*"handleSubmit" проверяет входные данные перед вызовом "onSubmit"  */}
         <form onSubmit={handleSubmit(onSubmit)} className="search-forms__body">

            {/* Запросы в API для поиска */}
            {/*  codecs, countries, countrycodes, languages, states, tags */}

            <Input
               label="Name"
               register={register}
               validData={validDataName}
               errors={!!errors.Name}
               messageErr="Incorrect Name"
               dataCategory=""
               datalistId="search-forms__input-name"
               offsetLoad={0}
            />

            <Input
               label="Style"
               register={register}
               validData={validDataStyle}
               errors={!!errors.Style}
               messageErr="Incorrect style"
               dataCategory="tags"
               datalistId="search-forms__input-tags"
               offsetLoad={2}
            />

            <Input
               label="Language"
               register={register}
               validData={validDataLanguage}
               errors={!!errors.Language}
               messageErr="Incorrect language"
               dataCategory="languages"
               datalistId="search-forms__input-languages"
               offsetLoad={2}
            />

            <Input
               label="Сountry"
               register={register}
               validData={validDataCountry}
               errors={!!errors.Сountry}
               messageErr="Incorrect country name"
               dataCategory="countries"
               datalistId="search-forms__input-countries"
               offsetLoad={0}
            />

            <ButtonSubmit title="Search" disabled={!isValid} />
         </form>
      </div>
   );
}

export default SearchForms;
