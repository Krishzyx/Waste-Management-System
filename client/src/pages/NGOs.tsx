import React, { useState } from "react";
import { useEco, WasteType } from "@/context/EcoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ngoIcon from "@assets/generated_images/ngo_icon_illustration.png";

export default function NGOs() {
  const { ngos, addNGO } = useEco();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState<"Private" | "Government">("Private");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState<WasteType[]>([]);

  const handleSpecToggle = (type: WasteType) => {
    if (specialization.includes(type)) {
      setSpecialization(specialization.filter(t => t !== type));
    } else {
      setSpecialization([...specialization, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNGO({ name, type, location, specialization });
    setIsOpen(false);
    toast({ title: "NGO Registered", description: "New organization added to the network." });
    setName(""); setLocation(""); setSpecialization([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">NGO Network</h1>
          <p className="text-muted-foreground mt-2">Partner organizations for waste processing.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Register NGO
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Organization</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input required placeholder="e.g. Green Earth Foundation" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={type} onValueChange={(v: any) => setType(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input required placeholder="Coverage Area" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Specialization (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Plastic', 'Metal', 'Organic', 'Paper', 'E-Waste', 'Glass'].map((t) => (
                    <Badge
                      key={t}
                      variant={specialization.includes(t as WasteType) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => handleSpecToggle(t as WasteType)}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full size-lg mt-4">Register NGO</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ngos.map((ngo) => (
          <Card key={ngo.id} className="border-none shadow-sm bg-white hover:shadow-lg transition-all group">
             <div className="h-2 bg-secondary group-hover:bg-accent transition-colors" />
            <CardHeader className="pb-2 flex flex-row gap-4 items-start">
               <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <img src={ngoIcon} alt="Icon" className="w-8 h-8 opacity-80" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-start w-full">
                    <CardTitle className="text-xl leading-tight">{ngo.name}</CardTitle>
                </div>
                <Badge variant={ngo.type === 'Government' ? 'secondary' : 'outline'} className="mt-1">
                    {ngo.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center text-sm text-muted-foreground gap-2 mb-4">
                  <MapPin className="w-4 h-4" /> {ngo.location}
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">Accepts</p>
                <div className="flex flex-wrap gap-1">
                  {ngo.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary" className="bg-muted text-muted-foreground font-normal border border-border">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
