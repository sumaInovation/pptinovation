// import React, { useState } from 'react';
// import { jwtDecode } from 'jwt-decode'
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleContext } from '../../Context/GoogleAuthContext';

// const SignupPage = () => {
   
//   const { handleLoginSuccess, handleLoginFailure, userData, handleLogout } = useGoogleContext();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
// const [newtoken,setnewtoken]=useState('no token')
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('User Signed Up:', formData);
//     // Handle traditional signup here
//   };
//   const getProfiledta=async()=>{
//      axios.get('https://googlesheet-yuetcisb.b4a.run/profile',{
//       withCredentials: true, // Send cookies or credentials with the request
//      }).then(res=>{

//            console.log(res.data)
//            setnewtoken(res.data.token)
             
//              }). catch (error=> {
//         console.log('error data fetching');
//   })
// }

   

//   return (
//     <div className='my-[80px] text-white'>
//    <button onClick={getProfiledta}>press</button>
//     <p>{newtoken}</p>
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         { !userData && <div>
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

//         {/* Google Login Button */}
//          <div className="mb-4">
//           <GoogleLogin
//             onSuccess={handleLoginSuccess}
//             onError={handleLoginFailure}
//             useOneTap
          
//           />
//         </div>

//         <div className="text-center mb-6">
//           <p className="text-gray-500">or</p>
//         </div>
//         </div>
// }
//         {/* Traditional Signup Form */}
//      {!userData &&    <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>}

//         {/* Google User Information (if logged in via Google) */}
//         {userData && (
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">WELCOME</p>
//             <p className="font-semibold">{userData.name}</p>
//             <p className="font-semibold">You are{userData.role}</p>
            
//             <img src={userData.picture} alt="profile" className="w-16 h-16 rounded-full mx-auto mt-2" />
//             <button
//               onClick={handleLogout}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//             >
//               Log out
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SignupPage




import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [cookieName, setCookieName] = useState('');
    const [cookieValue, setCookieValue] = useState('');
    const [retrievedCookie, setRetrievedCookie] = useState('');

    // Function to set a cookie
    const handleSetCookie = async () => {
      alert('set cookies')
        try {
            const response = await axios.post(
                'https://googlesheet-yuetcisb.b4a.run/set-cookie',
                { name: cookieName, value: cookieValue },
                { withCredentials: true } // Allow cookies
            );
            console.log(response.data.message);
        } catch (error) {
            console.error('Error setting cookie:', error.response.data);
        }
    };

    // Function to get a cookie
    const handleGetCookie = async () => {
     
        try {
            const response = await axios.get(
                `https://googlesheet-yuetcisb.b4a.run/get-cookie?name=${cookieName}`,
                { withCredentials: true } // Include cookies
            );
            alert('get cookiess')
            setRetrievedCookie(response.data.value);
        } catch (error) {
            console.error('Error retrieving cookie:', error.response.data);
            
        }
    };

    return (
        <div className='mt-[80px] text-white'>
            <h1>Cookie Management with React and Node.js</h1>

            <div className='m-3'>
                <h3 className='m-3'>Set a Cookie</h3>
                <input
                    type="text"
                    placeholder="Cookie Name"
                    value={cookieName}
                    onChange={(e) => setCookieName(e.target.value)}
                 className='text-black m-3 p-3 rounded-md' />
                <input
                    type="text"
                    placeholder="Cookie Value"
                    value={cookieValue}
                    onChange={(e) => setCookieValue(e.target.value)}
                    className='text-black m-3 p-3 rounded-md' />
                <button onClick={handleSetCookie} className='text white bg-green-400 m-3 p-3 rounded-lg'>Set Cookie</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Get a Cookie</h3>
                
                <button onClick={handleGetCookie} className='text white bg-green-400 m-3 p-3 rounded-lg'>Get Cookie</button>
                {retrievedCookie && (
                    <p className='text-white'>
                        Retrieved Cookie: <strong>{retrievedCookie}</strong>
                    </p>
                )}
            </div>
        </div>
    );
};

export default App;
