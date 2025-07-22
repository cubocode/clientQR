import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Card, Image, Form, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaGlobe, FaMapMarkerAlt, FaCity, FaMailBulk, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Particle from "../Particle";

function MiPerfil() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user || {});
  const [fotoPreview, setFotoPreview] = useState(user?.foto ? `http://localhost:3001/${user.foto}` : null);
  const [fotoFile, setFotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    console.log("Usuario cargado en contexto:", user);
  }, [user]);

  if (!user) {
    return (
      <Container>
        <Row>
          <Col>
            <h2>No hay usuario logueado</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleEdit = () => {
    setForm(user);
    setEditMode(true);
    setSuccess(null);
    setError(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm(user);
    setFotoPreview(user?.foto ? `http://localhost:3001/${user.foto}` : null);
    setFotoFile(null);
    setSuccess(null);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Aquí deberías hacer el fetch/axios al backend para actualizar el usuario
      // Ejemplo:
      /*
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (fotoFile) formData.append('foto', fotoFile);
      const res = await fetch('http://localhost:3001/usuarios/update', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Error al actualizar');
      setUser(data.usuario);
      */
      // Simulación de éxito:
      setTimeout(() => {
        setUser({ ...user, ...form, foto: fotoFile ? fotoPreview : user.foto });
        setEditMode(false);
        setLoading(false);
        setSuccess('Perfil actualizado correctamente');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil');
      setLoading(false);
    }
  };

  return (
    <section>
      <Container fluid className="home-section" id="home" style={{ minHeight: '100vh', paddingBottom: 60 }}>
       {/* <Particle /> */}
        <Container className="home-content">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card style={{ borderRadius: 24, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)", border: "none", padding: 0 }}>
                <Card.Body style={{ padding: 0 }}>
                  <div style={{
                    background: "linear-gradient(135deg, #006a9d 0%, #006a9d 100%)",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    padding: 32,
                    textAlign: "center"
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)",
                        borderRadius: "50%",
                        background: "#fff",
                        padding: 6,
                        marginBottom: 12,
                        position: "relative"
                      }}>
                        {fotoPreview ? (
                          <Image src={fotoPreview} roundedCircle width={120} height={120} style={{ objectFit: "cover", border: "4px solid #fff" }} />
                        ) : (
                          <FaUser size={100} color="#006a9d" />
                        )}
                        {editMode && (
                          <Button
                            variant="light"
                            size="sm"
                            style={{ position: "absolute", bottom: 8, right: 8, borderRadius: "50%", padding: 6, boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
                            onClick={() => fileInputRef.current.click()}
                          >
                            <FaEdit color="#006a9d" />
                          </Button>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFotoChange}
                        />
                      </div>
                      {editMode ? (
                        <>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={form.nombre || ''}
                            onChange={handleChange}
                            style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, textAlign: "center" }}
                          />
                          <Form.Control
                            type="text"
                            name="apellido"
                            value={form.apellido || ''}
                            onChange={handleChange}
                            style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, textAlign: "center" }}
                          />
                          <Form.Control
                            type="email"
                            name="email"
                            value={form.email || ''}
                            onChange={handleChange}
                            style={{ fontSize: 18, marginBottom: 8, textAlign: "center" }}
                          />
                        </>
                      ) : (
                        <>
                          <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: 0 }}>{user.nombre} {user.apellido}</h2>
                          <span style={{ color: "#e0e7ef", fontSize: 18 }}>{user.email}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: 32, background: "#fff", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li style={itemStyle}><FaPhone style={iconStyle} /> <strong>Teléfono:</strong> {editMode ? <Form.Control type="text" name="telefono" value={form.telefono || ''} onChange={handleChange} style={inputInlineStyle} /> : <span style={valueStyle}>{user.telefono || <span style={{ color: '#bbb' }}>No especificado</span>}</span>}</li>
                      <li style={itemStyle}><FaHome style={iconStyle} /> <strong>Domicilio:</strong> {editMode ? <Form.Control type="text" name="domicilio" value={form.domicilio || ''} onChange={handleChange} style={inputInlineStyle} /> : <span style={valueStyle}>{user.domicilio || <span style={{ color: '#bbb' }}>No especificado</span>}</span>}</li>
                      <li style={itemStyle}><FaGlobe style={iconStyle} /> <strong>País:</strong> {editMode ? <Form.Control type="text" name="pais" value={form.pais || ''} onChange={handleChange} style={inputInlineStyle} /> : <span style={valueStyle}>{user.pais || <span style={{ color: '#bbb' }}>No especificado</span>}</span>}</li>
                      <li style={itemStyle}><FaMapMarkerAlt style={iconStyle} /> <strong>Provincia:</strong> {editMode ? <Form.Control type="text" name="provincia" value={form.provincia || ''} onChange={handleChange} style={inputInlineStyle} /> : <span style={valueStyle}>{user.provincia || <span style={{ color: '#bbb' }}>No especificado</span>}</span>}</li>
                      <li style={itemStyle}><FaCity style={iconStyle} /> <strong>Localidad:</strong> {editMode ? <Form.Control type="text" name="localidad" value={form.localidad || ''} onChange={handleChange} style={inputInlineStyle} /> : <span style={valueStyle}>{user.localidad || <span style={{ color: '#bbb' }}>No especificado</span>}</span>}</li>
                      <li style={itemStyle}><FaMailBulk style={iconStyle} /> <strong>Código Postal:</strong> {editMode ? <Form.Control type="text" name="codigoPostal" value={form.codigoPostal || ''} onChange={handleChange} style={inputInlineStyle} /> : <span style={valueStyle}>{user.codigoPostal || <span style={{ color: '#bbb' }}>No especificado</span>}</span>}</li>
                    </ul>
                    <div className="d-flex justify-content-end mt-4">
                      {editMode ? (
                        <>
                          <Button variant="success" className="me-2" onClick={handleSave} disabled={loading} style={{ borderRadius: 12, fontWeight: 600, minWidth: 110 }}>
                            {loading ? <Spinner animation="border" size="sm" /> : <><FaSave /> Guardar</>}
                          </Button>
                          <Button variant="secondary" onClick={handleCancel} style={{ borderRadius: 12, fontWeight: 600, minWidth: 110 }}>
                            <FaTimes /> Cancelar
                          </Button>
                        </>
                      ) : (
                        <Button variant="primary" onClick={handleEdit} style={{ borderRadius: 12, fontWeight: 600, minWidth: 110 }}>
                          <FaEdit /> Editar perfil
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

const itemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "16px 0",
  borderBottom: "1px solid #f0f0f0",
  fontSize: 18
};
const iconStyle = {
  marginRight: 12,
  color: "#006a9d",
  minWidth: 24
};
const valueStyle = {
  marginLeft: 8,
  fontWeight: 400
};
const inputInlineStyle = {
  display: "inline-block",
  width: "auto",
  minWidth: 120,
  marginLeft: 8,
  fontWeight: 400,
  fontSize: 16,
  borderRadius: 8,
  border: "1.5px solid #e0e7ef"
};

export default MiPerfil;
