import React, { useState } from 'react';

const UserSignup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [Cnumber, setCNumber] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Password and Confirm Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Further processing (e.g., API call)
    console.log({
      username,
      email,
      password,
      city,
      Cnumber,
      streetAddress,
    });

    // Reset form and error
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCity('');
    setCNumber('');
    setStreetAddress('');
    setError('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input
            type="text"
            id="number"
            value={Cnumber}
            onChange={(e) => setCNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            type="text"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default UserSignup;

