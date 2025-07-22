import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";
import axios from "axios";
import { QRCodeSVG } from 'qrcode.react';

function ProductoPublico() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/productos/${id}`);
        setData(res.data);
      } catch (err) {
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}><Spinner animation="border" /></Container>;
  if (error || !data) return <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}><div className="text-danger">{error || "Producto no encontrado"}</div></Container>;

  const { producto, usuario } = data;

  return (
    <section>
      <Container fluid className="home-section" id="home" style={{ minHeight: '100vh', paddingBottom: 60 }}>
        <Container className="home-content">
          <Row className="justify-content-center">
            <Col md={8} lg={7}>
              <Card style={{ borderRadius: 24, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)", border: "none", padding: 0 }}>
                <Card.Body style={{ padding: 0 }}>
                  <div style={{
                    background: "linear-gradient(135deg, #006a9d 0%, #006a9d 100%)",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    padding: 32,
                    textAlign: "center"
                  }}>
                    <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: 0 }}>{producto.nombre}</h2>
                    <span style={{ color: "#e0e7ef", fontSize: 18 }}>{producto.tipo === "objeto" ? "Objeto" : "Mascota"}</span>
                  </div>
                  <div style={{ padding: 32, background: "#fff", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                    <Row>
                      <Col md={6} style={{ textAlign: 'center', marginBottom: 24 }}>
                        {producto.imagenes && producto.imagenes.length > 0 ? (
                          <Image src={producto.imagenes[0]} rounded style={{ width: 180, height: 180, objectFit: 'cover', marginBottom: 16 }} />
                        ) : (
                          <div style={{ width: 180, height: 180, background: '#eee', borderRadius: 16, margin: '0 auto 16px' }} />
                        )}
                        <div style={{ marginTop: 16 }}>
                          <QRCodeSVG value={producto.qr} size={120} level="H" includeMargin={true} bgColor="#fff" fgColor="#006a9d" />
                          <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>Escanea para ver este producto</div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <h5 style={{ color: '#006a9d', fontWeight: 700 }}>Detalles del producto</h5>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: 16 }}>
                          {producto.tipo === "objeto" ? (
                            <>
                              <li><b>Marca:</b> {producto.marca || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                              <li><b>Estado:</b> {producto.estado || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                              <li><b>Medidas:</b> {producto.medidas || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                              <li><b>Color:</b> <span style={{ background: producto.color, border: '1px solid #ccc', borderRadius: 4, padding: '0 8px', color: '#222' }}>{producto.color}</span></li>
                            </>
                          ) : (
                            <>
                              <li><b>Tipo:</b> {producto.tipoMascota}</li>
                              <li><b>Raza:</b> {producto.raza}</li>
                              <li><b>Edad:</b> {producto.edad}</li>
                              <li><b>Tamaño:</b> {producto.tamaño}</li>
                              <li><b>Color:</b> <span style={{ background: producto.color, border: '1px solid #ccc', borderRadius: 4, padding: '0 8px', color: '#222' }}>{producto.color}</span></li>
                            </>
                          )}
                          <li style={{ marginTop: 8 }}><b>Descripción:</b> {producto.descripcion}</li>
                        </ul>
                        <hr />
                        <h5 style={{ color: '#006a9d', fontWeight: 700 }}>Dueño</h5>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: 16 }}>
                          <li><b>Nombre:</b> {usuario.nombre} {usuario.apellido}</li>
                          <li><b>Email:</b> {usuario.email}</li>
                          <li><b>Teléfono:</b> {usuario.telefono || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                          <li><b>País:</b> {usuario.pais || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                          <li><b>Provincia:</b> {usuario.provincia || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                          <li><b>Localidad:</b> {usuario.localidad || <span style={{ color: '#bbb' }}>No especificado</span>}</li>
                        </ul>
                      </Col>
                    </Row>
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

export default ProductoPublico; 