/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  documents: string[];
  eligibility: {
    maxIncome?: number;
    requiresBPL?: boolean;
    occupations?: string[];
    isRuralOnly?: boolean;
  };
}

export interface Hospital {
  id: string;
  name: string;
  district: string;
  address: string;
  specialties: string[];
  phone?: string;
  website?: string;
  email?: string;
  lat: number;
  lng: number;
}

export const SCHEMES: Scheme[] = [
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PM-JAY)",
    description: "The world's largest health insurance scheme, providing free health coverage of up to ₹5 Lakh per family per year.",
    benefits: [
      "Secondary and tertiary care hospitalization.",
      "Cashless and paperless access to services.",
      "Coverage for pre-existing diseases."
    ],
    documents: [
      "Aadhar Card",
      "Ration Card (BPL)",
      "Voter ID",
      "PM-JAY Letter / Golden Card"
    ],
    eligibility: {
      requiresBPL: true,
      maxIncome: 250000
    }
  },
  {
    id: "state-health-card",
    name: "Arogya-Sree / State Health Scheme",
    description: "Wide-ranging state health coverage for critical illnesses and surgeries.",
    benefits: [
      "Network hospital coverage for 900+ procedures.",
      "Post-operative follow-up.",
      "Free medical checkups."
    ],
    documents: [
      "Residential Proof",
      "Income Certificate",
      "BPL/White Ration Card",
      "Family Photo (with Aadhar numbers)"
    ],
    eligibility: {
      maxIncome: 150000
    }
  },
  {
    id: "farmers-health-scheme",
    name: "Kisan Arogya Nidhi",
    description: "Specialized health cover for registered agricultural families and workers.",
    benefits: [
      "Emergency trauma care.",
      "Maternity benefits for farm workers.",
      "Low-cost generic medicines."
    ],
    documents: [
      "7/12 Extract (Land records)",
      "Farmers Registration Card",
      "Aadhar Card",
      "Bank Account Details"
    ],
    eligibility: {
      occupations: ["Farmer", "Agricultural Worker"]
    }
  },
  {
    id: "rural-women-health",
    name: "Janani Shishu Suraksha Karyakram (JSSK)",
    description: "Free health services for pregnant women and sick infants in rural government facilities.",
    benefits: [
      "Free delivery and C-section.",
      "Free transport to hospital.",
      "Free blood and drugs."
    ],
    documents: [
      "ANC Registration Card",
      "Aadhar Card",
      "Residence Proof"
    ],
    eligibility: {
      isRuralOnly: true
    }
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Bahmani Hospital",
    district: "Kalaburagi",
    address: "Khonialawa, Mominpura, Kalaburagi, Karnataka 585104",
    specialties: ["General Medicine", "Emergency"],
    phone: "08472221825",
    lat: 17.3315,
    lng: 76.8378
  },
  {
    id: "h2",
    name: "Banale Hospital",
    district: "Kalaburagi",
    address: "Ganesh Market, Khuba Plot, Brhampur, Gulburga, Karnataka 585105",
    specialties: ["General Surgery", "Internal Medicine"],
    phone: "09663418290",
    lat: 17.3364,
    lng: 76.8400
  },
  {
    id: "h3",
    name: "Basaveshwara Hospital",
    district: "Kalaburagi",
    address: "Basaveshwar Teaching & General Hospital, Rajapur, Sedam Road, Kalaburagi 585105",
    specialties: ["Multi-speciality", "Teaching Hospital"],
    phone: "08472227611",
    lat: 17.3117,
    lng: 76.8624
  },
  {
    id: "h4",
    name: "Kamareddy Hospital",
    district: "Kalaburagi",
    address: "#9, Vasanth Nagar, Opp. Govt. ITI College, Bus Stand Road Kalaburagi - 585 102",
    specialties: ["Orthopaedics", "Trauma Care"],
    phone: "08472256163",
    website: "http://kamareddyhospitalgulbarga.com",
    lat: 17.3245,
    lng: 76.8333
  },
  {
    id: "h5",
    name: "Medicare Multispeciality Hospital",
    district: "Kalaburagi",
    address: "Darga Rd, Bapu Nagar, Maktampura, Kalaburagi, Karnataka 585101",
    specialties: ["Multi-speciality", "General Medicine"],
    phone: "09141363388",
    lat: 17.3288,
    lng: 76.8255
  },
  {
    id: "h6",
    name: "Nishty Heart Centre",
    district: "Kalaburagi",
    address: "#15 & 16, Lahoti Enclave, Aiwan-E-Shahi Road Kalaburagi, Karnataka 585102",
    specialties: ["Cardiology", "Heart Surgery"],
    phone: "08472232596",
    website: "http://www.nistyheartcentre.com",
    lat: 17.3377,
    lng: 76.8388
  },
  {
    id: "h7",
    name: "Rudrawadi Hospital",
    district: "Kalaburagi",
    address: "Old Jewargi Rd, Balaji Nagar, Kalaburagi, Karnataka 585102",
    specialties: ["General Medicine"],
    phone: "09972222616",
    lat: 17.3200,
    lng: 76.8311
  },
  {
    id: "h8",
    name: "Sangameshwar Hospital",
    district: "Kalaburagi",
    address: "M.S.K. Mill Road, Gulbarga, Kalaburagi, Karnataka 585102",
    specialties: ["General Surgery", "Maternity"],
    phone: "08472222435",
    lat: 17.3400,
    lng: 76.8455
  },
  {
    id: "h9",
    name: "Sri Jayadeva Institute of Cardiovascular Sciences",
    district: "Kalaburagi",
    address: "GIMS Campus, Sedam Road Kalaburagi, Karnataka",
    specialties: ["Cardiology", "Cardiac Research"],
    phone: "08472230500",
    lat: 17.3155,
    lng: 76.8655
  },
  {
    id: "h10",
    name: "SUNRISE MULTISPECIALITY HOSPITAL",
    district: "Kalaburagi",
    address: "Vasanth Nagar, Nagargum, Kalaburagi, Karnataka 585102",
    specialties: ["Multi-speciality"],
    phone: "08472272777",
    lat: 17.3255,
    lng: 76.8344
  },
  {
    id: "h11",
    name: "United Hospital Gulbarga",
    district: "Kalaburagi",
    address: "1-43/A, Opp. Siddarth Law College, Court Road, Near S.V.P Chowk, Kalaburagi, Karnataka 585102",
    specialties: ["Multi-speciality", "Emergency"],
    phone: "08472225006",
    lat: 17.3388,
    lng: 76.8366
  },
  {
    id: "h12",
    name: "Vaatsalya Hospital",
    district: "Kalaburagi",
    address: "RTO Circle, Road,, SH10, Kalaburagi, Karnataka 585105",
    specialties: ["Primary Care", "Secondary Care"],
    phone: "08472222299",
    lat: 17.3322,
    lng: 76.8433
  },
  {
    id: "h13",
    name: "Chirayu Hospital Kalaburgi",
    district: "Kalaburagi",
    address: "Court Road, Opp Gescom Office, Kalaburagi, Karnataka 585102",
    specialties: ["General Medicine"],
    phone: "08472241717",
    email: "chirayugulbarga@gmail.com",
    website: "http://chirayuhealth.com",
    lat: 17.3355,
    lng: 76.8355
  },
  {
    id: "h14",
    name: "Dhanvantri Hospital",
    district: "Kalaburagi",
    address: "New Jewargi Rd, Kotnoor, Kalaburagi, Karnataka 585102",
    specialties: ["General Medicine"],
    phone: "09980759148",
    lat: 17.3100,
    lng: 76.8200
  },
  {
    id: "h15",
    name: "District Government Hospital",
    district: "Kalaburagi",
    address: "Kuvempu Nagar, Kalaburagi, Karnataka 585105",
    specialties: ["Public Health", "Emergency"],
    phone: "08472278644",
    lat: 17.3233,
    lng: 76.8500
  },
  {
    id: "h16",
    name: "ESIC hospital, gulbarga",
    district: "Kalaburagi",
    address: "Gulbarga University, Jnana Ganga, Kalnoor, Kalaburagi, Karnataka 585106",
    specialties: ["General Medicine", "Social Insurance"],
    phone: "08472265548",
    lat: 17.3555,
    lng: 76.8666
  },
  {
    id: "h17",
    name: "Gulbarga Heart Foundation",
    district: "Kalaburagi",
    address: "STBT Cross, Kalaburagi, Karnataka 585101",
    specialties: ["Cardiology"],
    phone: "08472689191",
    lat: 17.3288,
    lng: 76.8388
  },
  {
    id: "h18",
    name: "HCG Cancer Center, Gulbarga",
    district: "Kalaburagi",
    address: "No.1-10/A, 1-10 ,Khuba Plot, Brhampur, Kalaburagi, Karnataka 585105",
    specialties: ["Oncology", "Cancer Care"],
    phone: "08472661000",
    lat: 17.3344,
    lng: 76.8422
  },
  {
    id: "h19",
    name: "Homeocare International",
    district: "Kalaburagi",
    address: "1st floor, Kandoor Shopping Mall, Station Main Road, Gulbarga-585102, Karnataka",
    specialties: ["Homeopathy"],
    phone: "9550003388",
    website: "http://www.homeocare.in",
    lat: 17.3399,
    lng: 76.8377
  }
];
