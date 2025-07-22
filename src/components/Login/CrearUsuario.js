import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import avatar from "../../Assets/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordField from "./PasswordField";

function CrearUsuario() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    confirmarContrasenia: "",
    domicilio: "",
    pais: "",
    provincia: "",
    localidad: "",
    codigoPostal: "",
    telefono: "",
    foto: null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: null,
    message: ""
  });
  const [previewFoto, setPreviewFoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData({ ...formData, foto: files[0] });
      setPreviewFoto(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (formData.contrasenia && formData.confirmarContrasenia) {
      if (formData.contrasenia === formData.confirmarContrasenia) {
        setPasswordValidation({
          isValid: true,
          message: "Las contraseñas coinciden"
        });
      } else {
        setPasswordValidation({
          isValid: false,
          message: "Las contraseñas no coinciden"
        });
      }
    } else {
      setPasswordValidation({
        isValid: null,
        message: ""
      });
    }
  }, [formData.contrasenia, formData.confirmarContrasenia]);

  const handleNext = (e) => {
    e.preventDefault();
    // Validación básica del paso 1
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.contrasenia || !formData.confirmarContrasenia) {
      setError("Completa todos los campos del paso 1");
      return;
    }
    if (!passwordValidation.isValid) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica del paso 2
    if (!formData.domicilio || !formData.pais || !formData.provincia || !formData.localidad || !formData.codigoPostal || !formData.telefono || !formData.foto) {
      setError("Completa todos los campos del paso 2");
      return;
    }

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === "foto" && formData.foto) {
          dataToSend.append("foto", formData.foto);
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:3001/usuarios/", dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al crear el usuario");
    }
  };

  const renderStep1 = () => (
    <Form onSubmit={handleNext}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label style={{ display: "flex", textAlign: "left" }}>
              Nombre
            </Form.Label>
            <Form.Control 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required 
              disabled={success}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label style={{ display: "flex", textAlign: "left" }}>
              Apellido
            </Form.Label>
            <Form.Control 
              type="text" 
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required 
              disabled={success}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
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
              disabled={success}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <PasswordField
            label="Contraseña"
            name="contrasenia"
            value={formData.contrasenia}
            onChange={handleChange}
            required
            disabled={success}
            isValid={passwordValidation.isValid}
            validationMessage={passwordValidation.message}
          />
        </Col>
        <Col md={6}>
          <PasswordField
            label="Repetir contrasenia"
            name="confirmarContrasenia"
            value={formData.confirmarContrasenia}
            onChange={handleChange}
            required
            disabled={success}
            isValid={passwordValidation.isValid}
            validationMessage={passwordValidation.message}
          />
        </Col>
      </Row>
      <Button 
        variant="primary" 
        type="submit" 
        className="w-100"
        disabled={success || !passwordValidation.isValid}
      >
        Siguiente
      </Button>
    </Form>
  );

  const renderStep2 = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          Domicilio
        </Form.Label>
        <Form.Control 
          type="text" 
          name="domicilio"
          value={formData.domicilio}
          onChange={handleChange}
          required 
          disabled={success}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          País
        </Form.Label>
        <Form.Control 
          type="text" 
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          required 
          disabled={success}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          Provincia
        </Form.Label>
        <Form.Control 
          type="text" 
          name="provincia"
          value={formData.provincia}
          onChange={handleChange}
          required 
          disabled={success}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          Localidad
        </Form.Label>
        <Form.Control 
          type="text" 
          name="localidad"
          value={formData.localidad}
          onChange={handleChange}
          required 
          disabled={success}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          Código postal
        </Form.Label>
        <Form.Control 
          type="text" 
          name="codigoPostal"
          value={formData.codigoPostal}
          onChange={handleChange}
          required 
          disabled={success}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          Número de teléfono
        </Form.Label>
        <Form.Control 
          type="text" 
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required 
          disabled={success}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "flex", textAlign: "left" }}>
          Foto de perfil
        </Form.Label>
        <Form.Control 
          type="file" 
          name="foto"
          accept="image/*"
          onChange={handleChange}
          required
          disabled={success}
        />
        {previewFoto && (
          <img src={previewFoto} alt="preview" style={{ width: 120, height: 120, marginTop: 10, objectFit: "cover", borderRadius: "50%" }} />
        )}
      </Form.Group>
      <Row>
        <Col md={6}>
          <Button variant="secondary" onClick={handleBack} className="w-100" disabled={success}>
            Atrás
          </Button>
        </Col>
        <Col md={6}>
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={success}
          >
            Crear usuario
          </Button>
        </Col>
      </Row>
    </Form>
  );

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
            <Card.Title className="text-center mb-4">Crear usuario</Card.Title>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && (
              <div className="alert alert-success">
                ¡Usuario creado exitosamente! Redirigiendo al login...
              </div>
            )}
            {step === 1 ? renderStep1() : renderStep2()}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default CrearUsuario;
