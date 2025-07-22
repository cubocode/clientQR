import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "react-bootstrap";
import { FaPrint } from "react-icons/fa";

const QRProducto = ({ qrValue }) => {
  const qrRef = useRef();

  const handlePrint = () => {
    const svg = qrRef.current?.outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir QR</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: Arial, sans-serif; }
            .qr-container { text-align: center; padding: 20px; background: white; border-radius: 10px; }
            h4 { color: #006a9d; margin-bottom: 15px; }
            p { color: #666; margin-top: 15px; }
            @media print { body { padding: 20px; } .qr-container { box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h4>QR del Producto</h4>
            <div>${svg}</div>
            <p>Escanea este código QR para ver la información del producto y su dueño</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <QRCodeSVG
        ref={qrRef}
        value={qrValue}
        size={120}
        level="H"
        includeMargin={true}
        bgColor={"#ffffff"}
        fgColor={"#006a9d"}
      />
      <Button
        variant="outline-primary"
        size="sm"
        onClick={handlePrint}
        style={{ marginTop: 8, borderRadius: 8, padding: '4px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <FaPrint /> Imprimir QR
      </Button>
    </div>
  );
};

export default QRProducto; 