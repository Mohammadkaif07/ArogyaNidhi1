# Product Requirements Document (PRD) - Arogya-Nidhi

## 1. Project Overview
**Project Name:** Arogya-Nidhi (Health Treasure)  
**Vision:** To bridge the information gap in rural healthcare by providing a digital counselor that helps families identify eligible government health schemes and find the nearest medical facilities.

---

## 2. Problem Statement
Many government health schemes exist to provide free or subsidized medical treatment to vulnerable populations. However, rural families often:
- Are unaware of their eligibility for specific schemes.
- Lack information on required documentation, leading to rejected applications.
- Cannot easily locate hospitals "empaneled" (authorized) to accept these schemes.
- End up paying out-of-pocket, leading to medical debt.

---

## 3. Goals & Success Criteria
### Goals
- **Universal Health Coverage:** Increase the uptake of government health safety nets.
- **Financial Protection:** Prevent medical bankruptcy in rural families.
- **Social Justice:** Remove the information barrier for the most vulnerable.

### Success Criteria
- Users can match with at least 3 types of health schemes based on income/status.
- Interactive checklist ensures users are "office-ready" with documents.
- Searchable hospital directory with Google Maps integration for navigation.

---

## 4. Target Audience
- Rural families in India.
- Low-income households (BPL card holders).
- Agricultural workers and laborers.
- Social workers assisting rural communities.

---

## 5. Functional Requirements

### 5.1 Authentication (Firebase)
- Users must sign in via Google to save their profile and access personalized results.
- Secure logout and session management.

### 5.2 Eligibility Quiz (Stepper UI)
- **Question 1:** Annual Income (Range input).
- **Question 2:** BPL Status (Yes/No).
- **Question 3:** Occupation (Choice: Farmer, Laborer, etc.).
- **Question 4:** Residential Status (Rural/Urban).
- **Question 5:** Family Size (Counter).

### 5.3 Scheme Recommendation Engine
- **Logic:** Decision tree based on quiz inputs to filter `SCHEMES` data.
- **Results View:** Display matched cards with high-level descriptions.
- **Detailed View:** 
    - List of benefits.
    - **Document Checklist:** Clear, actionable list of papers needed (Aadhar, BPL card, etc.).

### 5.4 Hospital Locator
- **Search:** Filter hospitals by District or Name.
- **Details:** Display Address, Specialties, and Phone numbers.
- **Maps Integration:** Embedded Google Maps view and "Get Directions" link for every hospital.

---

## 6. Technical Stack
- **Frontend:** React 19 + TypeScript.
- **Styling:** Tailwind CSS (Mobile-first, empathetic design).
- **Animation:** Motion (for smooth transitions between UI states).
- **Backend/Database:** Firebase (Auth & Firestore for future scalability).
- **Icons:** Lucide-React.
- **Maps:** Google Maps Embed API.

---

## 7. User Flow
1. **App Launch:** User sees the "Arogya-Nidhi" welcome screen.
2. **Onboarding:** User signs in with Google.
3. **Quiz:** User completes the 5-step Eligibility Checker.
4. **Results:** App displays a list of matched schemes (e.g., Ayushman Bharat).
5. **Guidance:** User selects a scheme to see the "Document Checklist."
6. **Action:** User goes to the "Hospitals" tab to find where to use the scheme.
7. **Navigation:** User clicks "Get Directions" to open Google Maps.

---

## 8. Design Guidelines
- **Empathetic UI:** Use warm colors (Teal, Stone, Amber) and clean typography to reduce anxiety.
- **Accessibility:** Large touch targets (44px+) for mobile users.
- **Simplicity:** Minimize text; use icons and clear buttons.
