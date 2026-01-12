'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package } from 'lucide-react';

interface SalesMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface DashboardProps {
  className?: string;
}

export function SalesDashboard({ className }: DashboardProps) {
  const [salesMetrics, setSalesMetrics] = useState<SalesMetric[]>([
    {
      id: '1',
      title: 'Total Revenue',
      value: '$45,231',
      change: 12.5,
      changeType: 'increase',
      icon: DollarSign,
    },
    {
      id: '2',
      title: 'Total Orders',
      value: '1,234',
      change: 8.2,
      changeType: 'increase',
      icon: ShoppingCart,
    },
    {
      id: '3',
      title: 'Active Customers',
      value: '892',
      change: -2.4,
      changeType: 'decrease',
      icon: Users,
    },
    {
      id: '4',
      title: 'Products Sold',
      value: '3,456',
      change: 15.3,
      changeType: 'increase',
      icon: Package,
    },
  ]);

  const [salesData, setSalesData] = useState<SalesData[]>([
    { month: 'Jan', revenue: 12000, orders: 120, customers: 80 },
    { month: 'Feb', revenue: 15000, orders: 150, customers: 95 },
    { month: 'Mar', revenue: 18000, orders: 180, customers: 110 },
    { month: 'Apr', revenue: 22000, orders: 220, customers: 140 },
    { month: 'May', revenue: 25000, orders: 250, customers: 160 },
    { month: 'Jun', revenue: 28000, orders: 280, customers: 180 },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Sales Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your sales performance and key metrics
            </p>
          </div>
          <Button 
            onClick={handleRefreshData} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {salesMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.changeType === 'increase';
          
          return (
            <Card key={metric.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className="flex items-center mt-1">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
            <p className="text-sm text-muted-foreground">
              Revenue trend over the last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Chart visualization will be added in the next step
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Using Recharts or Chart.js library
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Orders</CardTitle>
            <p className="text-sm text-muted-foreground">
              Order volume over the last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Chart visualization will be added in the next step
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Using Recharts or Chart.js library
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground">
            Latest sales and customer interactions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      New order #{1000 + item}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item} hours ago
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  ${(Math.random() * 200 + 50).toFixed(0)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
