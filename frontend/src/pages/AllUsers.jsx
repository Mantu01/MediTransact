import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import { toast } from 'react-toastify';
import { ErrorDisplay, LoadingSpinner, PageHeader, SearchBar, UsersTable } from '../components/allUsers/CommonComponents';
import UserForm from '../components/allUsers/UserForm';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    employeeCode: '',
    address: '',
    medicalCardNumber: '',
    balance: 0,
    role: 'user',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/api/user`, { withCredentials: true });
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users');
      setLoading(false);
      console.error('Error fetching users:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.medicalCardNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      return;
    }
    
    try {
      setIsDeleting(true);
      await axios.delete(`${config.API_URL}/api/user/${user._id}`, { withCredentials: true });
      // Remove the deleted user from the state
      setUsers(users.filter(u => u._id !== user._id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setIsUpdating(true);
      await axios.put(`${config.API_URL}/api/user/${selectedUser._id}`, selectedUser, { withCredentials: true });
      setUsers(users.map(u => u._id === selectedUser._id ? selectedUser : u));
      setIsEditModalOpen(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddUser = async () => {
    try {
      setIsAdding(true);
      const response = await axios.post(`${config.API_URL}/api/user`, newUser, { withCredentials: true });
      setUsers([...users, response.data.data]);
      setIsAddUserModalOpen(false);
      setNewUser({
        name: '',
        email: '',
        employeeCode: '',
        address: '',
        medicalCardNumber: '',
        balance: 0,
        role: 'user',
        password: ''
      });
      toast.success('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user');
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} retry={fetchUsers} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <PageHeader openAddUserModal={() => setIsAddUserModalOpen(true)} />
          
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <UsersTable 
            filteredUsers={filteredUsers} 
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
          />
          
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>
      </div>

      {isAddUserModalOpen && (
        <UserForm
          user={newUser}
          setUser={setNewUser}
          handleSubmit={handleAddUser}
          formTitle="Add New User"
          submitText="Create User"
          isProcessing={isAdding}
          closeModal={() => setIsAddUserModalOpen(false)}
          isAddForm={true}
        />
      )}

      {isEditModalOpen && selectedUser && (
        <UserForm
          user={selectedUser}
          setUser={setSelectedUser}
          handleSubmit={handleSaveEdit}
          formTitle="Edit User"
          submitText="Save Changes"
          isProcessing={isUpdating}
          closeModal={() => setIsEditModalOpen(false)}
          isAddForm={false}
        />
      )}
    </div>
  );
}

export default AllUsers;