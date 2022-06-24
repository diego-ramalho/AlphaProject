import React from 'react'

export const UserRolesDropdown = (props) => (
  // <div className="form-group">
  //   <strong>{props.rolename}</strong>
  //   <select
  //     className="form-control"
  //     name="role"
  //     onChange={props.onChange}
  //   >
  <React.Fragment>
    {/* <option defaultValue>Select {props.name}</option> */}
    <option value=""></option>
    {props.options.map((item, index) => (
      <option key={index} value={item.id}>
        {item.roleName}
      </option>
    ))}
  </React.Fragment>
  //   </select>
  // </div>
)

export default class UserRolesListDropDown extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      collection: [],
      value: '',
    }
  }
  componentDidMount()
  {
    const baseUrl = `${process.env.REACT_APP_API_URL}/user`;

    fetch(`${baseUrl}/GetUserRoles`)
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res }))
  }
  onChange = (event) =>
  {
    this.setState({ value: event.target.value })
  }
  render()
  {
    return (
      // <div className="container mt-4">
      //   <h2>React Dropdown List with Bootstrap Example</h2>
      <UserRolesDropdown
        name={this.state.rolename}
        options={this.state.collection}
        onChange={this.onChange}
      />
      // </div>
    )
  }
}