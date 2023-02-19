import React, { useContext } from 'react'
import { BuySearchApi } from '../ContextApi/BuySearch'
import { SignerApi } from '../ContextApi/signerApi'

const BuySearchChildren = ({children} : {children: React.ReactNode}) => {
  const values = useContext(SignerApi)
    const [data , setData] = React.useState(values?.data)

    React.useEffect(()=>{
setData(()=> values?.data)
    },[values?.data])

const value = {
    data,
    setData
}
  return (
   <BuySearchApi.Provider value={value}> {children}</BuySearchApi.Provider>
  )
}

export default BuySearchChildren;