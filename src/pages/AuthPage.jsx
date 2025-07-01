import { useParams } from 'react-router-dom';
import LoginForm from "../components/LoginForm/LoginForm.jsx";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm.jsx";

export default function AuthPage() {
  const { authType } = useParams();

  if (authType === 'login') {
    return <LoginForm />;
  }
  
  if (authType === 'register') {
    return <RegistrationForm />;
  }

  // Якщо authType не login і не register
  return <div>Invalid auth type</div>;
}