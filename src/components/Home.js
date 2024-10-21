// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { getLoggedInUser } from './functionLib'; // Import the utility function
import Profile from './Profile';


const Home = () => {
  const [user, setUser] = useState(getLoggedInUser); // Use the utility function


  return (
    <div>
      {user.role === 'admin' && (
        <h1>Welcome Admin!</h1>
      )}
      {user.role === 'student' && (
        <div>
          <Profile user={user} />
        </div>
      )}
      {!user?.role && (
        <h1>Welcome Guest!</h1>
      )}
    </div>
  );
};

export default Home;
//testing
 