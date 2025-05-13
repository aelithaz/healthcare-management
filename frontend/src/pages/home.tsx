import { useNavigate, Link } from "react-router-dom"
import { AppointmentList } from "@/components/homecomp/AppointmentList"
import { MedicationList } from "@/components/homecomp/MedicationList"

function Home() {
  // Sample appointment data - in a real app, this would come from an API
  const upcomingAppointments = [
    {
      id: "1",
      date: "March 25, 2024",
      time: "10:00 AM",
      doctorName: "Dr. Chiang",
      specialty: "Cardiology"
    },
    {
      id: "2",
      date: "March 28, 2024",
      time: "2:30 PM",
      doctorName: "Dr. Chin",
      specialty: "Dermatology"
    },
     {
      id: "3",
      date: "March 28, 2024",
      time: "2:30 PM",
      doctorName: "Dr. Chen",
      specialty: "Physical Examination"
    },
      {
        id: "4",
        date: "March 28, 2024",
        time: "2:30 PM",
        doctorName: "Dr. Cheung",
        specialty: "Physical Therapy"
      },
      {
        id: "5",
        date: "March 28, 2024",
        time: "2:30 PM",
        doctorName: "Dr. Zheng",
        specialty: "Physical Therapy"
      },
      {
        id: "6",
        date: "March 28, 2024",
        time: "2:30 PM",
        doctorName: "Dr. Lin",
        specialty: "Physical Therapy"
      }
  ];

  // Sample medication data
  const medications = [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescriber: "Dr. Smith",
      refillDate: "May 20, 2025",
      status: "Active" as const
    },
    {
      id: "2",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      prescriber: "Dr. Johnson",
      refillDate: "May 15, 2025",
      status: "Active" as const
    },
    {
      id: "3",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      prescriber: "Dr. Williams",
      refillDate: "May 12, 2025",
      status: "Refill Soon" as const
    }
  ];

  return (
    <div className="pt-20">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Welcome to MedPort</h1>
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <AppointmentList appointments={upcomingAppointments} />
        <MedicationList medications={medications} />
      </div>
    </div>
  )
}

export default Home