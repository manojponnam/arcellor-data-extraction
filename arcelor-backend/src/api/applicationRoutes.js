// arcelor-backend/src/api/applicationRoutes.js
const express = require('express');
const { z } = require('zod');
const prisma = require('../utils/db');
const logger = require('../utils/logger');
const { applicationSchema } = require('../validation/applicationSchema');

const router = express.Router();

/**
 * @route   POST /api/v2/submit-application
 * @desc    Validates and saves customer application to database
 * @access  Public (Phase 4 will add authentication)
 */
router.post('/submit-application', async (req, res) => {
  const startTime = Date.now();
  
  try {
    logger.info('📥 Application submission received', { 
      cif: req.body.CIF,
      nombre: req.body.NOMBRE 
    });

    // 1. Validate the incoming data with Zod
    const validatedData = applicationSchema.parse(req.body);
    logger.info('✅ Data validation passed');

    // 2. Map frontend field names to database field names
    const applicationData = {
      // OCR Metadata
      ocrSuccess: validatedData._ocrSuccess || false,
      ocrTimestamp: validatedData._ocrTimestamp ? new Date(validatedData._ocrTimestamp) : null,
      ocrError: validatedData._ocrError || null,

      // Step 1
      centro: validatedData.CENTRO,
      fechaSolicitudAlta: validatedData.FECHA_SOLICITUD_ALTA ? new Date(validatedData.FECHA_SOLICITUD_ALTA) : null,
      fechaRecepcion: validatedData.FECHA_RECEPCION ? new Date(validatedData.FECHA_RECEPCION) : null,
      canal: validatedData.CANAL,
      sector: validatedData.SECTOR,
      noProveedor: validatedData.NO_PROVEEDOR,
      condPagoProv: validatedData.COND_PAGO_PROV,
      dadoDeAltaComoProveedor: validatedData.DADO_DE_ALTA_COMO_PROVEEDOR,
      abiertoComoCliente: validatedData.ABIERTO_COMO_CLIENTE,
      centroOrigen: validatedData.CENTRO_ORIGEN,

      // Step 2
      numeroCliente: validatedData.NUMERO_CLIENTE,
      nombre: validatedData.NOMBRE,
      cif: validatedData.CIF,
      conceptoBusqueda: validatedData.CONCEPTO_BUSQUEDA,
      ramo: validatedData.RAMO,
      calle: validatedData.CALLE,
      numero: validatedData.NUMERO,
      codPostal: validatedData.COD_POSTAL,
      poblacion: validatedData.POBLACION,
      region: validatedData.REGION,
      pais: validatedData.PAIS,
      apdoCorreos: validatedData.APDO_CORREOS,
      poblApdo: validatedData.POBL_APDO,
      codApdo: validatedData.COD_APDO,
      idioma: validatedData.IDIOMA,
      tipoCliente: validatedData.TIPO_CLIENTE,
      personaContactoEnvioFacturaEmail: validatedData.PERSONA_CONTACTO_ENVIO_FACTURA_EMAIL,
      emailEnvioFactura: validatedData.EMAIL_ENVIO_FACTURA,
      telefono1: validatedData.TELEFONO_1,
      nombrePersonaContacto: validatedData.NOMBRE_PERSONA_CONTACTO,
      apellido: validatedData.APELLIDO,
      telefono: validatedData.TELEFONO,
      emailPersonaContacto: validatedData.EMAIL_PERSONA_CONTACTO,
      textosInformativos: validatedData.TEXTOS_INFORMATIVOS,
      codigoIban: validatedData.CODIGO_IBAN,
      horarioDeDescarga: validatedData.HORARIO_DE_DESCARGA,
      personaContacto: validatedData.PERSONA_CONTACTO,

      // Step 3
      grupoVendedores: validatedData.GRUPO_VENDEDORES,
      oficinaVentas: validatedData.OFICINA_VENTAS,
      moneda: validatedData.MONEDA,
      condExp: validatedData.COND_EXP,
      zonaDeVentas: validatedData.ZONA_DE_VENTAS,
      incoterm: validatedData.INCOTERM,
      calendarioFacturacion: validatedData.CALENDARIO_FACTURACION,
      valoracionPortes: validatedData.VALORACION_PORTES,
      tipoFacturacion: validatedData.TIPO_FACTURACION,
      certificados: validatedData.CERTIFICADOS,
      factEmail: validatedData.FACT_EMAIL,
      claseAbc: validatedData.CLASE_ABC,
      procedimientoReclamacion: validatedData.PROCEDIMIENTO_RECLAMACION,
      emailReclamacion: validatedData.E_MAIL_RECLAMACION,

      // Step 4
      destinatarioMercanciaNombre: validatedData.DESTINATARIO_MERCANCIA_NOMBRE,
      destinatarioMercanciaCalle: validatedData.DESTINATARIO_MERCANCIA_CALLE,
      destinatarioMercanciaNumero: validatedData.DESTINATARIO_MERCANCIA_NUMERO,
      destinatarioMercanciaCodPostal: validatedData.DESTINATARIO_MERCANCIA_COD_POSTAL,
      destinatarioMercanciaPoblacion: validatedData.DESTINATARIO_MERCANCIA_POBLACION,
      destinatarioMercanciaPais: validatedData.DESTINATARIO_MERCANCIA_PAIS,
      destinatarioFacturaNombre: validatedData.DESTINATARIO_FACTURA_NOMBRE,
      destinatarioFacturaCalle: validatedData.DESTINATARIO_FACTURA_CALLE,
      destinatarioFacturaNumero: validatedData.DESTINATARIO_FACTURA_NUMERO,
      destinatarioFacturaCodPostal: validatedData.DESTINATARIO_FACTURA_COD_POSTAL,
      destinatarioFacturaPoblacion: validatedData.DESTINATARIO_FACTURA_POBLACION,
      destinatarioFacturaPais: validatedData.DESTINATARIO_FACTURA_PAIS,

      // Step 5
      vPago: validatedData.V_PAGO,
      condPago: validatedData.COND_PAGO,
      formaPago: validatedData.FORMA_PAGO,
      descuentoPp: validatedData.DESCUENTO_PP,
      gastosFin: validatedData.GASTOS_FIN,
      diasMediosPago: validatedData.DIAS_MEDIOS_PAGO,
      ventasEstimadasAnoEuros: validatedData.VENTAS_ESTIMADAS_ANO_EUROS,
      ventasLimitadasEuros: validatedData.VENTAS_LIMITADAS_EUROS,
      creditoSolicitadoEuros: validatedData.CREDITO_SOLICITADO_EUROS,
      limiteCredito: validatedData.LIMITE_CREDITO,
      observacionesFinancieras: validatedData.OBSERVACIONES_FINANCIERAS,

      // Step 6
      creditoConcedidoEuros: validatedData.CREDITO_CONCEDIDO_EUROS,
      dppOficial: validatedData.DPP_OFICIAL,
      gFinancieroOficial: validatedData.G_FINANCIERO_OFICIAL,
      fechaAprobacion: validatedData.FECHA_APROBACION ? new Date(validatedData.FECHA_APROBACION) : null,
      aprobadoPor: validatedData.APROBADO_POR,
      estadoAprobacion: validatedData.ESTADO_APROBACION,
      notasAprobacion: validatedData.NOTAS_APROBACION,
    };

    // 3. Save to database using Prisma
    const newApplication = await prisma.customerApplication.create({
      data: applicationData
    });

    const duration = Date.now() - startTime;
    logger.info('✅ Application saved to database', { 
      id: newApplication.id,
      cif: newApplication.cif,
      duration: `${duration}ms`
    });

    // 4. Create audit log
    await prisma.auditLog.create({
      data: {
        applicationId: newApplication.id,
        action: 'CREATE',
        changes: JSON.stringify({ status: 'Application created' }),
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      }
    });

    res.status(201).json({ 
      message: 'Application submitted successfully!',
      applicationId: newApplication.id,
      status: newApplication.status
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      logger.warn('❌ Validation failed', { 
        errors: error.errors,
        duration: `${duration}ms`
      });
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    // Handle Prisma unique constraint violation (duplicate CIF)
    if (error.code === 'P2002' && error.meta?.target?.includes('cif')) {
      logger.warn('❌ Duplicate CIF submission attempted', { 
        cif: req.body.CIF,
        duration: `${duration}ms`
      });
      return res.status(409).json({ 
        message: "An application with this CIF already exists." 
      });
    }

    // Handle other errors
    logger.error('💥 Application submission error', { 
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`
    });
    
    res.status(500).json({ 
      message: 'Failed to save application. Please try again.' 
    });
  }
});

/**
 * @route   GET /api/applications
 * @desc    Get all applications (with pagination)
 * @access  Public (Phase 4 will add authentication)
 */
router.get('/applications', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [applications, total] = await Promise.all([
      prisma.customerApplication.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          nombre: true,
          cif: true,
          status: true,
          creditoSolicitadoEuros: true,
          pais: true
        }
      }),
      prisma.customerApplication.count({ where })
    ]);

    res.json({
      applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching applications', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

/**
 * @route   GET /api/applications/:id
 * @desc    Get single application by ID
 * @access  Public (Phase 4 will add authentication)
 */
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await prisma.customerApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    logger.error('Error fetching application', { error: error.message });
    res.status(500).json({ message: 'Failed to fetch application' });
  }
});

module.exports = router;

