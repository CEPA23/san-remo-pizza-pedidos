
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table } from 'lucide-react';

interface TableItemProps {
  id: number;
  status: 'available' | 'occupied' | 'reserved';
  customers?: number;
  onClick: (id: number) => void;
}

const TableItem: React.FC<TableItemProps> = ({ id, status, customers = 0, onClick }) => {
  const statusColors = {
    available: 'bg-green-100 text-green-800 hover:bg-green-200',
    occupied: 'bg-red-100 text-red-800 hover:bg-red-200',
    reserved: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
  };
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${statusColors[status]}`} 
      onClick={() => onClick(id)}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Table {id}</CardTitle>
          <Badge variant={status === 'available' ? 'outline' : 'default'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Table className="h-5 w-5 mr-2" />
            <span>{status === 'available' ? 'Free' : `${customers} customers`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TableGridProps {
  onTableSelect: (id: number) => void;
}

export function TableGrid({ onTableSelect }: TableGridProps) {
  // Mock data for tables
  const tables = [
    { id: 1, status: 'available' as const },
    { id: 2, status: 'occupied' as const, customers: 4 },
    { id: 3, status: 'reserved' as const, customers: 2 },
    { id: 4, status: 'available' as const },
    { id: 5, status: 'occupied' as const, customers: 3 },
    { id: 6, status: 'available' as const },
    { id: 7, status: 'reserved' as const, customers: 6 },
    { id: 8, status: 'available' as const },
    { id: 9, status: 'available' as const },
    { id: 10, status: 'occupied' as const, customers: 2 },
    { id: 11, status: 'available' as const },
    { id: 12, status: 'available' as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tables.map((table) => (
        <TableItem 
          key={table.id} 
          id={table.id} 
          status={table.status} 
          customers={table.customers}
          onClick={onTableSelect}
        />
      ))}
    </div>
  );
}
