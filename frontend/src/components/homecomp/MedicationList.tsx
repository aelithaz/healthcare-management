import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pill, PlusCircle, RefreshCw } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescriber: string;
  refillDate: string;
  status: "Active" | "Refill Soon";
}

interface MedicationListProps {
  medications: Medication[];
}

export function MedicationList({ medications }: MedicationListProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="w-full bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Current Medications</CardTitle>
          <div className="text-blue-800 text-sm mt-1">
            You have {medications.length} active prescription{medications.length !== 1 && 's'}.
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-blue-100 mb-6">
            {medications.map((med) => (
              <div key={med.id} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                <Pill className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-900">{med.name} {med.dosage}</span>
                    <span className={`text-xs font-semibold ${med.status === 'Active' ? 'text-blue-500' : 'text-orange-500'}`}>{med.status}</span>
                  </div>
                  <div className="text-blue-800 text-sm">{med.frequency}</div>
                  <div className="text-blue-700 text-xs">
                    By {med.prescriber} • Refill: {med.refillDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-900 hover:bg-blue-100 mb-3"
                onClick={() => setShowModal(true)}
              >
                View All Medications
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>All Medications</DialogTitle>
              </DialogHeader>
              <div className="divide-y divide-blue-100 mb-6 max-h-96 overflow-y-auto">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <Pill className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-900">{med.name} {med.dosage}</span>
                        <span className={`text-xs font-semibold ${med.status === 'Active' ? 'text-blue-500' : 'text-orange-500'}`}>{med.status}</span>
                      </div>
                      <div className="text-blue-800 text-sm">{med.frequency}</div>
                      <div className="text-blue-700 text-xs">
                        By {med.prescriber} • Refill: {med.refillDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="w-full border-blue-300 text-blue-900 hover:bg-blue-100"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
} 