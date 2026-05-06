export interface TruckInfo {
  tractor: string;
  tractorDetail: {
    marca: string;
    modelo: string;
    departamento: string;
    proyecto: string;
    ultimoCambioAceite: string;
    odometroProximo: string;
    seguro: string;
    poliza: string;
    vencimientoPoliza: string;
    vencimientoPolizaUSA: string;
  };
  driver: {
    name: string;
    id: string;
    email: string;
    escolaridad: string;
    sexo: string;
    telefono: string;
    fechaIngreso: string;
    antiguedad: string;
    licenciaExp: string;
    coordinador: string;
  };
  plates: {
    tractor: string;
    box: string;
  };
  box: string;
  boxDetail: {
    id: string;
    vin: string;
    modelo: string;
    placas: string;
    expiracionPlacas: string;
  };
  tripType: string;
  movement: {
    daysSinceLast: string;
    lastDate: string;
    daysSinceLoad: string;
    loadDate: string;
    liters: string;
  };
  currentTrip: {
    controlNumber: string;
    date: string;
    company: string;
    description: string;
    origin: string;
    destination: string;
    cartaPorte: string;
    emanifest: string;
    coordinator: string;
  };
  pastTrips: {
    tripId: string;
    date: string;
    type: string;
    description: string;
    origin: string;
    destination: string;
    controlNumber?: string;
    company?: string;
    billOfLading?: string;
    emanifest?: string;
    coordinator?: string;
  }[];
  fuelHistory: {
    date: string;
    concepto: string;
    claveTractor: string;
    claveChofer: string;
    claveCliente: string;
    razonSocial: string;
    litros: string;
  }[];
  warningsTractor: {
    id: string;
    date: string;
    status: 'active' | 'resolved';
  }[];
  warningsBox: {
    id: string;
    date: string;
    status: 'active' | 'resolved';
  }[];
  tallerStatus: 'active' | 'inactive';
}

export const MOCK_TRUCK_6578: TruckInfo = {
  tractor: '6578',
  driver: {
    name: 'ARNULFO PEREZ OLIVAS',
    id: '7659',
    email: 'arnulfop643@gmail.com',
    escolaridad: '---',
    sexo: 'MASCULINO',
    telefono: '6561130870',
    fechaIngreso: '09/08/2021',
    antiguedad: '4 año(s), 8 mes(es), 27 día(s)',
    licenciaExp: '09/06/2029',
    coordinador: '---',
  },
  plates: {
    tractor: '19-ER-5N',
    box: 'S174134',
  },
  tractorDetail: {
    marca: 'FREIGHTLINER',
    modelo: '2015',
    departamento: 'CRUCES',
    proyecto: 'ETHICON',
    ultimoCambioAceite: '12/4/25',
    odometroProximo: '7,091',
    seguro: 'QUALITAS',
    poliza: '3320018958',
    vencimientoPoliza: '14/03/2027',
    vencimientoPolizaUSA: '01/10/2026',
  },
  box: 'AN73676',
  boxDetail: {
    id: 'AN73676',
    vin: '1PT01JAH3Y6005175',
    modelo: 'TRIM',
    placas: 'S174134',
    expiracionPlacas: '2/27/28',
  },
  tripType: 'LOCAL',
  movement: {
    daysSinceLast: 'Hoy',
    lastDate: '05/05/2026',
    daysSinceLoad: 'Hace 5 días',
    loadDate: '30/04/2026',
    liters: '141,534',
  },
  currentTrip: {
    controlNumber: '637995497',
    date: '05/05/2026 09:28',
    company: 'ETIHCON',
    description: 'PEAJE EXPORTACION CAJA',
    origin: 'ETHICON',
    destination: 'JVSF',
    cartaPorte: '0',
    emanifest: 'N/A',
    coordinator: 'RIGOBERTO ACOSTA',
  },
  pastTrips: [
    {
      tripId: '637996122',
      date: '05/05/2026 15:07',
      type: 'LOCAL',
      description: 'INTERPLANTAS RENTA LOCAL',
      origin: 'CLOUTHIER',
      destination: 'BASE 7',
      controlNumber: '637996122',
      company: 'ETHICON',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637996045',
      date: '05/05/2026 14:45',
      type: 'LOCAL',
      description: 'INTERPLANTAS RENTA LOCAL',
      origin: 'ETHICON',
      destination: 'CLOUTHIER',
      controlNumber: '637996045',
      company: 'ETHICON',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637995997',
      date: '05/05/2026 11:17',
      type: 'LOCAL',
      description: 'PEAJE IMPO SOLO TRACTOR',
      origin: 'JVSF',
      destination: 'ETHICON',
      controlNumber: '637995997',
      company: 'ETHICON',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637995681',
      date: '05/05/2026 11:04',
      type: 'LOCAL',
      description: 'BOTANDO IMPO RENTA',
      origin: 'JVSF',
      destination: 'ETHICON',
      controlNumber: '637995681',
      company: 'ETHICON',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637995432',
      date: '04/05/2026 22:15',
      type: 'FORANEO',
      description: 'CRUCE EXPORTACION LAREDO',
      origin: 'JVSF',
      destination: 'LAREDO TX',
      controlNumber: '637995432',
      company: 'ETHICON',
      billOfLading: 'BL-2026-001',
      emanifest: 'PENDIENTE',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637995201',
      date: '04/05/2026 18:30',
      type: 'FORANEO',
      description: 'RETORNO IMPORTACION NUEVO LAREDO',
      origin: 'NUEVO LAREDO',
      destination: 'JVSF',
      controlNumber: '637995201',
      company: 'ETHICON',
      billOfLading: 'BL-2026-002',
      emanifest: 'COMPLETADO',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637994876',
      date: '03/05/2026 09:45',
      type: 'FORANEO',
      description: 'CARGA A COLOMBIA NUEVO LAREDO',
      origin: 'JVSF',
      destination: 'NUEVO LAREDO',
      controlNumber: '637994876',
      company: 'ETHICON',
      billOfLading: 'BL-2026-003',
      emanifest: 'PENDIENTE',
      coordinator: 'RIGOBERTO ACOSTA',
    },
    {
      tripId: '637994321',
      date: '02/05/2026 14:20',
      type: 'FORANEO',
      description: 'CRUCE FRONTERA TECATE',
      origin: 'JVSF',
      destination: 'TECATE BC',
      controlNumber: '637994321',
      company: 'ETHICON',
      billOfLading: 'BL-2026-004',
      emanifest: 'COMPLETADO',
      coordinator: 'RIGOBERTO ACOSTA',
    },
  ],
  fuelHistory: [
    {
      date: '30/04/2026',
      concepto: 'DIESEL (LT)',
      claveTractor: '6578',
      claveChofer: '7659 - ARNULFO PEREZ OLIVAS',
      claveCliente: '23908',
      razonSocial: 'BASE 7',
      litros: '141.53',
    },
  ],
  warningsTractor: [
    {
      id: 'US2041001210',
      date: '01/05/2026',
      status: 'active',
    },
    {
      id: 'NM1356Q2YDR3',
      date: '16/04/2026',
      status: 'resolved',
    },
    {
      id: 'NM1356Q26CFP',
      date: '19/03/2026',
      status: 'resolved',
    },
    {
      id: 'US1111001918',
      date: '13/03/2026',
      status: 'resolved',
    },
  ],
  warningsBox: [
    {
      id: 'BX001234',
      date: '10/04/2026',
      status: 'active',
    },
    {
      id: 'BX005678',
      date: '22/02/2026',
      status: 'resolved',
    },
  ],
  tallerStatus: 'active',
};

