import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_TRUCK_6578, MOCK_TRUCK_449, MOCK_TRUCK_AN9631 } from '../../services/truck.mock';
import { useState } from 'react';

const TRUCKS = [
  { id: '6578', data: MOCK_TRUCK_6578, name: 'Camión 6578' },
  { id: '449', data: MOCK_TRUCK_449, name: 'Camión 449' },
  { id: 'AN9631', data: MOCK_TRUCK_AN9631, name: 'Camión AN9631' },
];

export default function EnviosScreen() {
  const [selectedTruck, setSelectedTruck] = useState(TRUCKS[0]);
  const [searchText, setSearchText] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const data = selectedTruck.data;

  const handleSearch = () => {
    const truck = TRUCKS.find(t => t.id === searchText.trim());
    if (truck) {
      setSelectedTruck(truck);
      setSearchText('');
    }
  };

  const handleClear = () => {
    setSearchText('');
  };

  const handleViewMore = (trip: any) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrip(null);
  };

  // Ordenar todos los viajes por fecha (más reciente primero)
  const allTrips = [...data.pastTrips].sort((a, b) => {
    // Convertir fecha a timestamp para comparación
    const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')).getTime();
    const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')).getTime();
    return dateB - dateA;
  });

  const renderTrip = (trip: any, index: number) => (
    <View key={index} style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View>
          <Text style={styles.tripDateHeader}>{trip.date}</Text>
          <Text style={styles.tripIdHeader}>{trip.tripId}</Text>
        </View>
        <Text style={[styles.tripTypeHeader, trip.type === 'FORANEO' ? styles.typeForaneoHeader : styles.typeLocalHeader]}>
          {trip.type}
        </Text>
      </View>
      <View style={styles.tripBody}>
        <View style={styles.descRow}>
          <Text style={styles.descLabel}>DESCRIPTION: </Text>
          <Text style={styles.descValue}>{trip.description}</Text>
        </View>
        <View style={styles.tripRoute}>
          <Text style={styles.routeText}>{trip.origin}</Text>
          <Ionicons name="arrow-forward" size={14} color="#ffffff" />
          <Text style={styles.routeText}>{trip.destination}</Text>
        </View>
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => handleViewMore(trip)}>
          <Text style={styles.viewMoreText}>VIEW MORE</Text>
          <Ionicons name="arrow-forward" size={12} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTripsGrid = (trips: any[]) => {
    const rows = [];
    for (let i = 0; i < trips.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          {renderTrip(trips[i], i)}
          {trips[i + 1] && renderTrip(trips[i + 1], i + 1)}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header con buscador */}
      <View style={styles.searchHeader}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={16} color="#ff9800" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar camión..."
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

      <View style={styles.header}>
        <Text style={styles.title}>Envíos del Camión</Text>
        <Text style={styles.subtitle}>Tractor: {data.tractor}</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="time" size={20} color="#ff9800" />
          <Text style={styles.sectionTitle}>Todos los Viajes ({allTrips.length})</Text>
        </View>
        {renderTripsGrid(allTrips)}
      </View>

      {/* Modal de Detalles del Viaje */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Trip Details</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {selectedTrip && (
                <>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Control Number:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.controlNumber || selectedTrip.tripId}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Date:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.date}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Company Name:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.company || 'N/A'}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Description:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.description}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Origin:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.origin}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Destination:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.destination}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Bill of Lading:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.billOfLading || '0'}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>eManifest:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.emanifest || '—'}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Trip type:</Text>
                    <Text style={styles.modalValue}>{selectedTrip.type}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Coordinator</Text>
                    <Text style={styles.modalValue}>{selectedTrip.coordinator || 'N/A'}</Text>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8c8c8c',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8c8c8c',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff9800',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#2a2a2b',
    borderRadius: 8,
    width: '48%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tripDateHeader: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  tripIdHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1b',
    marginTop: 4,
  },
  tripTypeHeader: {
    fontSize: 13,
    fontWeight: '700',
  },
  typeForaneoHeader: {
    color: '#1a1a1b',
  },
  typeLocalHeader: {
    color: '#ffffff',
  },
  tripBody: {
    padding: 14,
  },
  descRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  descLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
  descValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '500',
    flex: 1,
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeText: {
    fontSize: 13,
    color: '#aaaaaa',
    fontWeight: '500',
    flex: 1,
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
  viewMoreButton: {
    backgroundColor: '#ff9800',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewMoreText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#1a1a1b',
    borderRadius: 12,
    width: '85%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#ff9800',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalBody: {
    padding: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalLabel: {
    color: '#ff9800',
    fontSize: 14,
    fontWeight: '600',
  },
  modalValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
});