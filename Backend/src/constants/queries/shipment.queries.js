/**
 * Queries relacionadas con envíos / viajes.
 */
'use strict';

const shipmentQueries = {
  base: `
    WITH ViajesCombinados AS (
      SELECT 'LOCAL' as TipoDeViaje, l.NumeroControl as numerocontrol, l.DescripcionMovimiento as descripcion, l.Origen as origen, l.Destino as destino, ch.Nombre as NombreChofer, l.ClaveChofer as ID, l.ClaveTractor as Tractor, l.Placas as PlacasTractor, l.Caja as CajaID, c.Placas as PlacasCaja, l.FechaAlta as Fecha, l.RazonSocial, l.NumeroCarta as CartaPorte, l.eManifest, l.Usuario as UsuarioAlta,
             t.Poliza
      FROM Locales l WITH (NOLOCK) 
      LEFT JOIN Choferes ch WITH (NOLOCK) ON ch.ClaveChofer = l.ClaveChofer 
      LEFT JOIN CatCajas c WITH (NOLOCK) ON c.IdCaja = l.Caja 
      LEFT JOIN Tractores t WITH (NOLOCK) ON t.ClaveTractor = l.ClaveTractor
      UNION ALL
      SELECT 'FORANEO' as TipoDeViaje, f.NumeroControl as numerocontrol, f.DescripcionMovimiento as descripcion, f.Origen as origen, f.Destino as destino, ch.Nombre as NombreChofer, f.ClaveChofer as ID, f.ClaveTractor as Tractor, f.Placas as PlacasTractor, f.Caja as CajaID, c.Placas as PlacasCaja, f.FechaAlta as Fecha, f.RazonSocial, f.NumeroCarta as CartaPorte, NULL as eManifest, f.Usuario as UsuarioAlta,
             t.Poliza
      FROM Foraneos f WITH (NOLOCK) 
      LEFT JOIN Choferes ch WITH (NOLOCK) ON ch.ClaveChofer = f.ClaveChofer 
      LEFT JOIN CatCajas c WITH (NOLOCK) ON c.IdCaja = f.Caja 
      LEFT JOIN Tractores t WITH (NOLOCK) ON t.ClaveTractor = f.ClaveTractor
    )
    SELECT * FROM ViajesCombinados
    WHERE Fecha >= DATEADD(day, -30, GETDATE())
  `,
  whereTerminoBase: `(Tractor = @terminoBase OR CajaID = @terminoBase)`,
  whereTermino: `(
    CONVERT(varchar, Fecha, 103) LIKE '%' + @termino + '%' OR
    CAST(numerocontrol AS VARCHAR(255)) LIKE '%' + @termino + '%' OR
    descripcion LIKE '%' + @termino + '%' OR
    origen LIKE '%' + @termino + '%' OR
    destino LIKE '%' + @termino + '%' OR
    UsuarioAlta LIKE '%' + @termino + '%' OR
    Tractor LIKE '%' + @termino + '%'
  )`,
  whereTipoViaje: 'TipoDeViaje = @tipoViaje',
  orderBy: 'ORDER BY Fecha DESC;'
};

module.exports = { shipmentQueries };
