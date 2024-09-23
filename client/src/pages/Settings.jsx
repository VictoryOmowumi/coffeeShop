import React, { useState, useEffect } from 'react';
import { baseUrl } from '../baseUrl';
import tokenDecode from '../utils/tokenDecode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userDetails = tokenDecode();
  const yourAuthToken = localStorage.getItem('token'); // Adjust auth token handling

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${userDetails?.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourAuthToken}`
          }
        });

        console.log('response', response);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        setUserData({ name: result.name, email: result.email });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourAuthToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const result = await response.json();
        setAllUsers(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();

    if (userDetails.role === 'admin') {
      fetchAllUsers();
    }
  }, [yourAuthToken, userDetails.role, userDetails.userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/users/updateUserProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(userData),
      });

      

      const result = await response.json();
      toast.success('User updated successfully');
      console.log('User updated successfully:', result);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update user data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings p-5 ">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-coffee-light focus:border-coffee-light sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-coffee-light focus:border-coffee-light sm:text-sm"
          />
        </div>


      <div className="">
          <label  className="block text-sm font-medium text-gray-700">Role:</label>
          <input
            type="text"
            value={userDetails.role}
            disabled
            className="capitalize mt-1 block w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-coffee-light focus:border-coffee-light sm:text-sm"
          />
        </div>

      </div>
      <div className="flex justify-between">
      <div className=""></div>
        <button
          type="submit"
          className="w-max bg-coffee text-white py-2 px-4 rounded-md hover:bg-coffee-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-light"
        >
          Update
        </button>
      </div>
      </form>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {userDetails.role === 'admin' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className='text-left bg-coffee-light text-coffee-dark'>
                <th className='py-5 px-4 border-b border-gray-200 rounded-tl-md'>Staff Id</th>
                <th className="py-5 px-4 border-b ">Name</th>
                <th className="py-5 px-4 border-b">Email</th>
                <th className="py-5 px-4 border-b rounded-tr-md">Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <tr key={user._id}>
                  <td className="py-4 px-4 border-b">{user._id}</td>
                  <td className="py-4 px-4 border-b">{user.name}</td>
                  <td className="py-4 px-4 border-b">{user.email}</td>
                  <td className="py-4 px-4 border-b">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Settings;