import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, updateUser } from "../redux/usersSlice";
import { AuthContext } from "./AuthContext";

function UserForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    username: "", // Añadir campo de nombre de usuario
    role: "user",
  });
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      axios
        .get(`https://libreriaback.onrender.com/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUserData(res.data))
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 401) {
            navigate("/login");
          }
        });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (id) {
        const response = await axios.put(
          `https://libreriaback.onrender.com/api/users/${id}`,
          userData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(updateUser(response.data));
      } else {
        const response = await axios.post(
          "https://libreriaback.onrender.com/api/users",
          userData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(createUser(response.data));
      }
      navigate("/users");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      if (error.response && error.response.status === 401) {
        alert("No tienes autorización para realizar esta acción");
        navigate("/login");
      } else {
        alert("Error al guardar el usuario");
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h2 className="text-center mb-0">
                {id ? "Editar Usuario" : "Crear Usuario"}
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre de usuario"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@email.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required={!id}
                    placeholder={
                      id
                        ? "Dejar en blanco si no desea cambiar"
                        : "Ingresa una contraseña"
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <select
                    className="form-control"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {id ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;