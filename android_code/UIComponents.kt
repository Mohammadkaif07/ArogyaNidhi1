package com.arogyanidhi.app

import android.content.Intent
import android.net.Uri
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.compose.*

@Composable
fun SchemesScreen() {
    var quizStarted by remember { mutableStateOf(false) }
    var recommendations by remember { mutableStateOf<List<Scheme>?>(null) }

    Column(modifier = Modifier.fillMaxSize()) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF0D9488))
                .padding(24.dp)
        ) {
            Column {
                Text(
                    "Arogya-Nidhi",
                    color = Color.White,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    "Digital Health Counselor",
                    color = Color.White.copy(alpha = 0.8f),
                    fontSize = 16.sp
                )
            }
        }

        if (!quizStarted && recommendations == null) {
            WelcomeView(onStart = { quizStarted = true })
        } else if (quizStarted) {
            QuizView(onComplete = { 
                recommendations = SCHEMES 
                quizStarted = false 
            })
        } else if (recommendations != null) {
            RecommendationsView(recommendations!!)
        }
    }
}

@Composable
fun WelcomeView(onStart: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            Icons.Default.HealthAndSafety,
            contentDescription = null,
            tint = Color(0xFF0D9488),
            modifier = Modifier.size(80.dp)
        )
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            "Find the Best Health Safety Net",
            fontWeight = FontWeight.Bold,
            fontSize = 20.sp
        )
        Text(
            "Answer 5 small questions and let our AI guide you to the right government schemes.",
            modifier = Modifier.padding(vertical = 16.dp)
        )
        Button(
            onClick = onStart,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0D9488))
        ) {
            Text("Start Eligibility Check")
        }
    }
}

@Composable
fun QuizView(onComplete: () -> Unit) {
    var step by remember { mutableIntStateOf(1) }
    
    Column(modifier = Modifier.padding(24.dp)) {
        Text("Question $step of 5", color = Color.Gray)
        LinearProgressIndicator(
            progress = step / 5f,
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            color = Color(0xFF0D9488)
        )
        
        Spacer(modifier = Modifier.height(24.dp))
        
        when(step) {
            1 -> Question("What is your annual family income?", listOf("< ₹1 Lakh", "₹1-3 Lakhs", "> ₹3 Lakhs")) { step++ }
            2 -> Question("Do you have a BPL Ration Card?", listOf("Yes", "No")) { step++ }
            3 -> Question("What is your primary occupation?", listOf("Farmer", "Laborer", "Self-employed", "Other")) { step++ }
            4 -> Question("Where do you live?", listOf("Rural Area", "Urban Area")) { step++ }
            5 -> Question("Family size?", listOf("1-2", "3-4", "5+")) { onComplete() }
        }
    }
}

@Composable
fun Question(title: String, options: List<String>, onNext: () -> Unit) {
    Text(title, fontSize = 20.sp, fontWeight = FontWeight.SemiBold)
    Spacer(modifier = Modifier.height(24.dp))
    options.forEach { option ->
        OutlinedButton(
            onClick = onNext,
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text(option)
        }
    }
}

@Composable
fun RecommendationsView(schemes: List<Scheme>) {
    LazyColumn(modifier = Modifier.padding(16.dp)) {
        item {
            Text("Matched Schemes", fontSize = 20.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(bottom = 16.dp))
        }
        items(schemes) { scheme ->
            SchemeCard(scheme)
        }
    }
}

@Composable
fun SchemeCard(scheme: Scheme) {
    var expanded by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .background(Color(scheme.color), RoundedCornerShape(8.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Verified, contentDescription = null, tint = Color.White)
                }
                Spacer(modifier = Modifier.width(12.dp))
                Text(scheme.title, fontWeight = FontWeight.Bold, fontSize = 18.sp)
            }
            Text(scheme.description, color = Color.Gray, modifier = Modifier.padding(vertical = 8.dp))
            
            TextButton(onClick = { expanded = !expanded }) {
                Text(if (expanded) "Hide Details" else "View Details & Checklist")
            }
            
            AnimatedVisibility(visible = expanded) {
                Column {
                    Text("Required Documents:", fontWeight = FontWeight.Bold)
                    scheme.documents.forEach { doc ->
                        Row(modifier = Modifier.padding(vertical = 2.dp)) {
                            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color.Green, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(doc, fontSize = 14.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun HospitalsScreen() {
    var searchQuery by remember { mutableStateOf("") }
    val filteredHospitals = HOSPITALS.filter { 
        it.name.contains(searchQuery, ignoreCase = true) || it.district.contains(searchQuery, ignoreCase = true)
    }

    Column(modifier = Modifier.padding(16.dp).fillMaxSize()) {
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Search by District or Name") },
            modifier = Modifier.fillMaxWidth(),
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            shape = RoundedCornerShape(12.dp)
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        LazyColumn {
            items(filteredHospitals) { hospital ->
                HospitalItem(hospital)
            }
        }
    }
}

@Composable
fun HospitalItem(hospital: Hospital) {
    var showMap by remember { mutableStateOf(false) }
    val context = LocalContext.current
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(hospital.name, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Text(hospital.district, color = Color(0xFF0D9488), fontSize = 14.sp)
                }
                Row {
                    IconButton(onClick = { 
                        val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${hospital.phone}"))
                        context.startActivity(intent)
                    }) {
                        Icon(Icons.Default.Phone, contentDescription = null, tint = Color.Gray)
                    }
                    IconButton(onClick = { showMap = !showMap }) {
                        Icon(Icons.Default.Map, contentDescription = null, tint = if (showMap) Color(0xFF0D9488) else Color.Gray)
                    }
                }
            }
            
            Text(hospital.address, color = Color.Gray, fontSize = 14.sp, modifier = Modifier.padding(vertical = 4.dp))
            
            AnimatedVisibility(visible = showMap) {
                val hospitalLoc = LatLng(hospital.lat, hospital.lng)
                val cameraPositionState = rememberCameraPositionState {
                    position = CameraPosition.fromLatLngZoom(hospitalLoc, 15f)
                }
                
                Column {
                    Box(modifier = Modifier.height(200.dp).fillMaxWidth()) {
                        GoogleMap(
                            modifier = Modifier.matchParentSize(),
                            cameraPositionState = cameraPositionState
                        ) {
                            Marker(
                                state = MarkerState(position = hospitalLoc),
                                title = hospital.name
                            )
                        }
                    }
                    Button(
                        onClick = {
                            val gmmIntentUri = Uri.parse("google.navigation:q=${hospital.lat},${hospital.lng}")
                            val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
                            mapIntent.setPackage("com.google.android.apps.maps")
                            context.startActivity(mapIntent)
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0D9488)),
                        shape = RoundedCornerShape(0.dp)
                    ) {
                        Text("Get Directions")
                    }
                }
            }
        }
    }
}
