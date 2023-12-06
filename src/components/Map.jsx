import {When} from 'react-if';


const API_KEY = 'pk.9b1f47b60a4e41bb88cb29aa817c0830'

;

function Map(props) {
console.log(API_KEY);

  console.log(props.latitude)
  console.log(props.longitude)
  return (
    <When condition={props.latitude && props.longitude}>
      <figure>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${props.latitude},${props.longitude}&size=600x600&format=png`} width="800" height="800"/>
      </figure>
   
    </When>
  )
}

export default Map;

