import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUser } from "../../redux/usersSlice";
import { AuthContext } from "../AuthContext";
import { Container, Tab, Tabs, Image, Card } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import Favorites from "./Favorites";
import avatarUsuario from "../../assets/coolUser100.jpg";
import './Profile.css'

function Profile() {
  const dispatch = useDispatch();
  // const { userData, loading, error } = useSelector((state) => state.users);
  const { user } = useContext(AuthContext); // Usuario autenticado desde el contexto
  const userData = useSelector((state) => state.users.userData); // Datos del usuario desde Redux
  // const navigate = useNavigate();
  // const { id: userId } = useParams();

   // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
   // Verificamos si ya tenemos datos en localStorage
   const storedUserData = localStorage.getItem("userData");
   if (storedUserData) {
     // Si existen, restauramos los datos en Redux
     dispatch({
       type: "users/fetchUserData/fulfilled",
       payload: JSON.parse(storedUserData),
     });
   } else if (user && user._id) {
     // Si no están en localStorage, obtenemos los datos desde la API
     dispatch(fetchUserData(user._id));
   }
  }, [dispatch, user]);

  console.log("userData:", userData);

  if (!userData) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras se carga la data
  }  

   return (
    <Container className="mt-5">
      <br />
      <div className="d-flex justify-content-center mb-3">
      <Image src={avatarUsuario} roundedCircle />
      </div>
      <Tabs
      defaultActiveKey="profileForm"
      id="uncontrolled-tab"
      className="mb-3"
    >
      <Tab eventKey="profileForm" title="Mi Perfil">
      <Card style={{ minHeight: '300px', backgroundColor: 'transparent', border: 'none' }}>
         {/* Pasa los datos del usuario a ProfileForm */}
      <ProfileForm userData={userData} onSave={(updatedData) => {
            // Lógica para guardar los cambios en el backend 
      }}/>
      </Card>
      </Tab>
      <Tab eventKey="favorites" title="Mis Favoritos">
      <Card style={{ minHeight: '300px', backgroundColor: 'transparent', border: 'none' }}>
      <Favorites favorites={userData?.favorites} />
      </Card>
      </Tab>
      </Tabs>
    </Container>
  );
}

export default Profile;