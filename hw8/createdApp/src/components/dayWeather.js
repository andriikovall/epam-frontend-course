import React from 'react'

export default function DayWeatherBig({ weather, sunRise, sunSet, title, expanded }) {
    
    return (
        <pre>{JSON.stringify({weather, sunRise, sunSet, title}, null, 2)}</pre>
    )
}
