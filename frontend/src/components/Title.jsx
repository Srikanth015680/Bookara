import React from 'react'

const Title = ({title1,title2,titleStyles,title1Styles,paraStyles}) => {
  return (
   <div className={`${titleStyles} pb-1`}>
    <h2 className={`${title1Styles}  text-[25px] leading-tight md:text-[35px] md:leading-[1.3] mb-4 font-bold`}>{title1}
      <span className=' pl-2 text-[#452372] font-light! '>{title2}</span>
    </h2>
   
   </div>
  )
}

export default Title