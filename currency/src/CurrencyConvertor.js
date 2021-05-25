import React from 'react'

export default function CurrencyConvertor(props) {
    const{
        currencyOptions,selectedCurrency,onChangeCurrency,amount,onchangeAmount

        
    }= props

    return (
        <div>
        <input type ="number" className="input" value={amount} onChange={onchangeAmount} />
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option =>(
                      <option key={option} value={option}>{option}</option>
            ))}
          
        </select>
        </div>
    )
}
