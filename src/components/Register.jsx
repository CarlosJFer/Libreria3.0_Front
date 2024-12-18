import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "name":
        if (value.length < 3) error = "El nombre debe tener al menos 3 caracteres.";
        break;
      case "username":
        if (value.length < 3) error = "El nombre de usuario debe tener al menos 3 caracteres.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "El correo electrónico no es válido.";
        break;
      case "password":
        if (!/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(value)) {
          error =
            "La contraseña debe tener al menos 7 caracteres, incluyendo una mayúscula, una minúscula y un número. No se permiten espacios.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validar antes de enviar al servidor
    if (Object.values(errors).some((error) => error)) {
      alert("Por favor, corrige los errores antes de enviar.");
      return;
    }
    try {
      await axios.post("https://libreriaback.onrender.com/api/auth/register", {
        name,
        username,
        email,
        password,
      });
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <div
            className="card shadow border border-secondary rounded"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          >
            <div className="card-body p-5">
              <h2 className="text-center mb-4 text-white">Registrarse</h2>
              <form onSubmit={handleRegister}>
                {/* Nombre */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    placeholder="Nombre Completo"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      validateField("name", e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="name">Nombre Completo</label>
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                {/* Nombre de Usuario */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    id="username"
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      validateField("username", e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="username">Nombre de Usuario</label>
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                {/* Correo Electrónico */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateField("email", e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="email">Correo Electrónico</label>
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                {/* Contraseña */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validateField("password", e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="password">Contraseña</label>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-secondary w-100 py-2">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;