import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  title?: string; // Optional for custom titles like 'Annual Checkup'
}

// AppointmentCard component (for potential card-based rendering)
function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{appointment.title || appointment.specialty}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm mb-1">
          {appointment.date} at {appointment.time}
        </div>
        <div className="text-sm">With {appointment.doctorName}</div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Reschedule</Button>
      </CardFooter>
    </Card>
  );
}

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  const [showModal, setShowModal] = useState(false);
  const showCount = Math.min(3, appointments.length);
  const visibleAppointments = appointments.slice(0, showCount);

  return (
    <>
      <Card className="w-full bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Upcoming Appointments</CardTitle>
          <div className="text-blue-800 text-sm mt-1">
            You have {appointments.length} scheduled appointment{appointments.length !== 1 && 's'}.
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-blue-100 mb-6">
            {visibleAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                <div className="text-left">
                  <div className="font-semibold text-blue-900 text-left">
                    {appointment.title || appointment.specialty}
                  </div>
                  <div className="text-blue-800 text-sm text-left">
                    {appointment.date} at {appointment.time}
                  </div>
                  <div className="text-blue-700 text-xs text-left">With {appointment.doctorName}</div>
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
                className="w-full border-blue-300 text-blue-900 hover:bg-blue-100"
                onClick={() => setShowModal(true)}
              >
                View All Appointments
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>All Appointments</DialogTitle>
              </DialogHeader>
              <div className="divide-y divide-blue-100 mb-6 max-h-96 overflow-y-auto">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                    <div className="text-left">
                      <div className="font-semibold text-blue-900 text-left">
                        {appointment.title || appointment.specialty}
                      </div>
                      <div className="text-blue-800 text-sm text-left">
                        {appointment.date} at {appointment.time}
                      </div>
                      <div className="text-blue-700 text-xs text-left">With {appointment.doctorName}</div>
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
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Schedule New Appointment
          </Button>
        </CardFooter>
      </Card>
    </>
  );
} 