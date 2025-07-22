import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import avatar from "../../Assets/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordField from "./PasswordField";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    contrasenia: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/usuarios/login", formData);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      login(response.data.user);
      navigate("/registro");
    } catch (err) {
      setError(err.response?.data?.msg || "Error al iniciar sesión");
    }
  };

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", marginTop: "80px" }}>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "calc(100vh - 80px)",
          padding: "20px",
          position: "relative"
        }}
      >
       {/* <Particle /> */}
        <Card
          className="project-card-view"
          style={{
            width: "500px",
            maxWidth: "90%",
            margin: "auto",
            position: "relative",
            zIndex: 1
          }}
        >
          <Card.Img
            variant="top"
            src={avatar}
            alt="card-img"
            style={{
              width: "200px",
              height: "200px",
              display: "block"
            }}
          />
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title className="text-center mb-4">Iniciar sesión</Card.Title>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ display: "flex", textAlign: "left" }}>
                  Correo electrónico
                </Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </Form.Group>
              <PasswordField
                label="Contraseña"
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleChange}
                required
              />
              <Button variant="primary" type="submit" className="w-100">
                Ingresar
              </Button>
              <p style={{ marginTop: "20px", textAlign: "center" }}>
                ¿No tienes cuenta?{" "}
                <span
                  style={{ color: "#026292", cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate("/crear-usuario")}
                >
                  Regístrate aquí
                </span>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Login;
