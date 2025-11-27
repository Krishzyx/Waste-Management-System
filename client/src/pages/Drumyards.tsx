import React, { useState } from "react";
import { useEco, WasteType } from "@/context/EcoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import drumyardIcon from "@assets/generated_images/drumyard_icon_illustration.png";

export default function Drumyards() {
  const { drumyards, addDrumyard } = useEco();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  
  // Waste Stock Form State (Simplified for prototype)
  const [wasteType, setWasteType] = useState<WasteType>("Plastic");
  const [wasteAmount, setWasteAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addDrumyard({
      name,
      owner,
      location,
      wasteStock: [{ 
        type: wasteType, 
        amount: Number(wasteAmount), 
        recyclable: true 
      }]
    });

    setIsOpen(false);
    toast({
      title: "Drumyard Added",
      description: `${name} has been successfully registered.`,
    });
    
    // Reset
    setName(""); setOwner(""); setLocation(""); setWasteAmount("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Drumyards</h1>
          <p className="text-muted-foreground mt-2">Manage waste collection points and their stock.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Add Drumyard
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register New Drumyard</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Drumyard Name</Label>
                <Input required placeholder="e.g. East Side Recyclers" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input required placeholder="John Doe" value={owner} onChange={e => setOwner(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input required placeholder="District/Area" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg space-y-4 border border-border">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Initial Stock Entry</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Waste Type</Label>
                    <Select value={wasteType} onValueChange={(v) => setWasteType(v as WasteType)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Plastic', 'Metal', 'Organic', 'Paper', 'E-Waste', 'Glass'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (kg)</Label>
                    <Input required type="number" placeholder="0" value={wasteAmount} onChange={e => setWasteAmount(e.target.value)} />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full size-lg mt-2">Register Drumyard</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {drumyards.map((yard) => (
          <Card key={yard.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm bg-white group">
            <div className="h-2 bg-primary/20 group-hover:bg-primary transition-colors" />
            <CardHeader className="pb-2 flex flex-row gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <img src={drumyardIcon} alt="Icon" className="w-8 h-8 opacity-80" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl">{yard.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <MapPin className="w-3 h-3" /> {yard.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <User className="w-3 h-3" /> {yard.owner}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground/80">Current Waste Stock</p>
                {yard.wasteStock.map((stock, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-muted/30 text-sm">
                    <span className="font-medium">{stock.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{stock.amount} kg</span>
                      {stock.recyclable && (
                        <Badge variant="secondary" className="text-[10px] h-5 bg-green-100 text-green-700 hover:bg-green-100">Recyclable</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
