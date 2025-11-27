import React from "react";
import { useEco } from "@/context/EcoContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { Recycle, Factory, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { getStats, drumyards, connections } = useEco();
  const stats = getStats();

  // Prepare chart data
  const wasteByType = drumyards.reduce((acc: any[], curr) => {
    curr.wasteStock.forEach(w => {
      const existing = acc.find(a => a.name === w.type);
      if (existing) {
        existing.value += w.amount;
      } else {
        acc.push({ name: w.type, value: w.amount });
      }
    });
    return acc;
  }, []);

  const COLORS = ['hsl(150, 60%, 35%)', 'hsl(85, 65%, 65%)', 'hsl(180, 50%, 45%)', 'hsl(40, 80%, 60%)', 'hsl(200, 60%, 50%)'];

  const activityData = connections.slice(0, 5).map(c => ({
    name: c.wasteType,
    amount: c.amount,
    status: c.status
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of waste management operations.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Waste</CardTitle>
            <Recycle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWaste.toLocaleString()} kg</div>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Recycled</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecycled.toLocaleString()} kg</div>
            <p className="text-xs text-muted-foreground mt-1">Processing efficiency high</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Drumyards</CardTitle>
            <Factory className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drumyards.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 districts</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Connections</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeConnections}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Waste Composition</CardTitle>
            <CardDescription>Current stock breakdown by type</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {wasteByType.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest waste transfer operations</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="amount" fill="hsl(150, 60%, 35%)" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
