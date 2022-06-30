import React, { useState, useEffect } from 'react';
import { useZoneActions } from '../../_actions';


export const ZonesListDropDown = (props) =>
{
  const zoneActions = useZoneActions();
  const [options, setOptions] = useState([]);

  useEffect(() =>
  {
    zoneActions.getAll().then(x => setOptions(x));
  }, []);

  return <ZonesDropdown options={options} />;
}

const ZonesDropdown = (props) => (
  <React.Fragment>
    {/* <option value={props.selected}></option> */}
    {props.options.map((item, index) => (
      <option key={index} value={item.id} >
        {item.zoneName}
      </option>
    ))}
  </React.Fragment>
)

// export default class ZonesListDropDown extends React.Component
// {
//   constructor()
//   {
//     super()
//     this.state = {
//       collection: [],
//       value: '',
//     }
//   }
//   componentDidMount()
//   {
//     const baseUrl = `${process.env.REACT_APP_API_URL}/zone`;

//     fetch(`${baseUrl}/GetAll`)
//       .then((response) => response.json())
//       .then((res) => this.setState({ collection: res }))
//   }
//   onChange = (event) =>
//   {
//     this.setState({ value: event.target.value })
//   }
//   render()
//   {
//     return (
//       <ZonesDropdown
//         name={this.state.zonename}
//         options={this.state.collection}
//         onChange={this.onChange}
//       />
//     )
//   }
// }