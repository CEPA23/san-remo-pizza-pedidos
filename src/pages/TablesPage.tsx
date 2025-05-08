
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TableGrid } from '@/components/TableGrid';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function TablesPage() {
  const { toast } = useToast();

  const handleTableSelect = (id: number) => {
    toast({
      title: `Mesa ${id} seleccionada`,
      description: "Abriendo detalles de la mesa",
    });
    // In a real app, we would navigate to the table detail page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Mesas</h2>
        <div className="space-x-2">
          <Button variant="outline">Filtrar</Button>
          <Button>Añadir Mesa</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Mesas</CardTitle>
          <CardDescription>Gestiona las mesas del restaurante y pedidos en local</CardDescription>
        </CardHeader>
        <CardContent>
          <TableGrid onTableSelect={handleTableSelect} />
        </CardContent>
      </Card>
    </div>
  );
}