export const MOCK_TRUCK_449: TruckInfo = {
  tractor: '449',
  driver: {
    name: 'CARLOS MARTINEZ LOPEZ',
    id: '3421',
    email: 'carlosm44@gmail.com',
    escolaridad: 'Preparatoria',
    sexo: 'MASCULINO',
    telefono: '6562341567',
    fechaIngreso: '15/03/2019',
    antiguedad: '7 año(s), 1 mes(es), 20 día(s)',
    licenciaExp: '22/11/2028',
    coordinador: 'JUAN PEREZ',
  },
  plates: {
    tractor: '45-AB-7C',
    box: 'T987654',
  },
  tractorDetail: {
    marca: 'KENWORTH',
    modelo: '2018',
    departamento: 'MONTERREY',
    proyecto: 'COCA COLA',
    ultimoCambioAceite: '10/2/26',
    odometroProximo: '15,432',
    seguro: 'GNP',
    poliza: '4420012345',
    vencimientoPoliza: '18/06/2027',
    vencimientoPolizaUSA: '05/12/2026',
  },
  box: 'TX88442',
  boxDetail: {
    id: 'TX88442',
    vin: '1AB23CDE4FG567890',
    modelo: 'DRY VAN',
    placas: 'T987654',
    expiracionPlacas: '8/15/27',
  },
  tripType: 'NACIONAL',
  movement: {
    daysSinceLast: 'Ayer',
    lastDate: '04/05/2026',
    daysSinceLoad: 'Hace 3 días',
    loadDate: '02/05/2026',
    liters: '98,120',
  },
  currentTrip: {
    controlNumber: '847392104',
    date: '05/05/2026 14:15',
    company: 'COCA COLA FEMSA',
    description: 'ENTREGA MONTERREY - GUADALAJARA',
    origin: 'MONTERREY',
    destination: 'GUADALAJARA',
    cartaPorte: '984756321',
    emanifest: 'N/A',
    coordinator: 'MARIA GONZALEZ',
  },
  pastTrips: [
    {
      tripId: '638001234',
      date: '05/05/2026 15:07',
      type: 'LOCAL',
      description: 'INTERPLANTAS RENTA LOCAL',
      origin: 'BASE 7',
      destination: 'CLOUTHIER',
      controlNumber: '638001234',
      company: 'COCA COLA FEMSA',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '638001045',
      date: '05/05/2026 14:45',
      type: 'LOCAL',
      description: 'INTERPLANTAS RENTA LOCAL',
      origin: 'CLOUTHIER',
      destination: 'ETHICON',
      controlNumber: '638001045',
      company: 'COCA COLA FEMSA',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '638000997',
      date: '05/05/2026 11:17',
      type: 'LOCAL',
      description: 'PEAJE IMPO SOLO TRACTOR',
      origin: 'ETHICON',
      destination: 'JVSF',
      controlNumber: '638000997',
      company: 'COCA COLA FEMSA',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '638000681',
      date: '05/05/2026 11:04',
      type: 'LOCAL',
      description: 'BOTANDO IMPO RENTA',
      origin: 'ETHICON',
      destination: 'JVSF',
      controlNumber: '638000681',
      company: 'COCA COLA FEMSA',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '638000432',
      date: '04/05/2026 22:15',
      type: 'FORANEO',
      description: 'CRUCE EXPORTACION LAREDO',
      origin: 'JVSF',
      destination: 'LAREDO TX',
      controlNumber: '638000432',
      company: 'COCA COLA FEMSA',
      billOfLading: 'BL-449-001',
      emanifest: 'PENDIENTE',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '638000201',
      date: '04/05/2026 18:30',
      type: 'FORANEO',
      description: 'RETORNO IMPORTACION NUEVO LAREDO',
      origin: 'NUEVO LAREDO',
      destination: 'JVSF',
      controlNumber: '638000201',
      company: 'COCA COLA FEMSA',
      billOfLading: 'BL-449-002',
      emanifest: 'COMPLETADO',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '637999876',
      date: '03/05/2026 09:45',
      type: 'FORANEO',
      description: 'CARGA A COLOMBIA NUEVO LAREDO',
      origin: 'JVSF',
      destination: 'NUEVO LAREDO',
      controlNumber: '637999876',
      company: 'COCA COLA FEMSA',
      billOfLading: 'BL-449-003',
      emanifest: 'PENDIENTE',
      coordinator: 'MARIA GONZALEZ',
    },
    {
      tripId: '637999321',
      date: '02/05/2026 14:20',
      type: 'FORANEO',
      description: 'CRUCE FRONTERA TECATE',
      origin: 'JVSF',
      destination: 'TECATE BC',
      controlNumber: '637999321',
      company: 'COCA COLA FEMSA',
      billOfLading: 'BL-449-004',
      emanifest: 'COMPLETADO',
      coordinator: 'MARIA GONZALEZ',
    },
  ],
  warningsTractor: [],
  warningsBox: [],
  tallerStatus: 'inactive',
  fuelHistory: [
    {
      date: '02/05/2026',
      concepto: 'DIESEL (LT)',
      claveTractor: '449',
      claveChofer: '3421 - CARLOS MARTINEZ LOPEZ',
      claveCliente: '11502',
      razonSocial: 'PEMEX BASE MONTERREY',
      litros: '287.45',
    },
  ],
};

