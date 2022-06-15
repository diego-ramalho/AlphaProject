import React, { useState } from 'react';

import axios from 'axios';

const instance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://localhost:7060/api'
});

type User = {
    name: string;
    publisher: string;
}

export default class GetAllUsers extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        //axios.get(`https://jsonplaceholder.typicode.com/posts`)
        instance.get(`/User/GetUsers`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }

    render() {
        return (
            <ul>
                {this.state.users.map((user: User) => <li>{user.name}</li>)}
            </ul>
        )
    }
}

export const PostTest = async (_email: string, _password: string) => {

    //const [data,setData]=useState();

    // const params = {
    //     email: _email,
    //     password: _password
    // };

    let teste = await instance.post(`/User/login`, {
        "email": _email,
        "password": _password
    });

    return teste.data;

    // .then(function(response){
    //     console.log(response)
    //     return response;
    //   });
}

export const GetTest = async () => {

    let teste = await instance.get(`/GetUsers`);

    return teste.data;
}