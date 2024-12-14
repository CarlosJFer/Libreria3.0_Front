import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
 // const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario ha iniciado sesión
  const { userId } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validación en tiempo real
    shouldFocusError: true, // Enfoca el primer error
    // defaultValues: {
    //   name: "",
    //   email: "",
    //   phone: "",
    //   username: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  // Verificar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirige a la página de login si no hay token
    } else {
      //setIsLoggedIn(true);
      fetchUserData(); // Obtener los datos del usuario
    }
  }, [navigate, fetchUserData]);

  // Simular datos obtenidos de la API
      const fetchUserData = useCallback(async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("Error al obtener los datos del usuario");
        const data = await response.json();
        reset({
          name: data.name,
          email: data.email,
          phone: data.phone,
          username: data.username,
          password: "",
          confirmPassword: "",
        })
      } catch (error) {
        console.error(error);
      }
    }, [userId, reset]);
         
        // Mapeamos los datos a los campos del formulario
        //  const userData = {
        //   name: data.name,
        //   email: data.email,
        //   phone: data.phone,
        //   username: data.username,
        //   password: "",
        //   confirmPassword: "",
        // };

    //     reset(userData); // Cargar los datos en el formulario
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

   // Guardar datos del formulario
  const onSubmit = (data) => {
    alert("Datos guardados con éxito:\n" + JSON.stringify(data, null, 2));
    setIsEditing(false); // Cambiar a modo "vista" después de guardar
  };

  const enableEditing = () => {
    setIsEditing(true); // Activar edición
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mi Perfil</h2>
      {!isEditing && ( // Botón Editar fuera del formulario
        <button
          type="button"
          onClick={enableEditing}
          className="p-2 border rounded shadow-s bg-#003366 mb-4"
        >
          Editar
        </button>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="profile-label">
          Nombre:
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            disabled={!isEditing}
            className="p-2 border rounded shadow-s bg-#ffffff"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </label>
        <br />
        <label className="profile-label">
          Correo:
          <input
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Correo inválido",
              },
            })}
            disabled={!isEditing}
            className="p-2 border rounded shadow-s bg-#ffffff"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </label>
        <br />
        <label className="profile-label">
          Teléfono:
          <input
            type="text"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              minLength: {
                value: 10,
                message: "El teléfono debe tener al menos 10 dígitos",
              },
            })}
            disabled={!isEditing}
            className="p-2 border rounded shadow-s bg-#ffffff"
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
        </label>
        <br />
        <label className="profile-label">
          Usuario:
          <input
            type="text"
            {...register("username", { required: "El usuario es obligatorio" })}
            disabled={!isEditing}
            className="p-2 border rounded shadow-s bg-#ffffff"
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        </label>
        <br />
        <label className="profile-label">
          Contraseña:
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            disabled={!isEditing}
            className="p-2 border rounded shadow-s bg-#ffffff"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </label>
        <br />
        <label className="profile-label">
          Confirmar contraseña:
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Debe confirmar su contraseña",
              validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
            })}
            disabled={!isEditing}
            className="p-2 border rounded shadow-s bg-#ffffff"
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </label>
        <br />
        {isEditing && ( // Mostrar el botón Guardar solo en modo edición
          <button
            type="submit"
            className="p-2 border rounded shadow-s bg-#003366">
            Guardar
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
