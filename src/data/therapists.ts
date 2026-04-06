export interface Therapist {
  id: string;
  name: string;
  specialty: string[];
  bio: string;
  avatarColor: string;
  availableSlots: Record<string, string[]>;
}

export const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: ["Anxiety", "CBT", "Stress"],
    bio: "Specializes in cognitive behavioural therapy with 8 years of experience helping young adults manage anxiety and stress.",
    avatarColor: "#F5820A",
    availableSlots: {
      "2026-04-08": ["9:00 AM", "10:00 AM", "2:00 PM"],
      "2026-04-09": ["11:00 AM", "3:00 PM", "4:00 PM"],
      "2026-04-10": ["9:00 AM", "10:00 AM", "11:00 AM"],
      "2026-04-11": ["2:00 PM", "3:00 PM"],
    },
  },
  {
    id: "2",
    name: "Dr. Arun Mehta",
    specialty: ["Mindfulness", "Sleep", "Depression"],
    bio: "Integrates mindfulness-based stress reduction with traditional therapy. Passionate about sleep health and wellbeing.",
    avatarColor: "#4AADFF",
    availableSlots: {
      "2026-04-08": ["10:00 AM", "11:00 AM", "3:00 PM"],
      "2026-04-09": ["9:00 AM", "2:00 PM"],
      "2026-04-10": ["10:00 AM", "3:00 PM", "4:00 PM"],
      "2026-04-12": ["9:00 AM", "11:00 AM"],
    },
  },
  {
    id: "3",
    name: "Dr. Kavya Nair",
    specialty: ["Anxiety", "Mindfulness", "Relationships"],
    bio: "Warm and empathetic approach combining mindfulness and acceptance-based strategies for anxiety and relationship challenges.",
    avatarColor: "#4C1D95",
    availableSlots: {
      "2026-04-08": ["9:00 AM", "2:00 PM", "4:00 PM"],
      "2026-04-09": ["10:00 AM", "11:00 AM"],
      "2026-04-11": ["9:00 AM", "10:00 AM", "3:00 PM"],
      "2026-04-12": ["2:00 PM", "3:00 PM"],
    },
  },
  {
    id: "4",
    name: "Dr. Rohan Das",
    specialty: ["CBT", "Stress", "Trauma"],
    bio: "Experienced in trauma-informed care and stress management. Combines CBT with somatic techniques for holistic healing.",
    avatarColor: "#065F46",
    availableSlots: {
      "2026-04-09": ["9:00 AM", "10:00 AM", "4:00 PM"],
      "2026-04-10": ["11:00 AM", "2:00 PM"],
      "2026-04-11": ["10:00 AM", "3:00 PM", "4:00 PM"],
      "2026-04-12": ["9:00 AM", "11:00 AM"],
    },
  },
];
