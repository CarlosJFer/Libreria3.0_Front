import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/usersSlice";
import { Container, Tab, Tabs, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import Favorites from "./Favorites";
import avatarUsuario from "../assets/coolUser100.jpg";

function Profile() {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const { id: userId } = useParams();


    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirige al login si no hay un token
    } else {
      dispatch(fetchUserData(userId)); // Obtiene datos del usuario
    }
  }, [dispatch, navigate, userId]);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error}</p>;

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
      <ProfileForm userData={userData} />
      </Tab>
      <Tab eventKey="favorites" title="Mis Favoritos">
      <Favorites favorites={userData?.favorites} />
      </Tab>
      </Tabs>
    </Container>
  );
}

export default Profile;