export const MOCK_TRUCK_AN9631: TruckInfo = {
  tractor: 'AN9631',
  driver: {
    name: 'ROBERTO SANCHEZ TORRES',
    id: '8812',
    email: 'robertos.t@gmail.com',
    escolaridad: 'Universidad',
    sexo: 'MASCULINO',
    telefono: '6567894321',
    fechaIngreso: '20/01/2020',
    antiguedad: '6 año(s), 3 mes(es), 15 día(s)',
    licenciaExp: '14/08/2027',
    coordinador: 'PEDRO HERNANDEZ',
  },
  plates: {
    tractor: 'AN-96-31X',
    box: 'M223311',
  },
  tractorDetail: {
    marca: 'VOLVO',
    modelo: '2020',
    departamento: 'TIJUANA',
    proyecto: 'SAMSUNG',
    ultimoCambioAceite: '25/3/26',
    odometroProximo: '22,105',
    seguro: 'AXA',
    poliza: '5520087654',
    vencimientoPoliza: '30/09/2027',
    vencimientoPolizaUSA: '15/04/2027',
  },
  box: 'BC55443',
  boxDetail: {
    id: 'BC55443',
    vin: '2GH45IJK6LM789012',
    modelo: 'REEFER',
    placas: 'M223311',
    expiracionPlacas: '12/30/27',
  },
  tripType: 'FRONTERA',
  movement: {
    daysSinceLast: 'Hoy',
    lastDate: '05/05/2026',
    daysSinceLoad: 'Hace 1 día',
    loadDate: '04/05/2026',
    liters: '76,890',
  },
  currentTrip: {
    controlNumber: '556789012',
    date: '05/05/2026 07:45',
    company: 'SAMSUNG MEXICO',
    description: 'CRUCE FRONTERIZO TIJUANA - SAN DIEGO',
    origin: 'TIJUANA',
    destination: 'SAN DIEGO',
    cartaPorte: '667788990',
    emanifest: 'PENDIENTE',
    coordinator: 'LUIS RAMIREZ',
  },
  pastTrips: [
    {
      tripId: '638005678',
      date: '05/05/2026 15:07',
      type: 'LOCAL',
      description: 'PEAJE EXPORTACION CAJA',
      origin: 'ETHICON',
      destination: 'JVSF',
      controlNumber: '638005678',
      company: 'SAMSUNG MEXICO',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638005432',
      date: '05/05/2026 11:30',
      type: 'LOCAL',
      description: 'BOTANDO IMPO RENTA',
      origin: 'JVSF',
      destination: 'ETHICON',
      controlNumber: '638005432',
      company: 'SAMSUNG MEXICO',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638005123',
      date: '04/05/2026 16:45',
      type: 'LOCAL',
      description: 'INTERPLANTAS RENTA LOCAL',
      origin: 'CLOUTHIER',
      destination: 'BASE 7',
      controlNumber: '638005123',
      company: 'SAMSUNG MEXICO',
      billOfLading: '0',
      emanifest: 'N/A',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638004987',
      date: '04/05/2026 09:20',
      type: 'FORANEO',
      description: 'CRUCE FRONTERA LAREDO',
      origin: 'JVSF',
      destination: 'LAREDO TX',
      controlNumber: '638004987',
      company: 'SAMSUNG MEXICO',
      billOfLading: 'BL-AN-001',
      emanifest: 'PENDIENTE',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638004765',
      date: '03/05/2026 14:15',
      type: 'FORANEO',
      description: 'RETORNO IMPORTACION TECATE',
      origin: 'TECATE BC',
      destination: 'JVSF',
      controlNumber: '638004765',
      company: 'SAMSUNG MEXICO',
      billOfLading: 'BL-AN-002',
      emanifest: 'COMPLETADO',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638004321',
      date: '02/05/2026 08:00',
      type: 'FORANEO',
      description: 'CARGA A SAN DIEGO EXPORT',
      origin: 'JVSF',
      destination: 'SAN DIEGO',
      controlNumber: '638004321',
      company: 'SAMSUNG MEXICO',
      billOfLading: 'BL-AN-003',
      emanifest: 'PENDIENTE',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638004098',
      date: '01/05/2026 19:30',
      type: 'FORANEO',
      description: 'CRUCE NUEVO LAREDO',
      origin: 'JVSF',
      destination: 'NUEVO LAREDO',
      controlNumber: '638004098',
      company: 'SAMSUNG MEXICO',
      billOfLading: 'BL-AN-004',
      emanifest: 'COMPLETADO',
      coordinator: 'LUIS RAMIREZ',
    },
    {
      tripId: '638003876',
      date: '30/04/2026 10:00',
      type: 'FORANEO',
      description: 'RETORNO DE COLOMBIA',
      origin: 'NUEVO LAREDO',
      destination: 'JVSF',
      controlNumber: '638003876',
      company: 'SAMSUNG MEXICO',
      billOfLading: 'BL-AN-005',
      emanifest: 'COMPLETADO',
      coordinator: 'LUIS RAMIREZ',
    },
  ],
  fuelHistory: [
    {
      date: '04/05/2026',
      concepto: 'DIESEL (LT)',
      claveTractor: 'AN9631',
      claveChofer: '8812 - ROBERTO SANCHEZ TORRES',
      claveCliente: '22304',
      razonSocial: 'BASE 3 TIJUANA',
      litros: '312.78',
    },
  ],
  warningsTractor: [
    {
      id: 'AN2041003355',
      date: '02/05/2026',
      status: 'active',
    },
    {
      id: 'AN1122334455',
      date: '15/03/2026',
      status: 'resolved',
    },
  ],
  warningsBox: [
    {
      id: 'BX990011',
      date: '20/04/2026',
      status: 'active',
    },
  ],
  tallerStatus: 'inactive',
};

export function searchTruck(query: string): TruckInfo | null {
  const trimmed = query.trim();
  if (trimmed === '6578') {
    return MOCK_TRUCK_6578;
  }
  if (trimmed === '449') {
    return MOCK_TRUCK_449;
  }
  if (trimmed === 'AN9631') {
    return MOCK_TRUCK_AN9631;
  }
  return null;
}
