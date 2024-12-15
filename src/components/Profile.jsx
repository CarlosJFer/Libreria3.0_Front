import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/usersSlice";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import Favorites from "./Favorites";

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
        <h1>Hola {userData?.name}</h1>
      <ProfileForm userData={userData} />
      <hr />
      <Favorites favorites={userData?.favorites} />
    </Container>
  );
}

export default Profile;