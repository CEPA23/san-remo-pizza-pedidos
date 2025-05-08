
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/StatCard';
import { TableGrid } from '@/components/TableGrid';
import { DeliveryOrdersList } from '@/components/DeliveryOrdersList';
import { useToast } from '@/hooks/use-toast';
import { Table, ShoppingCart, MapPin } from 'lucide-react';

export function Dashboard() {
  const { toast } = useToast();

  const handleTableSelect = (id: number) => {
    toast({
      title: `Mesa ${id} seleccionada`,
      description: "Abriendo detalles de la mesa",
    });
    // In a real app, we would navigate to the table detail page
  };

  const handleOrderSelect = (id: string) => {
    toast({
      title: `Pedido ${id} seleccionado`,
      description: "Abriendo detalles del pedido",
    });
    // In a real app, we would navigate to the order detail page
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Mesas Disponibles" 
          value="6" 
          icon={<Table className="h-4 w-4" />}
          description="De 12 mesas en total" 
        />
        <StatCard 
          title="Pedidos Activos" 
          value="8" 
          icon={<ShoppingCart className="h-4 w-4" />}
          description="3 en local, 5 delivery" 
        />
        <StatCard 
          title="Deliveries Pendientes" 
          value="3" 
          icon={<MapPin className="h-4 w-4" />}
          description="Tiempo est. de entrega: 30 min" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vista de Mesas</CardTitle>
            <CardDescription>Administra mesas del restaurante y pedidos en local</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] overflow-auto pr-2">
              <TableGrid onTableSelect={handleTableSelect} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos para Delivery</CardTitle>
            <CardDescription>Seguimiento y gestión de pedidos para entrega</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] overflow-auto pr-2">
              <DeliveryOrdersList onOrderSelect={handleOrderSelect} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
