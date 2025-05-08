import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pill, PlusCircle, RefreshCw } from "lucide-react";
import styles from '../../css/Homecss/MedicationList.module.css';

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
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>Current Medications</CardTitle>
          <div className={styles.subtitle}>
            You have {medications.length} active prescription{medications.length !== 1 && 's'}.
          </div>
        </CardHeader>
        <CardContent>
          <div className={styles.medicationList}>
            {medications.map((med) => (
              <div key={med.id} className={styles.medicationItem}>
                <Pill className={styles.pillIcon} />
                <div className={styles.medicationText}>
                  <div className={styles.medicationHeader}>
                    <span className={styles.medicationName}>{med.name} {med.dosage}</span>
                    <span className={med.status === 'Active' ? styles.statusActive : styles.statusRefill}>{med.status}</span>
                  </div>
                  <div className={styles.medicationFrequency}>{med.frequency}</div>
                  <div className={styles.medicationPrescriber}>
                    By {med.prescriber} • Refill: {med.refillDate}
                  </div>
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
                View All Medications
              </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
              <DialogHeader>
                <DialogTitle>All Medications</DialogTitle>
              </DialogHeader>
              <div className={styles.dialogList}>
                {medications.map((med) => (
                  <div key={med.id} className={styles.medicationItem}>
                    <Pill className={styles.pillIcon} />
                    <div className={styles.medicationText}>
                      <div className={styles.medicationHeader}>
                        <span className={styles.medicationName}>{med.name} {med.dosage}</span>
                        <span className={med.status === 'Active' ? styles.statusActive : styles.statusRefill}>{med.status}</span>
                      </div>
                      <div className={styles.medicationFrequency}>{med.frequency}</div>
                      <div className={styles.medicationPrescriber}>
                        By {med.prescriber} • Refill: {med.refillDate}
                      </div>
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
        </CardFooter>
      </Card>
    </>
  );
} 