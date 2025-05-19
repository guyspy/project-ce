// Mock data for various components in the application

export interface DeliveryItem {
  id: number;
  orderNumber: string;
  customer: string;
  products: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'delayed';
  time: string;
}

export interface Vehicle {
  id: number;
  model: string;
  plateNumber: string;
  status: 'available' | 'in-use' | 'maintenance';
  driver?: string;
  lastUpdated: string;
}

export interface Maintenance {
  id: number;
  vehicle: string;
  service: string;
  date: string;
  urgent: boolean;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: 'bulbs' | 'fixtures' | 'accessories';
  stockLevel: 'high' | 'medium' | 'low' | 'out';
  quantity: number;
  location: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  total: string;
}

// Delivery Schedule Data
export const deliveryData: DeliveryItem[] = [
  {
    id: 1,
    orderNumber: 'LB-7842',
    customer: 'Bright Interiors Inc.',
    products: 'LED Panels (50), Spotlights (20)',
    status: 'completed',
    time: '10:15 AM'
  },
  {
    id: 2,
    orderNumber: 'LB-7844',
    customer: 'Modern Living Co.',
    products: 'Smart Bulbs (100), RGB Strips (5)',
    status: 'in-progress',
    time: '12:30 PM'
  },
  {
    id: 3,
    orderNumber: 'LB-7845',
    customer: 'Office Solutions Ltd.',
    products: 'Ceiling Lights (30), Emergency Lights (10)',
    status: 'scheduled',
    time: '2:45 PM'
  },
  {
    id: 4,
    orderNumber: 'LB-7846',
    customer: 'Homestead Furnishings',
    products: 'Decorative Lamps (15), Wall Sconces (25)',
    status: 'delayed',
    time: '3:30 PM'
  }
];

// Fleet Management Data
export const vehicleData: Vehicle[] = [
  {
    id: 1,
    model: 'Delivery Van 2.5T',
    plateNumber: 'LB-V1001',
    status: 'in-use',
    driver: 'John Smith',
    lastUpdated: '15m ago'
  },
  {
    id: 2,
    model: 'Cargo Truck 5T',
    plateNumber: 'LB-T2002',
    status: 'available',
    lastUpdated: '1h ago'
  },
  {
    id: 3,
    model: 'Delivery Van 2.5T',
    plateNumber: 'LB-V1002',
    status: 'maintenance',
    lastUpdated: '3h ago'
  },
  {
    id: 4,
    model: 'Light Pickup Truck',
    plateNumber: 'LB-P3001',
    status: 'in-use',
    driver: 'Mary Johnson',
    lastUpdated: '30m ago'
  },
  {
    id: 5,
    model: 'Cargo Truck 8T',
    plateNumber: 'LB-T2003',
    status: 'available',
    lastUpdated: '2h ago'
  }
];

export const maintenanceData: Maintenance[] = [
  {
    id: 1,
    vehicle: 'Van LB-V1002',
    service: 'Regular Maintenance',
    date: 'Today',
    urgent: true
  },
  {
    id: 2,
    vehicle: 'Truck LB-T2002',
    service: 'Tire Replacement',
    date: 'Jun 15',
    urgent: false
  },
  {
    id: 3,
    vehicle: 'Van LB-V1001',
    service: 'Oil Change',
    date: 'Jun 18',
    urgent: false
  }
];

// Inventory Management Data
export const productData: Product[] = [
  {
    id: 1,
    name: 'LED Smart Bulb X2000',
    sku: 'LB-SB2000',
    category: 'bulbs',
    stockLevel: 'low',
    quantity: 15,
    location: 'Aisle A, Rack 2'
  },
  {
    id: 2,
    name: 'Ceiling Light Fixture C500',
    sku: 'LB-CLF500',
    category: 'fixtures',
    stockLevel: 'high',
    quantity: 124,
    location: 'Aisle C, Rack 5'
  },
  {
    id: 3,
    name: 'LED Panel 60x60cm',
    sku: 'LB-LP6060',
    category: 'fixtures',
    stockLevel: 'medium',
    quantity: 45,
    location: 'Aisle B, Rack 3'
  },
  {
    id: 4,
    name: 'RGB LED Strip 5m',
    sku: 'LB-RGB5M',
    category: 'accessories',
    stockLevel: 'medium',
    quantity: 67,
    location: 'Aisle D, Rack 1'
  },
  {
    id: 5,
    name: 'Energy Saving Bulb E27',
    sku: 'LB-ESB27',
    category: 'bulbs',
    stockLevel: 'out',
    quantity: 0,
    location: 'Aisle A, Rack 1'
  },
  {
    id: 6,
    name: 'Spotlight LED GU10',
    sku: 'LB-SL-GU10',
    category: 'bulbs',
    stockLevel: 'high',
    quantity: 230,
    location: 'Aisle A, Rack 4'
  }
];

// Order Management Data
export const orderData: Order[] = [
  {
    id: 1,
    orderNumber: 'LB-7845',
    customer: 'Bright Interiors Inc.',
    status: 'new',
    date: 'Today, 9:15 AM',
    total: '$2,450.00'
  },
  {
    id: 2,
    orderNumber: 'LB-7844',
    customer: 'Modern Living Co.',
    status: 'processing',
    date: 'Today, 8:30 AM',
    total: '$1,876.50'
  },
  {
    id: 3,
    orderNumber: 'LB-7843',
    customer: 'Office Solutions Ltd.',
    status: 'processing',
    date: 'Yesterday',
    total: '$3,254.75'
  },
  {
    id: 4,
    orderNumber: 'LB-7842',
    customer: 'Homestead Furnishings',
    status: 'shipped',
    date: 'Jun 10, 2023',
    total: '$985.25'
  },
  {
    id: 5,
    orderNumber: 'LB-7841',
    customer: 'City Lighting Project',
    status: 'delivered',
    date: 'Jun 8, 2023',
    total: '$7,650.00'
  },
  {
    id: 6,
    orderNumber: 'LB-7840',
    customer: 'Smart Home Solutions',
    status: 'shipped',
    date: 'Jun 8, 2023',
    total: '$1,245.50'
  }
];
