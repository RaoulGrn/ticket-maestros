import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col} from "react-bootstrap";

const MyComponent = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token')).jwt || null;
            const response = await axios.get('http://localhost:8080/admin/users',{
                headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() =>{
        fetchData();

    },[])



    return (
        <div className="userinfo-container m-5 p-5">
            <span className="text-success">Admin Panel</span>

            <table className="table table-dark mt-5">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>
                            <Button
                                className="bg-danger border-danger"
                                onClick={async () => {
                                    try {
                                        const token =
                                            JSON.parse(localStorage.getItem("token")).jwt || null;

                                        const response = await axios.delete(
                                            `http://localhost:8080/user/${user.userId}`,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        );
                                        console.log(response.data);
                                        setData(response.data);
                                        window.location.reload(false);
                                    } catch (error) {
                                        console.error("Error fetching data:", error);
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyComponent;
