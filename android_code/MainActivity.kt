package com.arogyanidhi.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.graphics.Color
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocalHospital
import androidx.compose.material.icons.filled.Person

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ArogyaNidhiTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun MainScreen() {
    val navController = rememberNavController()
    var selectedTab by remember { mutableIntStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar(containerColor = Color.White) {
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Schemes") },
                    selected = selectedTab == 0,
                    onClick = {
                        selectedTab = 0
                        navController.navigate("schemes")
                    }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.LocalHospital, contentDescription = "Hospitals") },
                    label = { Text("Hospitals") },
                    selected = selectedTab == 1,
                    onClick = {
                        selectedTab = 1
                        navController.navigate("hospitals")
                    }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Person, contentDescription = "Profile") },
                    label = { Text("Profile") },
                    selected = selectedTab == 2,
                    onClick = {
                        selectedTab = 2
                        navController.navigate("profile")
                    }
                )
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = "schemes",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("schemes") { SchemesScreen() }
            composable("hospitals") { HospitalsScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}

@Composable
fun ArogyaNidhiTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = lightColorScheme(
            primary = Color(0xFF0D9488),
            secondary = Color(0xFFD97706),
            background = Color(0xFFF9FAFB)
        ),
        content = content
    )
}

@Composable
fun ProfileScreen() {
    Surface(modifier = Modifier.fillMaxSize()) {
        Text("Profile Feature Coming Soon", modifier = Modifier.padding(16.dp))
    }
}
