import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaGlobe, FaMapMarkerAlt, FaCity, FaMailBulk } from "react-icons/fa";

function PerfilPublico() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/usuarios/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Error al cargar el perfil");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div>Cargando perfil...</div>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-danger">{error || "Perfil no encontrado"}</div>
      </Container>
    );
  }

  return (
    <section>
      <Container fluid className="home-section" id="home" style={{ minHeight: '100vh', paddingBottom: 60 }}>
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
                        marginBottom: 12
                      }}>
                        {user.foto ? (
                          <Image src={`http://localhost:3001/${user.foto}`} roundedCircle width={120} height={120} style={{ objectFit: "cover", border: "4px solid #fff" }} />
                        ) : (
                          <FaUser size={100} color="#006a9d" />
                        )}
                      </div>
                      <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: 0 }}>{user.nombre} {user.apellido}</h2>
                      <span style={{ color: "#e0e7ef", fontSize: 18 }}>{user.email}</span>
                    </div>
                  </div>
                  <div style={{ padding: 32, background: "#fff", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li style={itemStyle}><FaPhone style={iconStyle} /> <strong>Teléfono:</strong> <span style={valueStyle}>{user.telefono || <span style={{ color: '#bbb' }}>No especificado</span>}</span></li>
                      <li style={itemStyle}><FaHome style={iconStyle} /> <strong>Domicilio:</strong> <span style={valueStyle}>{user.domicilio || <span style={{ color: '#bbb' }}>No especificado</span>}</span></li>
                      <li style={itemStyle}><FaGlobe style={iconStyle} /> <strong>País:</strong> <span style={valueStyle}>{user.pais || <span style={{ color: '#bbb' }}>No especificado</span>}</span></li>
                      <li style={itemStyle}><FaMapMarkerAlt style={iconStyle} /> <strong>Provincia:</strong> <span style={valueStyle}>{user.provincia || <span style={{ color: '#bbb' }}>No especificado</span>}</span></li>
                      <li style={itemStyle}><FaCity style={iconStyle} /> <strong>Localidad:</strong> <span style={valueStyle}>{user.localidad || <span style={{ color: '#bbb' }}>No especificado</span>}</span></li>
                      <li style={itemStyle}><FaMailBulk style={iconStyle} /> <strong>Código Postal:</strong> <span style={valueStyle}>{user.codigoPostal || <span style={{ color: '#bbb' }}>No especificado</span>}</span></li>
                    </ul>
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

export default PerfilPublico; 