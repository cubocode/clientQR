import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Carousel, Tabs, Tab, Card, Button } from "react-bootstrap";
import laptopImg from "../../Assets/about.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from "../../context/AuthContext";
import { FaPrint } from 'react-icons/fa';
import "../../Styles/producto.css";

function Producto() {
  const { user } = useAuth();
  const [key, setKey] = useState('nuevo');
  const [tipo, setTipo] = useState("objeto");
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    color: "#000000",
    antiguedad: "",
    estado: "",
    medidas: "",
    descripcion: "",
    imagenes: []
  });

  const [formDataMascota, setFormDataMascota] = useState({
    tipoMascota: "",
    raza: "",
    nombre: "",
    edad: "",
    tamaño: "",
    color: "#000000",
    descripcion: "",
    imagenes: []
  });

  const [previewImages, setPreviewImages] = useState([]);

  // Obtener el userId del localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Verificar si hay userId
  useEffect(() => {
    if (!userId) {
      setError("No hay sesión activa. Por favor, inicia sesión.");
    }
  }, [userId]);

  // Cargar artículos al montar el componente
  useEffect(() => {
    if (userId) {
      cargarArticulos();
    }
  }, [userId]);

  const cargarArticulos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/productos/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setArticulos(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error completo:', err);
      setArticulos([]);
      setError(err.response?.data?.msg || "Error al cargar los artículos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeMascota = (e) => {
    const { name, value } = e.target;
    setFormDataMascota(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previewImages.length > 5) {
      alert("No puedes subir más de 5 imágenes");
      return;
    }

    const newImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newImages]);
    if (tipo === "objeto") {
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, ...files]
      }));
    } else {
      setFormDataMascota(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, ...files]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError("No hay sesión activa. Por favor, inicia sesión.");
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      // Agregar el userId y tipo
      formDataToSend.append("userId", userId);
      formDataToSend.append("tipo", tipo);
      
      // Determinar qué datos usar según el tipo
      const dataToSubmit = tipo === "objeto" ? formData : formDataMascota;
      
      // Agregar todos los campos al FormData
      Object.keys(dataToSubmit).forEach(key => {
        if (key !== "imagenes") {
          formDataToSend.append(key, dataToSubmit[key]);
        }
      });

      // Agregar las imágenes
      if (dataToSubmit.imagenes && dataToSubmit.imagenes.length > 0) {
        dataToSubmit.imagenes.forEach((imagen) => {
          formDataToSend.append("imagenes", imagen);
        });
      }

      const response = await axios.post(
        "http://localhost:3001/productos",
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Generar el valor del QR con la URL del perfil
      const qrUrl = `http://localhost:3000/perfil/${userId}`;
      setQrValue(qrUrl);
      setShowQR(true);

      // Limpiar el formulario
      setFormData({
        nombre: "",
        marca: "",
        color: "#000000",
        antiguedad: "",
        estado: "",
        medidas: "",
        descripcion: "",
        imagenes: []
      });
      setFormDataMascota({
        tipoMascota: "",
        raza: "",
        nombre: "",
        edad: "",
        tamaño: "",
        color: "#000000",
        descripcion: "",
        imagenes: []
      });
      setPreviewImages([]);
      setTipo("objeto");
      
      // Recargar la lista de artículos
      await cargarArticulos();
      
      // Cambiar a la pestaña de mis artículos
      setKey("mis-articulos");
      
      alert("Artículo creado exitosamente");
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.response?.data?.msg || "Error al crear el artículo");
    } finally {
      setLoading(false);
    }
  };

  const renderFormularioObjeto = () => (
    <>
      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>Nombre</Form.Label>
        <Form.Control 
          type="text" 
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>Marca</Form.Label>
        <Form.Control 
          type="text" 
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required 
        />
      </Form.Group>

      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Antigüedad</Form.Label>
            <Form.Select 
              name="antiguedad"
              value={formData.antiguedad}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="nuevo">Nuevo</option>
              <option value="menos_1">Menos de 1 año</option>
              <option value="1_2">1-2 años</option>
              <option value="2_5">2-5 años</option>
              <option value="mas_5">Más de 5 años</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Estado</Form.Label>
            <Form.Select 
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="excelente">Excelente</option>
              <option value="muy_bueno">Muy bueno</option>
              <option value="bueno">Bueno</option>
              <option value="regular">Regular</option>
              <option value="malo">Malo</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Medidas (cm)</Form.Label>
            <Form.Control 
              type="text" 
              name="medidas"
              value={formData.medidas}
              onChange={handleChange}
              placeholder="Ej: 15x20"
              pattern="[0-9]+x[0-9]+"
              required 
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Color</Form.Label>
            <Form.Control 
              type="color" 
              name="color"
              value={formData.color}
              onChange={handleChange}
              required 
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );

  const renderFormularioMascota = () => (
    <>
      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>¿Qué mascota es?</Form.Label>
        <Form.Select 
          name="tipoMascota"
          value={formDataMascota.tipoMascota}
          onChange={handleChangeMascota}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="ave">Ave</option>
          <option value="otro">Otro</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>Raza</Form.Label>
        <Form.Control 
          type="text" 
          name="raza"
          value={formDataMascota.raza}
          onChange={handleChangeMascota}
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>Nombre</Form.Label>
        <Form.Control 
          type="text" 
          name="nombre"
          value={formDataMascota.nombre}
          onChange={handleChangeMascota}
          required 
        />
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Edad</Form.Label>
            <Form.Control 
              type="text" 
              name="edad"
              value={formDataMascota.edad}
              onChange={handleChangeMascota}
              placeholder="Ej: 2 años"
              required 
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Tamaño</Form.Label>
            <Form.Select 
              name="tamaño"
              value={formDataMascota.tamaño}
              onChange={handleChangeMascota}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label style={{display: "flex", textAlign: "left"}}>Color</Form.Label>
            <Form.Control 
              type="color" 
              name="color"
              value={formDataMascota.color}
              onChange={handleChangeMascota}
              required 
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );

  const renderFormularioNuevo = () => (
    <Form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>¿Qué querés registrar?</Form.Label>
        <Form.Select 
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="objeto">Objeto</option>
          <option value="mascota">Mascota</option>
        </Form.Select>
      </Form.Group>

      {tipo === "objeto" ? renderFormularioObjeto() : renderFormularioMascota()}

      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>Descripción</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3}
          name="descripcion"
          value={tipo === "objeto" ? formData.descripcion : formDataMascota.descripcion}
          onChange={tipo === "objeto" ? handleChange : handleChangeMascota}
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{display: "flex", textAlign: "left"}}>Imágenes (máximo 5)</Form.Label>
        <Form.Control 
          type="file" 
          multiple
          accept="image/*"
          onChange={handleImageChange}
          required 
        />
      </Form.Group>

      {previewImages.length > 0 && (
        <Carousel className="mb-3">
          {previewImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Preview ${index + 1}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Continuar"}
      </Button>
    </Form>
  );

  const renderQR = () => {
    if (!showQR || !qrValue) return null;

    const handlePrint = () => {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir QR</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              .qr-container {
                text-align: center;
                padding: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              }
              h4 {
                color: #006a9d;
                margin-bottom: 15px;
              }
              p {
                color: #666;
                margin-top: 15px;
              }
              @media print {
                body {
                  padding: 20px;
                }
                .qr-container {
                  box-shadow: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h4>Tu QR Personal</h4>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                  ${document.querySelector('svg').innerHTML}
                </svg>
              </div>
              <p>Escanea este código QR para ver tu perfil</p>
            </div>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    };

    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        background: 'white',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h4 style={{ marginBottom: '15px', color: '#006a9d' }}>Tu QR Personal</h4>
        <div style={{ 
          display: 'inline-block',
          padding: '15px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <QRCodeSVG 
            value={qrValue}
            size={200}
            level="H"
            includeMargin={true}
            bgColor={"#ffffff"}
            fgColor={"#006a9d"}
          />
        </div>
        <p style={{ marginTop: '15px', color: '#666' }}>
          Escanea este código QR para ver tu perfil
        </p>
        <Button 
          variant="outline-primary" 
          onClick={handlePrint}
          style={{ 
            marginTop: '15px',
            borderRadius: '8px',
            padding: '8px 20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaPrint /> Imprimir QR
        </Button>
      </div>
    );
  };

  const renderMisArticulos = () => (
    <div>
      <h3>Mis artículos cargados</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Cargando artículos...</p>
      ) : Array.isArray(articulos) && articulos.length === 0 ? (
        <p>No hay artículos cargados</p>
      ) : (
        <>
          <Row>
            {articulos.map((articulo) => (
              <Col key={articulo.id} md={6} className="mb-4">
                <Card>
                  {articulo.imagenes && articulo.imagenes.length > 0 && (
                    <Carousel>
                      {articulo.imagenes.map((imagen, index) => (
                        <Carousel.Item key={index}>
                          <Card.Img 
                            variant="top" 
                            src={imagen} 
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}
                  <Card.Body>
                    <Card.Title>{articulo.nombre}</Card.Title>
                    <Card.Text>
                      <strong>Tipo:</strong> {articulo.tipo === "objeto" ? "Objeto" : "Mascota"}<br />
                      {articulo.tipo === "objeto" ? (
                        <>
                          <strong>Marca:</strong> {articulo.marca}<br />
                          <strong>Estado:</strong> {articulo.estado}<br />
                          <strong>Medidas:</strong> {articulo.medidas}
                        </>
                      ) : (
                        <>
                          <strong>Raza:</strong> {articulo.raza}<br />
                          <strong>Edad:</strong> {articulo.edad}<br />
                          <strong>Tamaño:</strong> {articulo.tamaño}
                        </>
                      )}
                      <br />
                      <strong>Descripción:</strong> {articulo.descripcion}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {renderQR()}
        </>
      )}
    </div>
  );

  return (
    <section>
      <Container fluid className="" id="home" style={{ minHeight: '100vh', paddingBottom: 60 }}>
        <Container className="home-content">
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
               
                paddingBottom: "50px",
              }}
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Gestión de <strong className="purple">artículos</strong>
              </h1>
              
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                
                
              >
                <Tab eventKey="nuevo" title="Cargar nuevo artículo">
                  {renderFormularioNuevo()}
                </Tab>
                <Tab eventKey="mis-articulos" title="Mis artículos">
                  {renderMisArticulos()}
                </Tab>
              </Tabs>
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "120px", paddingBottom: "50px" }}
              className="about-img"
            >
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Producto;
