import { useState } from "react";
     
const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
      password: "",
      confirmPassword:"",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Guardado con éxito");
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mi Perfil</h2>
      <form>
      <label className="profile-label">
        Nombre:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border rounded shadow-s bg- #ffffff"
        />
      </label>
      <label className="profile-label">
        Correo:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border rounded shadow-s bg- #ffffff"
        />
      </label>
      <label className="profile-label">
        Teléfono:
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border rounded shadow-s bg- #ffffff"
        />
      </label>
      <label className="profile-label">
        Username:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border rounded shadow-s bg- #ffffff"
        />
      </label>
      
        <label className="profile-label">
        Password:
        <input
          type="text"
          name="Password"
          value={user.password}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border rounded shadow-s bg- #ffffff"
        />
        </label>
        <label className="profile-label">
        Confirm Password:
        <input
          type="text"
          name="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border rounded shadow-s bg- #ffffff"
        />
        </label>
        </form>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 border rounded shadow-s bg-  #003366;"
        >
          Editar
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="p-2 border rounded shadow-s bg-  #003366;"
        >
          Guardar
        </button>
      )}
    </div>
  );
};

export default Profile;


