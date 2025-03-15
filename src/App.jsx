import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const baseurl = import.meta.env.VITE_REACT_APP_API_URL;

  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dumpData = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${baseurl}/newUser`, { name: name });
      toast.success('User added successfully');
      setName(''); // Clear input after successful submission
      console.log(res.data);
      // Refresh the user list
      // handleGetData(e, false);
    } catch (err) {
      toast.error('Error adding user');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetData = async (e, showToast = true) => {
    if (e) e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/getUsers`);
      if (showToast) toast.success('Data fetched successfully');
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      toast.error('Error fetching users');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.delete(`${baseurl}/deleteAll`);
      toast.success('All users deleted successfully');
      setData([]);
      console.log(res.data);
    } catch (err) {
      toast.error('Error deleting users');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <header className="app-header">
        <h1>User Management</h1>
      </header>

      <main className="app-main">
        <section className="card form-section">
          <h2>Add New User</h2>
          <form onSubmit={dumpData} className="add-user-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div className="input-group">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter user name"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="btn primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add User'}
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="card user-list-section">
          <div className="section-header">
            <h2>User List</h2>
            <div className="button-group">
              <button
                onClick={handleGetData}
                className="btn secondary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh List'}
              </button>
              <button
                onClick={handleDeleteAll}
                className="btn danger"
                disabled={loading}
              >
                Delete All
              </button>
            </div>
          </div>

          {data.length > 0 ? (
            <ul className="user-list">
              {data.map((item, index) => (
                <li key={index} className="user-item">
                  <span className="user-number">{index + 1}</span>
                  <span className="user-name">{item.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No users available. Add a user or refresh the list.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Developed by <strong>K Sriram</strong></p>
      </footer>
    </div>
  );
}

export default App;