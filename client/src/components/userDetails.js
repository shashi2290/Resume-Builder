import React from 'react';
import './userDetails.css';

const UserDetails = ({readonly, user, setUser}) => { 
  return (
    <div>
      <form  autoComplete='off' className='form-style-info' action="">
        <div className="first-col ">
          <div>
            <label htmlFor="fName">First Name:</label>
            <span>
              <input
                readOnly={readonly}
                onChange={e => setUser({...user, fName: e.target.value})}
                type="text"
                id="fName"
                name="fName"
                value={user.fName}
              />
            </span>
          </div>

          <div>
            <label htmlFor="lName">Last Name:</label>
            <span>
              <input
                readOnly={readonly}
                onChange={e => setUser({...user, lName: e.target.value})}
                type="text"
                id="lName"
                name="lName"
                value={user.lName}
              />
            </span>
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <span>
              <input
                readOnly={readonly}
                onChange={e => setUser({...user, age: e.target.value})}
                type="text"
                id="age"
                name="age"
                value={user.age}
              />
            </span>
          </div>

          <div>
            <label htmlFor="currentProfile">Current profile:</label>
            <span>
              <input
                readOnly={readonly}
                onChange={e => setUser({...user, currentProfile : e.target.value})}
                type="text"
                id="currentProfile"
                name="currentProfile"
                value={user.currentProfile}
                
              />
            </span>
          </div>
        </div>

        <div className="second-col">
          <div>
            <label htmlFor="email">Email:</label>
            <span>
              <input
                readOnly={readonly}
                onChange={e => setUser({...user, email: e.target.value})}
                type="text"
                name="email"
                id="email"
                value={user.email}
              />
            </span>
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <span>
              <input
                readOnly={readonly}
                onChange={e => setUser({...user, phone: e.target.value})}
                type="text"
                name="phone"
                id="phone"
                value={user.phone}
              />
            </span>
          </div>

          
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
