
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ShoppingCart } from 'lucide-react';

// Types for deliveries
interface DeliveryOrder {
  id: string;
  customer: string;
  address: string;
  items: number;
  status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';
  time: string;
}

interface DeliveryOrdersListProps {
  onOrderSelect: (id: string) => void;
}

export function DeliveryOrdersList({ onOrderSelect }: DeliveryOrdersListProps) {
  // Mock data for delivery orders
  const deliveries: DeliveryOrder[] = [
    {
      id: 'D001',
      customer: 'María García',
      address: 'Calle Principal 123, Centro',
      items: 2,
      status: 'pending',
      time: 'hace 15 min'
    },
    {
      id: 'D002',
      customer: 'Carlos Rodríguez',
      address: 'Av. Libertador 456, Palermo',
      items: 3,
      status: 'preparing',
      time: 'hace 10 min'
    },
    {
      id: 'D003',
      customer: 'Laura Martínez',
      address: 'Rivadavia 789, Almagro',
      items: 1,
      status: 'out-for-delivery',
      time: 'hace 20 min'
    },
    {
      id: 'D004',
      customer: 'Martín Gómez',
      address: 'San Martín 234, Recoleta',
      items: 4,
      status: 'delivered',
      time: 'hace 35 min'
    },
  ];

  const getStatusBadge = (status: DeliveryOrder['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      preparing: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'out-for-delivery': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      delivered: 'bg-green-100 text-green-800 hover:bg-green-200',
    };
    
    const labels = {
      pending: 'Pendiente',
      preparing: 'En preparación',
      'out-for-delivery': 'En camino',
      delivered: 'Entregado'
    };
    
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="space-y-4">
      {deliveries.map((delivery) => (
        <Card 
          key={delivery.id} 
          className={`hover:shadow-md transition-all cursor-pointer ${
            delivery.status === 'delivered' ? 'opacity-70' : ''
          }`}
          onClick={() => onOrderSelect(delivery.id)}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Pedido {delivery.id}</CardTitle>
              {getStatusBadge(delivery.status)}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="mb-2">
              <strong className="font-medium">{delivery.customer}</strong>
            </div>
            <div className="flex items-start mb-2">
              <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-600">{delivery.address}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="text-sm">{delivery.items} productos</span>
              </div>
              <span className="text-xs text-gray-500">{delivery.time}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
