
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TableGrid } from '@/components/TableGrid';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function TablesPage() {
  const { toast } = useToast();

  const handleTableSelect = (id: number) => {
    toast({
      title: `Selected Table ${id}`,
      description: "Opening table details",
    });
    // In a real app, we would navigate to the table detail page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Tables</h2>
        <div className="space-x-2">
          <Button variant="outline">Filter</Button>
          <Button>Add Table</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tables Overview</CardTitle>
          <CardDescription>Manage restaurant tables and dine-in orders</CardDescription>
        </CardHeader>
        <CardContent>
          <TableGrid onTableSelect={handleTableSelect} />
        </CardContent>
      </Card>
    </div>
  );
}
