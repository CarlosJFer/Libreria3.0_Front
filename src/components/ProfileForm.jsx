import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ProfileForm ({ userData, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userData,
    mode: "onChange", // Validación en tiempo real
    shouldFocusError: true, // Enfoca el primer error
  });

   // Almacenar los datos iniciales en el formulario
  const enableEditing = () => {
    reset(userData); // Resetea el formulario con los datos actuales
    setIsEditing(true); // Activar edición
  };

  // Enviar datos al componente padre
  const onSubmit = (data) => {
    onSave?.(data); // Llama al callback pasado desde el componente padre, solo si está definido
    setIsEditing(false); // Desactivar edición
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mi Perfil</h2>
      {!isEditing && ( // Botón Editar fuera del formulario
        <button
          type="button"
          onClick={enableEditing}
          className="btn btn-primary mb-4"
        >
          Editar
        </button>
      )}
      <div className="row justify-content-center">
      <div className="col-md-6">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            disabled={!isEditing}
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

        <div className="mb-3">
        <label className="form-label">Correo:</label>
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
            className="form-control"
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        
        <div className="mb-3">
        <label className="form-label">Teléfono:</label>
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
            className="form-control"
          />
          {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>
        
        <div className="mb-3">
        <label className="form-label">Contraseña:</label>
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
            className="form-control"
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        
        <div className="mb-3">
        <label className="form-label">Confirmar contraseña:</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Debe confirmar su contraseña",
              validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
            })}
            disabled={!isEditing}
            className="form-control"
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        {isEditing && ( // Mostrar el botón Guardar solo en modo edición
          <button
            type="submit"
            className="btn btn-success">
            Guardar
          </button>
        )}
      </form>
    </div>
    </div>
    </div>
  );
};

// Agregar validaciones de props con PropTypes
ProfileForm.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  onSave: PropTypes.func,
};

// Valores predeterminados de las props
ProfileForm.defaultProps = {
  userData: {}, // Asegura que userData nunca sea undefined
  onSave: null,
};

export default ProfileForm;