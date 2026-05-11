package com.arogyanidhi.app

data class Scheme(
    val id: String,
    val title: String,
    val description: String,
    val benefits: List<String>,
    val eligibility: String,
    val documents: List<String>,
    val color: Long // Hex color code
)

data class Hospital(
    val id: String,
    val name: String,
    val district: String,
    val address: String,
    val specialties: List<String>,
    val phone: String,
    val lat: Double,
    val lng: Double,
    val website: String? = null
)

val SCHEMES = listOf(
    Scheme(
        id = "s1",
        title = "Ayushman Bharat (PM-JAY)",
        description = "World's largest health insurance scheme providing ₹5 Lakh per family per year.",
        benefits = listOf("Free secondary and tertiary care", "Cashless treatment", "Pre-existing diseases covered"),
        eligibility = "BPL families and identified occupational categories.",
        documents = listOf("Aadhar Card", "Ration Card (BPL)", "Mobile Number"),
        color = 0xFF0D9488 // Teal
    ),
    Scheme(
        id = "s2",
        title = "Pradhan Mantri Matru Vandana Yojana",
        description = "Maternity benefit scheme providing ₹5,000 for the first living child.",
        benefits = listOf("Cash incentive in three installments", "Improved health-seeking behavior", "Nutrition support"),
        eligibility = "Pregnant and Lactating Mothers.",
        documents = listOf("MCP Card", "Bank Passbook", "Aadhar Card"),
        color = 0xFFD97706 // Amber
    ),
    Scheme(
        id = "s3",
        title = "Rashtriya Swasthya Bima Yojana (RSBY)",
        description = "Smart card-based health insurance for unorganized sector workers.",
        benefits = listOf("Hospitalization coverage up to ₹30,000", "Transportation allowance", "No age limit"),
        eligibility = "BPL workers in the unorganized sector.",
        documents = listOf("BPL Card", "Ration Card", "Identity Proof"),
        color = 0xFF2563EB // Blue
    )
)

val HOSPITALS = listOf(
    Hospital(
        id = "h1",
        name = "ESI Hospital",
        district = "Kalaburagi",
        address = "Khonialawa, Mominpura, Kalaburagi, Karnataka 585104",
        specialties = listOf("General Medicine", "Emergency"),
        phone = "08472221825",
        lat = 17.3315,
        lng = 76.8378
    ),
    Hospital(
        id = "h2",
        name = "Khuba Hospital",
        district = "Kalaburagi",
        address = "Ganesh Market, Khuba Plot, Brhampur, Gulburga, Karnataka 585105",
        specialties = listOf("General Surgery", "Internal Medicine"),
        phone = "09663418290",
        lat = 17.3364,
        lng = 76.8400
    ),
    Hospital(
        id = "h3",
        name = "Basaveshwar Hospital",
        district = "Kalaburagi",
        address = "Basaveshwar Teaching & General Hospital, Rajapur, Sedam Road, Kalaburagi 585105",
        specialties = listOf("Multi-speciality", "Teaching Hospital"),
        phone = "08472227611",
        lat = 17.3117,
        lng = 76.8624
    ),
    Hospital(
        id = "h4",
        name = "Kamareddy Hospital",
        district = "Kalaburagi",
        address = "#9, Vasanth Nagar, Opp. Govt. ITI College, Bus Stand Road Kalaburagi - 585 102",
        specialties = listOf("Orthopaedics", "Trauma Care"),
        phone = "08472256163",
        website = "http://kamareddyhospitalgulbarga.com",
        lat = 17.3245,
        lng = 76.8333
    )
)
