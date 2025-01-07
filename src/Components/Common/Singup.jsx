// import React, { useState } from 'react';

// import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleContext } from '../../Context/GoogleAuthContext';

// const SignupPage = () => {
   
//   const { handleLoginSuccess, handleLoginFailure, userData, handleLogout } = useGoogleContext();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

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

//   return (
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
//   );
// };

// export default SignupPage;
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  
  const handlePostRequest = () => {
    axios.post('https://googlesheet-yuetcisb.b4a.run/userlogin', {
      key: 'value',  // Replace with your actual data
    })
      .then((response) => {
        setData(response.data);
        console.log('Success:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
   const getreq=async()=>{
    await axios.get('https://googlesheet-yuetcisb.b4a.run/getuserdata')  // Replace with your actual API URL
    .then((response) => {
     console.log(response)
    })
    .catch((err) => {
      alert(err);
    });
   }
  return (
    <div className='mt-[80px] text-white'>
      <button onClick={handlePostRequest} className='bg-green-300 rounded-lg m-3 p-3'>Send POST Request</button>
      <br/>
      <button onClick={getreq} className='bg-green-300 rounded-lg m-3 p-3'>Send GET Request</button>
      
    </div> 
  );
}

export default App;
