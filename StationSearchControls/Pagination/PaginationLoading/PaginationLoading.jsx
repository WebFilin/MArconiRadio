import React from 'react';

import "./paginationLoading.css"

function PaginationLoading({ dataFail }) {

   // Выводим или загрузчик или пустую строку если прищел пустой массив
   return (

      <div className='station__control-pagination-loader-wraper' >

         {dataFail > 0 ?

            < div className="station__control-pagination-loader-body"></ div>
            :
            ""
         }

      </div >


   );
}

export default PaginationLoading;