import React, { useState } from "react";
import { useEco, Connection } from "@/context/EcoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Clock, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Connections() {
  const { connections, drumyards, ngos, createConnection, updateConnectionStatus } = useEco();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [selectedDrumyard, setSelectedDrumyard] = useState("");
  const [selectedNGO, setSelectedNGO] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrumyard || !selectedNGO || !wasteType || !amount) return;

    createConnection({
      drumyardId: selectedDrumyard,
      ngoId: selectedNGO,
      wasteType: wasteType as any,
      amount: Number(amount)
    });

    setIsOpen(false);
    toast({ title: "Connection Created", description: "Waste transfer has been initiated." });
    setSelectedDrumyard(""); setSelectedNGO(""); setWasteType(""); setAmount("");
  };

  const getStatusColor = (status: Connection['status']) => {
    switch (status) {
      case 'Pending': return "bg-orange-100 text-orange-700 border-orange-200";
      case 'Collected': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'Processed': return "bg-green-100 text-green-700 border-green-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Operations</h1>
          <p className="text-muted-foreground mt-2">Manage waste transfer links between Drumyards and NGOs.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Truck className="w-4 h-4 mr-2" /> New Transfer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Initiate Waste Transfer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Source Drumyard</Label>
                <Select value={selectedDrumyard} onValueChange={setSelectedDrumyard}>
                  <SelectTrigger><SelectValue placeholder="Select Drumyard" /></SelectTrigger>
                  <SelectContent>
                    {drumyards.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Destination NGO</Label>
                <Select value={selectedNGO} onValueChange={setSelectedNGO}>
                  <SelectTrigger><SelectValue placeholder="Select NGO" /></SelectTrigger>
                  <SelectContent>
                    {ngos.map(n => <SelectItem key={n.id} value={n.id}>{n.name} ({n.type})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label>Waste Type</Label>
                  <Select value={wasteType} onValueChange={setWasteType}>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      {['Plastic', 'Metal', 'Organic', 'Paper', 'E-Waste', 'Glass'].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (kg)</Label>
                  <Input type="number" required placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
              </div>

              <Button type="submit" className="w-full size-lg mt-4">Create Connection</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {connections.map((conn) => {
          const drumyard = drumyards.find(d => d.id === conn.drumyardId);
          const ngo = ngos.find(n => n.id === conn.ngoId);

          return (
            <Card key={conn.id} className="border-none shadow-sm bg-white overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  conn.status === 'Processed' ? 'bg-green-100 text-green-600' : 
                  conn.status === 'Collected' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {conn.status === 'Processed' ? <CheckCircle2 className="w-6 h-6" /> : 
                   conn.status === 'Collected' ? <Truck className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>

                {/* Flow */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center w-full">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase mb-1">From Drumyard</p>
                    <p className="font-semibold text-lg">{drumyard?.name}</p>
                    <p className="text-sm text-muted-foreground">{drumyard?.location}</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="bg-muted px-4 py-1 rounded-full text-xs font-bold text-muted-foreground mb-2">
                      {conn.amount} kg • {conn.wasteType}
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30 hidden md:block" />
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30 md:hidden rotate-90 my-2" />
                  </div>

                  <div className="text-right md:text-left">
                    <p className="text-xs text-muted-foreground font-bold uppercase mb-1">To NGO</p>
                    <p className="font-semibold text-lg">{ngo?.name}</p>
                    <p className="text-sm text-muted-foreground">{ngo?.location}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-w-[140px] items-end">
                  <Badge variant="outline" className={`mb-2 ${getStatusColor(conn.status)}`}>
                    {conn.status}
                  </Badge>
                  
                  {conn.status === 'Pending' && (
                    <Button size="sm" variant="outline" onClick={() => updateConnectionStatus(conn.id, 'Collected')}>
                      Mark Collected
                    </Button>
                  )}
                  {conn.status === 'Collected' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateConnectionStatus(conn.id, 'Processed')}>
                      Mark Processed
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}

        {connections.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-white rounded-xl border border-dashed">
            <p>No active waste transfers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
