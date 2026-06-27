import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RotaProtegida({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) return <p style={{ textAlign: "center", padding: "60px", fontFamily: "Montserrat, sans-serif" }}>Carregando...</p>;
  if (!session) return <Navigate to="/login" replace />;

  return <>{children}</>;
}