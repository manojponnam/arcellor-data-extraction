// arcelor-backend/src/validation/applicationSchema.js
const { z } = require('zod');

// Zod schema for server-side validation
const applicationSchema = z.object({
  // OCR Metadata (optional)
  _ocrSuccess: z.boolean().optional(),
  _ocrTimestamp: z.string().optional(),
  _ocrError: z.string().optional(),

  // ===== STEP 1: REQUEST DATA =====
  CENTRO: z.string().min(1, "Centro is required").optional(),
  FECHA_SOLICITUD_ALTA: z.string().optional(),
  FECHA_RECEPCION: z.string().optional(),
  CANAL: z.string().optional(),
  SECTOR: z.string().optional(),
  NO_PROVEEDOR: z.string().optional(),
  COND_PAGO_PROV: z.string().optional(),
  DADO_DE_ALTA_COMO_PROVEEDOR: z.string().optional(),
  ABIERTO_COMO_CLIENTE: z.boolean().default(false),
  CENTRO_ORIGEN: z.string().optional(),

  // ===== STEP 2: GENERAL DATA =====
  NUMERO_CLIENTE: z.string().optional(),
  NOMBRE: z.string().min(1, "Company name is required"),
  CIF: z.string().min(1, "CIF/VAT ID is required"),
  CONCEPTO_BUSQUEDA: z.string().optional(),
  RAMO: z.string().optional(),
  CALLE: z.string().optional(),
  NUMERO: z.string().optional(),
  COD_POSTAL: z.string().optional(),
  POBLACION: z.string().optional(),
  REGION: z.string().optional(),
  PAIS: z.string().optional(),
  APDO_CORREOS: z.string().optional(),
  POBL_APDO: z.string().optional(),
  COD_APDO: z.string().optional(),
  IDIOMA: z.string().optional(),
  TIPO_CLIENTE: z.string().optional(),
  PERSONA_CONTACTO_ENVIO_FACTURA_EMAIL: z.string().optional(),
  EMAIL_ENVIO_FACTURA: z.string().email("Invalid email").optional().or(z.literal('')),
  TELEFONO_1: z.string().optional(),
  NOMBRE_PERSONA_CONTACTO: z.string().optional(),
  APELLIDO: z.string().optional(),
  TELEFONO: z.string().optional(),
  EMAIL_PERSONA_CONTACTO: z.string().email("Invalid email").optional().or(z.literal('')),
  TEXTOS_INFORMATIVOS: z.string().optional(),
  CODIGO_IBAN: z.string().optional(),
  HORARIO_DE_DESCARGA: z.string().optional(),
  PERSONA_CONTACTO: z.string().optional(),

  // ===== STEP 3: SALES AREA DATA =====
  GRUPO_VENDEDORES: z.string().optional(),
  OFICINA_VENTAS: z.string().optional(),
  MONEDA: z.string().default("EUR"),
  COND_EXP: z.string().optional(),
  ZONA_DE_VENTAS: z.string().optional(),
  INCOTERM: z.string().optional(),
  CALENDARIO_FACTURACION: z.string().optional(),
  VALORACION_PORTES: z.string().optional(),
  TIPO_FACTURACION: z.string().optional(),
  CERTIFICADOS: z.string().optional(),
  FACT_EMAIL: z.string().email("Invalid email").optional().or(z.literal('')),
  CLASE_ABC: z.string().optional(),
  PROCEDIMIENTO_RECLAMACION: z.string().optional(),
  E_MAIL_RECLAMACION: z.string().email("Invalid email").optional().or(z.literal('')),

  // ===== STEP 4: RECIPIENTS =====
  DESTINATARIO_MERCANCIA_NOMBRE: z.string().optional(),
  DESTINATARIO_MERCANCIA_CALLE: z.string().optional(),
  DESTINATARIO_MERCANCIA_NUMERO: z.string().optional(),
  DESTINATARIO_MERCANCIA_COD_POSTAL: z.string().optional(),
  DESTINATARIO_MERCANCIA_POBLACION: z.string().optional(),
  DESTINATARIO_MERCANCIA_PAIS: z.string().optional(),
  DESTINATARIO_FACTURA_NOMBRE: z.string().optional(),
  DESTINATARIO_FACTURA_CALLE: z.string().optional(),
  DESTINATARIO_FACTURA_NUMERO: z.string().optional(),
  DESTINATARIO_FACTURA_COD_POSTAL: z.string().optional(),
  DESTINATARIO_FACTURA_POBLACION: z.string().optional(),
  DESTINATARIO_FACTURA_PAIS: z.string().optional(),

  // ===== STEP 5: FINANCIAL CONDITIONS =====
  V_PAGO: z.string().optional(),
  COND_PAGO: z.string().optional(),
  FORMA_PAGO: z.string().optional(),
  DESCUENTO_PP: z.string().optional(),
  GASTOS_FIN: z.string().optional(),
  DIAS_MEDIOS_PAGO: z.string().optional(),
  VENTAS_ESTIMADAS_ANO_EUROS: z.string().optional(),
  VENTAS_LIMITADAS_EUROS: z.string().optional(),
  CREDITO_SOLICITADO_EUROS: z.string().optional(),
  LIMITE_CREDITO: z.string().optional(),
  OBSERVACIONES_FINANCIERAS: z.string().optional(),

  // ===== STEP 6: APPROVED CONDITIONS =====
  CREDITO_CONCEDIDO_EUROS: z.string().optional(),
  DPP_OFICIAL: z.string().optional(),
  G_FINANCIERO_OFICIAL: z.string().optional(),
  FECHA_APROBACION: z.string().optional(),
  APROBADO_POR: z.string().optional(),
  ESTADO_APROBACION: z.string().default("pending"),
  NOTAS_APROBACION: z.string().optional(),
});

module.exports = { applicationSchema };



