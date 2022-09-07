import React, { useState, useEffect } from "react";
import { Marker } from "react-leaflet";

const Ejemplo = () => {
    const [flights, setFlights] = useState({});
    const [flighsArray, setFlightsArray] = useState([]);
    // aca depende del tipo de dato que quieres guardar como tienes que definir el useState
    // por ejemplo, podria ser useState([])

    useEffect(() => {
        /*

        1. conectas ws
        2. creas funcion que recibe mensajes
            =  suponiendo que quieres guardar un dict de un mensaje message,
               haces setFlights(message)
        3. cierras ws

        */
        return () => { //papita pa cerrar la wea
            ws.onclose = () => {
              console.log('WebSocket Disconnected');
              setWs(new WebSocket(URL));
            }
          }
    }, [ws.onmessage, ws.onopen, ws.onclose]);

    return (
        <div>
            {setFlightsArray.map( (vuelo, index) => {
                return <Marker position={latlong} key={index} icon={icono}></Marker>
            })}
        </div>
    )

}

export default Ejemplo;
/*
{flights2.length > 0 && 
    flights2.map( (element, index) => (
      <Marker position={[flights[element].departure.location["lat"], 
      flights[element].departure.location["long"]]} key={index} icon={originAirportIcon} >
        <Popup>
          <p>ID vuelo ORIGEN: {flights[element].id}</p>
          <p>Nombre: {flights[element].departure.name}</p>
          <p>Pais: {flights[element].departure.city.country["name"]}</p>
          <p>ciudad: {flights[element].departure.city.name}</p>
        </Popup>
      </Marker>
    ))
  }
*/