
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeliveryOrdersList } from '@/components/DeliveryOrdersList';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function DeliveryPage() {
  const { toast } = useToast();

  const handleOrderSelect = (id: string) => {
    toast({
      title: `Pedido ${id} seleccionado`,
      description: "Abriendo detalles del pedido",
    });
    // In a real app, we would navigate to the order detail page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos de Delivery</h2>
        <div className="space-x-2">
          <Button variant="outline">Filtrar</Button>
          <Button>Nuevo Pedido</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Deliveries Activos</CardTitle>
          <CardDescription>Seguimiento y gestión de pedidos para entrega</CardDescription>
        </CardHeader>
        <CardContent>
          <DeliveryOrdersList onOrderSelect={handleOrderSelect} />
        </CardContent>
      </Card>
    </div>
  );
}
