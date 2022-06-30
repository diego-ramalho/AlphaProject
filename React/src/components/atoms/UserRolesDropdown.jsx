import React, { useState, useEffect } from 'react';
import { useUserActions } from '../../_actions';
import Select from 'react-select';

export const UserRolesListDropDown = () => {

  // const options = [
  //   { value: 'developer', label: 'Software Developer' },
  //   { value: 'chef', label: 'Chef' },
  //   { value: 'enginner', label: 'Enginner' },
  //   { value: 'painter', label: 'Painter' }  
  // ]

  const userActions = useUserActions();

  const [options, setOptions] = useState([]);  

  const [selected, setSelected] = useState(1);

  useEffect(() =>
  {
    userActions.getUsersRoles().then(x => setOptions(x));
    console.log({options});
  }, []);
  

  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <div>
      <select value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.roleName} value={option.id}>
            {option.roleName}
          </option>
        ))}
      </select>
    </div>
  );
}

// export const UserRolesListDropDown = (props) =>
// {
//   const userActions = useUserActions();
//   const [options, setOptions] = useState([]);
//   const [selected, setSelected] = useState(props.selected);

//   useEffect(() =>
//   {
//     userActions.getUsersRoles().then(x => setOptions(x));
//   }, []);
  
//   return <UserRolesDropdown options={options} />;
// }

// const UserRolesDropdown = (props) => (
//   // <div className="form-group">
//   //   <strong>{props.rolename}</strong>
//   //   <select
//   //     className="form-control"
//   //     name="role"
//   //     onChange={props.onChange}
//   //   >
//   <React.Fragment>
//     {/* <option defaultValue>Select {props.name}</option> */}
//     {/* <option value=""></option> */}
//     {props.options.map((item, index) => (
//       <option key={index} value={item.id} >
//         {item.roleName}
//       </option>
//     ))}
//   </React.Fragment>
//   //   </select>
//   // </div>
// )

// export default class UserRolesListDropDown extends React.Component
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
//     const baseUrl = `${process.env.REACT_APP_API_URL}/user`;

//     fetch(`${baseUrl}/GetUserRoles`)
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
//       // <div className="container mt-4">
//       //   <h2>React Dropdown List with Bootstrap Example</h2>
//       <UserRolesDropdown
//         name={this.state.rolename}
//         options={this.state.collection}
//         onChange={this.onChange}
//       />
//       // </div>
//     )
//   }
// }