/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import user from "../models/user";
import userService from '../service/UserService'


async function fetchData() {
    

    //let usersDataAPI = Array<user>;
    let users = await userService.findAllUsers()
    return users

    
  }

  
function home() {
    
    const [usersData, setUsersData] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData().then( (response) => {
            setUsersData(response.data)
        });
      },[]); 
    
    return ( 
        <div>

        </div>
     );
}


export default home;