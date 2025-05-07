import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import styles from '../../css/Homecss/AppointmentList.module.css';

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
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>Upcoming Appointments</CardTitle>
          <div className={styles.subtitle}>
            You have {appointments.length} scheduled appointment{appointments.length !== 1 && 's'}.
          </div>
        </CardHeader>
        <CardContent>
          <div className={styles.appointmentList}>
            {visibleAppointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentItem}>
                <span className={styles.dot}></span>
                <div className={styles.appointmentText}>
                  <div className={styles.appointmentTitle}>
                    {appointment.title || appointment.specialty}
                  </div>
                  <div className={styles.appointmentDate}>
                    {appointment.date} at {appointment.time}
                  </div>
                  <div className={styles.appointmentDoctor}>With {appointment.doctorName}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className={styles.footer}>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={styles.viewAllBtn}
                onClick={() => setShowModal(true)}
              >
                View All Appointments
              </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
              <DialogHeader>
                <DialogTitle>All Appointments</DialogTitle>
              </DialogHeader>
              <div className={styles.dialogList}>
                {appointments.map((appointment) => (
                  <div key={appointment.id} className={styles.appointmentItem}>
                    <span className={styles.dot}></span>
                    <div className={styles.appointmentText}>
                      <div className={styles.appointmentTitle}>
                        {appointment.title || appointment.specialty}
                      </div>
                      <div className={styles.appointmentDate}>
                        {appointment.date} at {appointment.time}
                      </div>
                      <div className={styles.appointmentDoctor}>With {appointment.doctorName}</div>
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className={styles.closeBtn}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className={styles.scheduleBtn}>
            <PlusCircle className={styles.plusIcon} />
            Schedule New Appointment
          </Button>
        </CardFooter>
      </Card>
    </>
  );
} 