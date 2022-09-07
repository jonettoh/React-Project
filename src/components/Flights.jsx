import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline  } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'


/*const plane = new L.Icon({
  iconUrl: require("../assets/plane.png"),
  iconSize:     [20, 20], 
  iconAnchor:   [0, 0], 
  popupAnchor:  [0, 0]
});
*/
const departure = new L.Icon({
  iconUrl: require("../assets/departure.png"),
  iconSize:     [20, 20], 
  iconAnchor:   [0, 0], 
  popupAnchor:  [0, 0]
});

const arrival = new L.Icon({
  iconUrl: require("../assets/arrival.png"),
  iconSize:     [20, 20], 
  iconAnchor:   [0, 0], 
  popupAnchor:  [0, 0]
});

//const limeOptions = { color: 'lime' }


const Flights = () => {
    
  const [flights, setFlights] = useState({});
 
  //const [planeinfo, setPlaneinfo] = useState({})
  const [planes, setPlanes] = useState([]);
  /*const handleChange = e => {
    const { name, value } = e.target;
    setPlanes(prevState => ({
        ...prevState,
        [name]: value
    }));
};*/

  const [ws,setWs] = useState(new WebSocket("wss://tarea-1.2022-2.tallerdeintegracion.cl/connect")) 
  

  //websocket info
   
//elementos del chat
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const sendMessage = (msg) => {
    const message = {type: "chat", content:msg};
    ws.send(JSON.stringify(message));
  }



    useEffect(() => {
      
      //console.log("Created ws");
      ws.onopen = (event)=> {
        var obj = {
          "type": "join",
          "id": "79297f27-e65a-42d7-a5a2-86244dbebcac",
          "username": "jonetto",
        };
        ws.send(JSON.stringify(obj));
        //console.log("JOIN sent");
      };
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            //console.log(msg.type);
            switch (msg.type){
                case 'flights':
                    
                    //console.log(msg)
                    setFlights(msg.flights);
                    setPlanes(Object.keys(flights));
                    
                  break;
                case 'plane':
                  /*if (msg.plane.flight_id in Object.keys(flights)){
                    setPlanes(prevState => ({
                      ...prevState,
                      msg["plane"].flight_id = {msg.plane} 
                   }));
                  }*/
                  
                  //console.log((!Object.keys(flight).includes(msg.plane.flight_id)))
                  //console.log(!Object.keys(planes).includes(msg.plane.flight_id))
                  /*if (!Object.keys(planes).includes(msg.plane.flight_id)){
                    planes[msg.plane.flight_id] = msg.plane;
                    setPlaneinfo(planes)
                  }*/
                //console.log(planeinfo)
                  
                  //console.log(flight)
                  //setPlanes({...planes, msg.plane.flight_id : msg.plane })
                  break;
                case 'take-off':
                  
                  break;
                case 'landing':
                  break;
                case 'crashed':
                  break;
                case 'message':
                  console.log(msg.message.content)
                  messages.push([msg.message.name, msg.message.content,msg.message.date, msg.message.level]);
                  if(messages.length > 8) {
                    console.log(messages)
                    setMessages(messages.slice(-8))
                  }
                  break;
                case 'chat':
                  break;
                default:
                  console.log('No meesage found')
              };
        };
      return () => { 
          ws.onclose = () => {
            console.log('WebSocket Disconnected');
            setWs(new WebSocket("wss://tarea-1.2022-2.tallerdeintegracion.cl/connect"));
          }
        }
  }, [ws.onmessage, ws.onopen, ws.onclose])
  
    return (
      <div>
        <MapContainer center={[51.505, -0.09]} zoom={2} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    {Object.keys(flights).length > 0 && 
      Object.keys(flights).map( (element, index) => (
        <Marker position={[flights[element].departure.location.lat, 
        flights[element].departure.location.long]} key={index} icon={departure} >
          <Popup>
            <p>ID vuelo ORIGEN: {flights[element].id}</p>
            <p>Nombre: {flights[element].departure.name}</p>
            <p>Pais: {flights[element].departure.city.country.name}</p>
            <p>ciudad: {flights[element].departure.city.name}</p>
          </Popup>
        </Marker>
      ))
    }

{Object.keys(flights).length > 0 && 
      Object.keys(flights).map( (element, index) => (
        <Marker position={[flights[element].destination.location.lat, 
        flights[element].destination.location.long]} key={index} icon={arrival} >
          <Popup>
            <p>ID vuelo ORIGEN: {flights[element].id}</p>
            <p>Nombre: {flights[element].destination.name}</p>
            <p>Pais: {flights[element].destination.city.country.name}</p>
            <p>ciudad: {flights[element].destination.city.name}</p>
          </Popup>
        </Marker>
      ))
    }
  
  {/*Object.keys(flights).length > 0 && 
      Object.keys(flights).map( (element, index) => (
        <Marker position={[planeinfo[element].position.lat, 
        planeinfo[element].position.long]} key={index} icon={plane} >
          
        </Marker>
      ))*/
    }

{Object.keys(flights).length > 0 && 
      Object.keys(flights).map( (element, index) => (
            <Polyline 
            positions={[
              [flights[element].departure.location.lat,
               flights[element].departure.location.long],
              [flights[element].destination.location.lat,
                flights[element].destination.location.long]]} 
                weight={4} opacity={0.2} pathOptions={{ color: "lime" }}
                key={index} ></Polyline>
                  ))
                }

      </MapContainer>
    <table>
      <thead>
      <tr>
        <th>Flight</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>Departure Date</th>
      </tr>
      </thead>
      <tbody>
      {Object.keys(flights).length > 0 && 
      Object.keys(flights).map( (element, index) => (
        <tr key={index}> 
          <td>{flights[element].id}</td>
          <td>{flights[element].departure.city.name}</td>
          <td>{flights[element].destination.city.name}</td>
          <td>{flights[element].departure_date}</td>
        </tr>

      ))}
      </tbody>
    </table>
          
        <div className="chat">
          <div>
            {messages.length > 0 &&
              messages.map((element, index) =>{
                return <p key={index} className= "mensajes"> {element[0]}: {element[1]} 
                <br/>{element[2]}
                </p>
              }
              )

            }
          </div>
          <div className="Btn">
            <form
            action = ""
            onSubmit={e=>{
              e.preventDefault();
              sendMessage(message);
              setMessage([]);
            }}
            >
              <input
              type="text"
              className="textfield"
              placeholder={'Send something'}
              value={message}
              onChange={e => setMessage(e.target.value)}
              />
              <input type="submit" value={'Enviar'} className='send' />
            </form>
          </div>
        </div>



        </div>       
  )
}

export default Flights;

