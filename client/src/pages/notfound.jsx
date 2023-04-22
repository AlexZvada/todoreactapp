import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = () => {
      setTimeout(() => {
        return navigate("/");
      }, 4000);
    };
    redirect();
  });
  return (
    <div className="not-found">
      <h1 className="title">Page is not found</h1>
      <p className="home">
        U will be redirected to home page in few seconds...
      </p>
    </div>
  );
};