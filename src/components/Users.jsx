import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../redux/usersSlice";
import { useEffect, useState } from "react";

function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios("https://libreriaback.onrender.com/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => dispatch(getUsers(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handlerDelete = (_id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      axios
        .delete(`https://libreriaback.onrender.com/api/users/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          dispatch(deleteUser(_id));
        })
        .catch((err) => {
          console.error(err);
          alert("Error al eliminar el usuario del servidor.");
        });
    }
  };

  const handlerEdit = (user) => {
    navigate(`/user-form/${user._id}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Gestión de Usuarios</h2>
          <Link to="/user-form" className="btn btn-light">
            <i className="fas fa-plus me-2"></i>Nuevo Usuario
          </Link>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar usuarios por nombre o email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-gray">
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="">
                          {user.role === "admin" ? "Administrador" : "Usuario"}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <button
                            onClick={() => handlerEdit(user)}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handlerDelete(user._id)}
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-muted">
          Total de usuarios: {filteredUsers.length}
        </div>
      </div>
    </div>
  );
}

export default Users;