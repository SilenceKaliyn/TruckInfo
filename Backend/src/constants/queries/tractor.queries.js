/**
 * Queries relacionadas con tractores y su estado actual.
 */
'use strict';

const tractorQueries = {
  reciente: `
    -- Si el tractor existe pero está inactivo, devolvemos un flag para que el frontend lo sepa.
    IF EXISTS (SELECT 1 FROM Tractores WHERE ClaveTractor = @termino AND Activo = 0) AND LOWER(@termino) NOT LIKE 'c%'
    BEGIN
      SELECT 1 as isInactive;
      RETURN;
    END;
    -- Si el tractor no existe, la consulta principal no devolverá nada, lo cual es correcto.

    WITH ViajeReciente AS (
      -- Viajes LOCALES
      SELECT TOP 1 'LOCAL' as TipoViaje,
             l.Usuario as CoordinadorViaje,
             l.ClaveChofer, 
             l.ClaveTractor,
             l.Placas as PlacasTractor,
             c.IdCaja,
             c.Placas as PlacasCaja,
             CAST(l.NumeroControl AS VARCHAR(255)) as NumeroControl,
             l.FechaAlta,
             l.RazonSocial,
             l.DescripcionMovimiento,
             l.Origen,
             l.Destino,
             l.NumeroCarta,
             l.eManifest,
             CASE
                 WHEN LOWER(@termino) LIKE 'c%' AND c.IdCaja = @termino THEN 0
                 WHEN LOWER(@termino) LIKE 'c%' AND l.ClaveTractor = @termino THEN 1
                 WHEN l.ClaveTractor = @termino THEN 2
                 WHEN c.IdCaja = @termino THEN 3
                 ELSE 4
             END as MatchPriority
      FROM Locales l WITH (NOLOCK)
      LEFT JOIN CatCajas c WITH (NOLOCK) on l.Caja = c.IdCaja
      WHERE l.ClaveTractor = @termino OR c.IdCaja = @termino
      ORDER BY l.NumeroControl DESC
      
      UNION ALL

      -- Viajes FORÁNEOS
      SELECT TOP 1 'FORANEO' as TipoViaje,
             f.Usuario as CoordinadorViaje,
             f.ClaveChofer,
             f.ClaveTractor, 
             f.Placas as PlacasTractor,
             c.IdCaja,
             c.Placas as PlacasCaja,
             CAST(f.NumeroControl AS VARCHAR(255)) as NumeroControl,
             f.FechaAlta,
             f.RazonSocial,
             f.DescripcionMovimiento,
             f.Origen,
             f.Destino,
             f.NumeroCarta,
             NULL as eManifest,
             CASE
                 WHEN LOWER(@termino) LIKE 'c%' AND c.IdCaja = @termino THEN 0
                 WHEN LOWER(@termino) LIKE 'c%' AND f.ClaveTractor = @termino THEN 1
                 WHEN f.ClaveTractor = @termino THEN 2
                 WHEN c.IdCaja = @termino THEN 3
                 ELSE 4
             END as MatchPriority
      FROM Foraneos f WITH (NOLOCK)
      LEFT JOIN CatCajas c WITH (NOLOCK) on f.Caja = c.IdCaja
      WHERE f.ClaveTractor = @termino OR c.IdCaja = @termino
      ORDER BY f.NumeroControl DESC
    )
    SELECT TOP 1 
      ch.Nombre + ' '+ ch.ApellidoPaterno +' '+ ch.ApellidoMaterno as NombreChofer, 
      ch.Email as EmailChofer, ch.Sexo as GeneroChofer, ch.Escolaridad as EscolaridadChofer, 
      ch.Celular as CelularChofer, FechaIngreso as FechaIngresoChofer,
      ch.FechaExpiraLicencia as FechaExpirarLicenciaChofer,ch.Usuario as UsuarioCorr,
       vr.*,
      t.Marca, t.Modelo as Modelo, t.Departamento, t.Proyecto,
      t.Activo as ActivoTractor, 1 as ActivoCaja,
      t.LecturaActual as LecturaActualTractor,
      t.FechaCambioAceite as ProximoCambioDeAceite, t.ProximaCarga as OdometroProximoCambioDeAceite,
      t.Seguro, t.Poliza,
      t.FechaVencimientoPoliza, t.FechaVencimientoPolizaAmericana,
      c.VIN, c.IdMarca as ModeloCaja, c.Exp_Placas as ExpiracionDePlacas,
      t.Taller as EnTaller,
      orr.ReparacionSolicitada, orr.PiezasSolicitadas, orr.Usuario as ReparacionUsuario, orr.NumeroFolio as ReparacionNumeroFolio,
      ca.LecturaActual as LecturaActualCambioAceite, 
      ISNULL(do.Lectura,0) as UltimaLecturaDiesel,
      ISNULL(ca.LecturaActual, t.LecturaActual) as LecturaParaCambioDeAceite,
      (SELECT w.NumeroWarning, w.MotivoWarningTractor, w.Fecha, w.FechaCierreWarning, w.UsuarioModifica, w.Cerrado FROM Warnings w WITH (NOLOCK) WHERE w.ClaveTractor = vr.ClaveTractor ORDER BY w.FechaAlta DESC, w.NumeroWarning DESC FOR JSON PATH) as WarningsTractor,
      (SELECT w.NumeroWarning, w.MotivoWarningCaja, w.Fecha, w.FechaCierreWarningCaja, w.UsuarioModifica, w.CerradoCaja
       FROM Warnings w WITH (NOLOCK)
       WHERE w.Caja = vr.IdCaja
       ORDER BY w.FechaAlta DESC, w.NumeroWarning DESC
       FOR JSON PATH) as WarningsCaja,
      (
        SELECT TOP 10 do.fecha, do.clavetractor, do.clavechofer, do.nombrechofer, do.clavecliente, do.razonsocial, do.Concepto,
                 do.lecturaanterior, do.lectura, do.recorrido, do.litros, do.rendimiento, do.precio, do.subtotal, do.iva, do.importe
          FROM DetalleOrdenesCompra do WITH (NOLOCK)
          WHERE do.clavetractor = vr.ClaveTractor
          ORDER BY do.ordencompra DESC
          FOR JSON PATH
      ) as DieselHistory
    FROM ViajeReciente vr
    LEFT JOIN Choferes ch WITH (NOLOCK) on ch.ClaveChofer = vr.ClaveChofer
    LEFT JOIN Tractores t WITH (NOLOCK) on t.ClaveTractor = vr.ClaveTractor
    LEFT JOIN CatCajas c WITH (NOLOCK) on vr.IdCaja = c.IdCaja
    OUTER APPLY (
      SELECT TOP 1 o.ReparacionSolicitada, o.PiezasSolicitadas, o.UsuarioAlta as Usuario, o.NumeroFolio
      FROM OrdenesReparacion o WITH (NOLOCK)
      WHERE o.ClaveTractor = vr.ClaveTractor
      ORDER BY o.NumeroFolio DESC
    ) orr
    OUTER APPLY (
      SELECT TOP 1 ca.LecturaActual
      FROM CapturaAceite ca WITH (NOLOCK)
      WHERE ca.ClaveTractor = vr.ClaveTractor
      ORDER BY ca.Fecha DESC
    ) ca
    OUTER APPLY (
      SELECT TOP 1 do.Lectura
      FROM DetalleOrdenesCompra do WITH (NOLOCK)
      WHERE do.clavetractor = vr.ClaveTractor ORDER BY do.ordencompra DESC
    ) do
    ORDER BY vr.MatchPriority ASC, vr.NumeroControl DESC;
  `,

  historial: `
    WITH HistorialCombinado AS (
      SELECT 'LOCAL' as TipoViaje, l.FechaAlta, l.RazonSocial, l.DescripcionMovimiento, l.Origen, l.Destino, l.ClaveTractor, l.Caja as IdCaja FROM Locales l WITH (NOLOCK)
      UNION ALL
      SELECT 'FORANEO' as TipoViaje, f.FechaAlta, f.RazonSocial, f.DescripcionMovimiento, f.Origen, f.Destino, f.ClaveTractor, f.Caja as IdCaja FROM Foraneos f WITH (NOLOCK)
    )
    SELECT TOP 3 hc.TipoViaje as tipoviaje, hc.FechaAlta as fecha, hc.RazonSocial as razonSocial, hc.DescripcionMovimiento as movimiento, hc.Origen as origen, hc.Destino as destino
    FROM HistorialCombinado hc
    WHERE (hc.ClaveTractor = @termino OR hc.IdCaja = @termino)
      AND DATENAME(weekday, hc.FechaAlta) NOT IN ('Saturday', 'Sunday', 'sábado', 'domingo')
    ORDER BY hc.FechaAlta DESC;
  `
};

module.exports = { tractorQueries };
