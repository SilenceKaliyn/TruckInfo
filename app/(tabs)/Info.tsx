import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform, TextInput } from 'react-native';
import { MOCK_TRUCK_6578, searchTruck, TruckInfo } from '@/services/truck.mock';
import { Ionicons } from '@expo/vector-icons';
import * as XLSX from 'xlsx';
import { router } from 'expo-router';

export default function InfoScreen() {
  const [data, setData] = useState<TruckInfo>(MOCK_TRUCK_6578);
  const [searchText, setSearchText] = useState('');
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showTractorModal, setShowTractorModal] = useState(false);
  const [showBoxModal, setShowBoxModal] = useState(false);
  const [expandedLectura, setExpandedLectura] = useState(false);
  const [expandedFinanciero, setExpandedFinanciero] = useState(false);
  const [expandedWarningsTractor, setExpandedWarningsTractor] = useState(false);
  const [expandedWarningsBox, setExpandedWarningsBox] = useState(false);
  const [warningsTractorFilter, setWarningsTractorFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const handleSearch = () => {
    const result = searchTruck(searchText);
    if (result) {
      setData(result);
      setSearchText('');
    } else {
      alert('Camión no encontrado');
    }
  };

  const handleClear = () => {
    setSearchText('');
    router.push('/');
  };

  const renderRow = (label: string, value: string, valueColor?: string) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={[styles.value, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
  );

  const downloadExcel = () => {
    const rows = [
      ['Información General', '', ''],
      ['Tractor', data.tractor, ''],
      ['Chofer', data.driver.name, ''],
      ['ID Chofer', data.driver.id, ''],
      ['Email', data.driver.email, ''],
      ['Teléfono', data.driver.telefono, ''],
      ['Placas Tractor', data.plates.tractor, ''],
      ['Caja', data.box, ''],
      ['Placas Caja', data.plates.box, ''],
      ['Tipo de Viaje', data.tripType, ''],
      ['', '', ''],
      ['Información del Tractor', '', ''],
      ['Marca', data.tractorDetail.marca, ''],
      ['Modelo', data.tractorDetail.modelo, ''],
      ['Departamento', data.tractorDetail.departamento, ''],
      ['Proyecto', data.tractorDetail.proyecto, ''],
      ['Seguro', data.tractorDetail.seguro, ''],
      ['Póliza', data.tractorDetail.poliza, ''],
      ['', '', ''],
      ['Información de la Caja', '', ''],
      ['VIN', data.boxDetail.vin, ''],
      ['Modelo Caja', data.boxDetail.modelo, ''],
      ['Expiración Placas', data.boxDetail.expiracionPlacas, ''],
      ['', '', ''],
      ['Resumen de Movimiento', '', ''],
      ['Días desde último movimiento', data.movement.daysSinceLast, ''],
      ['Fecha último movimiento', data.movement.lastDate, ''],
      ['Litros', data.movement.liters, ''],
      ['', '', ''],
      ['Viaje Actual', '', ''],
      ['Número de Control', data.currentTrip.controlNumber, ''],
      ['Fecha', data.currentTrip.date, ''],
      ['Razón Social', data.currentTrip.company, ''],
      ['Descripción', data.currentTrip.description, ''],
      ['Origen', data.currentTrip.origin, ''],
      ['Destino', data.currentTrip.destination, ''],
      ['Coordinador', data.currentTrip.coordinator, ''],
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Camion 6578');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `camion_${data.tractor}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Modal
        visible={showTractorModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTractorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Información del Tractor</Text>
              <TouchableOpacity onPress={() => setShowTractorModal(false)}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {renderRow('Marca', data.tractorDetail.marca, '#00ff00')}
              {renderRow('Modelo', data.tractorDetail.modelo)}
              {renderRow('Departamento', data.tractorDetail.departamento)}
              {renderRow('Proyecto', data.tractorDetail.proyecto, '#00ff00')}
              {renderRow('Fecha de último cambio de aceite', data.tractorDetail.ultimoCambioAceite)}
              {renderRow('Odómetro próximo cambio', data.tractorDetail.odometroProximo, '#00ff00')}
              {renderRow('Seguro', data.tractorDetail.seguro, '#00ff00')}
              {renderRow('Póliza', data.tractorDetail.poliza)}
              {renderRow('Vencimiento de póliza', data.tractorDetail.vencimientoPoliza)}
              {renderRow('Vencimiento de póliza USA', data.tractorDetail.vencimientoPolizaUSA)}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showBoxModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBoxModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Información de la Caja</Text>
              <TouchableOpacity onPress={() => setShowBoxModal(false)}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {renderRow('Caja (ID)', data.boxDetail.id, '#00ff00')}
              {renderRow('VIN', data.boxDetail.vin)}
              {renderRow('Modelo', data.boxDetail.modelo, '#00ff00')}
              {renderRow('Placas', data.boxDetail.placas)}
              {renderRow('Expiración de placas', data.boxDetail.expiracionPlacas, '#00ff00')}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showDriverModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDriverModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Información del Chofer</Text>
              <TouchableOpacity onPress={() => setShowDriverModal(false)}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {renderRow('Nombre', data.driver.name, '#00ff00')}
              {renderRow('Email', data.driver.email, '#00ff00')}
              {renderRow('Escolaridad', data.driver.escolaridad, '#00ff00')}
              {renderRow('Sexo', data.driver.sexo)}
              {renderRow('Teléfono Celular', data.driver.telefono)}
              {renderRow('Fecha de Ingreso', data.driver.fechaIngreso)}
              {renderRow('Antigüedad', data.driver.antiguedad)}
              {renderRow('Expiración de Licencia', data.driver.licenciaExp)}
              {renderRow('Coordinador', data.driver.coordinador, '#00ff00')}
            </ScrollView>
          </View>
        </View>
      </Modal>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header con buscador */}
      <View style={styles.searchHeader}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={16} color="#ff9800" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar otro..."
            placeholderTextColor="#aaaaaa"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
          <Ionicons name="paper-plane" size={20} color="#ff9800" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleClear}>
          <Ionicons name="trash" size={20} color="#ff9800" />
        </TouchableOpacity>
      </View>

      {/* Fila 1: 3 cards */}
      <View style={styles.rowContainer}>
        {/* Card 1: Resumen de Movimiento */}
        <View style={[styles.card, styles.cardRounded]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Resumen de Movimiento</Text>
            <Text style={styles.cardSubtitle}>Información de actividad</Text>
          </View>
          <View style={styles.cardBody}>
            {renderRow('Días desde Último Movimiento', data.movement.daysSinceLast, '#00ff00')}
            {renderRow('Fecha de Último Movimiento', data.movement.lastDate)}
            {renderRow('Días desde Última Carga', data.movement.daysSinceLoad, '#ffff00')}
            {renderRow('Fecha de Última Carga', data.movement.loadDate)}
            {renderRow('Litros', data.movement.liters)}
          </View>
        </View>

        {/* Card 2: Información General */}
        <View style={[styles.card, styles.cardRounded]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Información General</Text>
            <Text style={styles.cardSubtitle}>Datos de la unidad asignada</Text>
          </View>
          <View style={styles.cardBody}>
            {renderRow('Chofer', data.driver.name, '#00ff00')}
            {renderRow('ID de chofer', data.driver.id, '#00ff00')}
            {renderRow('Tractor', data.tractor, '#00ff00')}
            {renderRow('Placas del tractor', data.plates.tractor)}
            {renderRow('Caja', data.box, '#00ff00')}
            {renderRow('Placas de la caja', data.plates.box)}
            {renderRow('Tipo de viaje', data.tripType, '#00ff00')}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowDriverModal(true)}>
                <Ionicons name="person" size={14} color="#ffffff" />
                <Text style={styles.actionButtonText}>INFO CHOFER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowTractorModal(true)}>
                <Ionicons name="car" size={14} color="#ffffff" />
                <Text style={styles.actionButtonText}>INFO TRACTOR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowBoxModal(true)}>
                <Ionicons name="cube" size={14} color="#ffffff" />
                <Text style={styles.actionButtonText}>INFO CAJA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.excelButtonAccent]} onPress={downloadExcel}>
                <Ionicons name="download" size={14} color="#ffffff" />
                <Text style={styles.actionButtonText}>EXCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Card 3: Viaje Actual */}
        <View style={[styles.card, styles.cardRounded]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Viaje Actual</Text>
            <Text style={styles.cardSubtitle}>Detalles del viaje en curso</Text>
          </View>
          <View style={styles.cardBody}>
            {renderRow('Número de Control', data.currentTrip.controlNumber, '#00ff00')}
            {renderRow('Fecha', data.currentTrip.date, '#00ff00')}
            {renderRow('Razón Social', data.currentTrip.company, '#00ff00')}
            {renderRow('Descripción Movimiento', data.currentTrip.description)}
            {renderRow('Origen', data.currentTrip.origin, '#00ff00')}
            {renderRow('Destino', data.currentTrip.destination, '#00ff00')}
            {renderRow('Carta Porte', data.currentTrip.cartaPorte)}
            {renderRow('eManifest', data.currentTrip.emanifest, '#00ff00')}
            {renderRow('Coordinador', data.currentTrip.coordinator, '#00ff00')}
          </View>
        </View>
      </View>

      {/* Fila 2: 3 cards */}
      <View style={styles.rowContainer}>
        {/* Card 4: Viajes Anteriores */}
        <View style={[styles.card, styles.cardRounded]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Viajes Anteriores</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>VER TODOS→</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardBody}>
            {data.pastTrips.map((trip, index) => (
              <View key={index} style={styles.tripItem}>
                <View style={styles.tripDateTypeRow}>
                  <Text style={styles.tripDate}>{trip.date}</Text>
                  <Text style={styles.tripType}>{trip.type}</Text>
                </View>
                <Text style={styles.tripDescription}>{trip.description}</Text>
                <Text style={styles.tripRoute}>{trip.origin} → {trip.destination}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Card 5: Historial de Combustible */}
        <View style={[styles.card, styles.cardRounded]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Historial de Combustible</Text>
            <Text style={styles.cardSubtitle}>Últimas recargas</Text>
          </View>
          <View style={styles.cardBody}>
            {data.fuelHistory.map((fuel, index) => (
              <View key={index}>
                <Text style={styles.fuelDate}>{fuel.date}</Text>
                {renderRow('Concepto', fuel.concepto, '#00ff00')}
                {renderRow('Clave Tractor', fuel.claveTractor, '#00ff00')}
                {renderRow('Clave Chofer', fuel.claveChofer, '#00ff00')}
                {renderRow('Clave Cliente', fuel.claveCliente, '#00ff00')}
                {renderRow('Razón Social', fuel.razonSocial, '#00ff00')}
                {renderRow('Litros', fuel.litros, '#00ff00')}
              </View>
            ))}
            <TouchableOpacity style={styles.expandableRow} onPress={() => setExpandedLectura(!expandedLectura)}>
              <Text style={styles.expandableText}>Detalles de Lectura</Text>
              <Ionicons name={expandedLectura ? 'chevron-up' : 'chevron-down'} size={16} color="#00ff00" />
            </TouchableOpacity>
            {expandedLectura && (
              <View style={styles.expandedContent}>
                {renderRow('Lectura anterior', '---')}
                {renderRow('Lectura actual', '---')}
              </View>
            )}
            <TouchableOpacity style={styles.expandableRow} onPress={() => setExpandedFinanciero(!expandedFinanciero)}>
              <Text style={styles.expandableText}>Detalles Financieros</Text>
              <Ionicons name={expandedFinanciero ? 'chevron-up' : 'chevron-down'} size={16} color="#00ff00" />
            </TouchableOpacity>
            {expandedFinanciero && (
              <View style={styles.expandedContent}>
                {renderRow('Costo total', '---')}
                {renderRow('Precio por litro', '---')}
              </View>
            )}
            <View style={styles.paginationRow}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={20} color="#4fc3f7" />
              </TouchableOpacity>
              <Text style={styles.paginationText}>1 / 10</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#4fc3f7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Card 6: Información Adicional */}
        <View style={[styles.card, styles.cardRounded]}>
          <View style={[styles.cardHeader, { alignItems: 'center', backgroundColor: '#454546' }]}>
            <Text style={styles.cardTitle}>Información Adicional</Text>
            <Text style={styles.cardSubtitle}>Acciones rápidas</Text>
          </View>
          <View style={styles.cardBody}>
            {/* TALLER */}
            <TouchableOpacity style={[styles.actionButton, { marginBottom: 12, width: '100%' }]}>
              <Ionicons name="close-circle" size={16} color="#ff4444" />
              <Text style={[styles.actionButtonText, { color: '#ff9800' }]}>TALLER</Text>
              <Ionicons name="chevron-down" size={16} color="#ff9800" />
            </TouchableOpacity>

            {/* WARNINGS TRACTOR */}
            <TouchableOpacity style={[styles.actionButton, { marginBottom: expandedWarningsTractor ? 0 : 12, width: '100%' }]} onPress={() => setExpandedWarningsTractor(!expandedWarningsTractor)}>
              <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
              <Text style={[styles.actionButtonText, { color: '#ff9800' }]}>WARNINGS TRACTOR</Text>
              <Ionicons name={expandedWarningsTractor ? 'chevron-up' : 'chevron-down'} size={16} color="#ff9800" />
            </TouchableOpacity>
            {expandedWarningsTractor && (
              <View>
                {/* Tabs */}
                <View style={styles.tabRow}>
                  <TouchableOpacity onPress={() => setWarningsTractorFilter('all')}>
                    <Text style={[styles.tabText, warningsTractorFilter === 'all' && styles.tabActive]}>TODOS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setWarningsTractorFilter('active')}>
                    <Text style={[styles.tabText, warningsTractorFilter === 'active' && styles.tabActive]}>VIGENTE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setWarningsTractorFilter('resolved')}>
                    <Text style={[styles.tabText, warningsTractorFilter === 'resolved' && styles.tabActive]}>CERRADO</Text>
                  </TouchableOpacity>
                </View>
                {/* Lista */}
                {data.warningsTractor.filter(w => warningsTractorFilter === 'all' || w.status === warningsTractorFilter).map((w, idx) => (
                  <View key={idx} style={styles.warningRow}>
                    <Ionicons name={w.status === 'active' ? 'alert-circle' : 'checkmark-circle'} size={20} color={w.status === 'active' ? '#ff4444' : '#4caf50'} />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={styles.warningId}><Text style={{ color: '#ff9800', fontWeight: '700' }}>Warning:</Text> {w.id}</Text>
                      <Text style={styles.warningDate}>{w.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* WARNINGS CAJA */}
            <TouchableOpacity style={[styles.actionButton, { width: '100%' }]} onPress={() => setExpandedWarningsBox(!expandedWarningsBox)}>
              <Ionicons name="close-circle" size={16} color="#ff4444" />
              <Text style={[styles.actionButtonText, { color: '#ff9800' }]}>WARNINGS CAJA</Text>
              <Ionicons name={expandedWarningsBox ? 'chevron-up' : 'chevron-down'} size={16} color="#ff9800" />
            </TouchableOpacity>
            {expandedWarningsBox && (
              <View>
                {data.warningsBox.map((w, idx) => (
                  <View key={idx} style={styles.warningRow}>
                    <Ionicons name={w.status === 'active' ? 'alert-circle' : 'checkmark-circle'} size={20} color={w.status === 'active' ? '#ff4444' : '#4caf50'} />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={styles.warningId}><Text style={{ color: '#ff9800', fontWeight: '700' }}>Warning:</Text> {w.id}</Text>
                      <Text style={styles.warningDate}>{w.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  </>
  );
}

const styles = StyleSheet.create(
  {
  container: {
    flex: 1,
    backgroundColor: '#8c8c8c',
  },
  content: {
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#3a3a3b',
    borderWidth: 1,
    borderColor: '#555556',
    borderTopWidth: 3,
    borderTopColor: '#ff9800',
    overflow: 'hidden',
    minWidth: 260,
    flex: 1,
    maxWidth: 400,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      },
    }),
    elevation: 4,
  },
  cardHeader: {
    backgroundColor: '#3a3a3b',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#555556',
    alignItems: 'flex-start',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: '#aaaaaa',
    fontSize: 10,
    marginTop: 4,
  },
  cardBody: {
    padding: 16,
  },
  cardRounded: {
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4a4a4b',
  },
  label: {
    color: '#ff9800',
    fontSize: 11,
    fontWeight: '600',
    marginRight: 4,
  },
  value: {
    color: '#ffffff',
    fontSize: 11,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#555556',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff9800',
    minWidth: 110,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  excelButtonAccent: {
    backgroundColor: '#ff9800',
    borderColor: '#ff9800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#3a3a3b',
    borderWidth: 1,
    borderColor: '#555556',
    borderTopWidth: 3,
    borderTopColor: '#ff9800',
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3a3a3b',
    borderBottomWidth: 1,
    borderBottomColor: '#555556',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalBody: {
    padding: 12,
  },
  viewAllLink: {
    color: '#ff9800',
    fontSize: 10,
    marginTop: 4,
  },
  tripItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#8c8c8c',
  },
  tripDateTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripDate: {
    color: '#ffffff',
    fontSize: 11,
  },
  tripType: {
    color: '#ff9800',
    fontSize: 11,
    fontWeight: '600',
  },
  tripDescription: {
    color: '#ff9800',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  tripRoute: {
    color: '#ffffff',
    fontSize: 11,
    marginTop: 2,
  },
  fuelDate: {
    color: '#ffffff',
    fontSize: 11,
    marginBottom: 8,
  },
  expandableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#8c8c8c',
    marginTop: 4,
  },
  expandableText: {
    color: '#ff9800',
    fontSize: 12,
    fontWeight: '600',
  },
  expandedContent: {
    paddingLeft: 8,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 12,
  },
  paginationText: {
    color: '#ff9800',
    fontSize: 11,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#555556',
    marginBottom: 8,
  },
  tabText: {
    color: '#aaaaaa',
    fontSize: 11,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tabActive: {
    color: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#ff9800',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4a4a4b',
  },
  warningId: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  warningDate: {
    color: '#aaaaaa',
    fontSize: 11,
    marginTop: 2,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#454546',
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    padding: 0,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });


