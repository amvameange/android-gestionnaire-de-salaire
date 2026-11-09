# Guide d'installation sur Android Studio 📱🇬🇦

Cette application de Mathématiques 5ème Gabon (CIAM) est prête à être intégrée et compilée dans **Android Studio** pour créer un fichier APK ou installer directement l'application sur un smartphone Android.

---

## 🛠️ Méthode 1 : Intégration directe dans une WebView Android Studio (Recommandé)

### Étape 1 : Générer les fichiers de production
Dans le terminal du projet :
```bash
npm run build
```
Le dossier `dist/` contient désormais tous les fichiers avec des chemins relatifs (`./assets/...`) compatibles avec Android `file:///android_asset/`.

---

### Étape 2 : Créer un projet dans Android Studio
1. Ouvre **Android Studio** -> **New Project** -> Choisis **Empty Views Activity** (ou **Empty Activity**).
2. Nom du projet : `Maths5emeGabon`
3. Langage : `Kotlin` (ou `Java`)
4. Minimum SDK : `API 24: Android 7.0` ou supérieur.

---

### Étape 3 : Copier le dossier `dist/` dans Android Studio
1. Dans l'arborescence Android Studio (vue Projet), fais un clic droit sur le dossier `app/src/main`.
2. Choisis **New** -> **Folder** -> **Assets Folder**.
3. Copie tout le contenu du dossier `dist/` (de ce projet) à l'intérieur du dossier `app/src/main/assets/`.
   - Tu dois avoir le fichier `app/src/main/assets/index.html` et le sous-dossier `app/src/main/assets/assets/`.

---

### Étape 4 : Configurer `AndroidManifest.xml`
Ouvre `app/src/main/AndroidManifest.xml` et vérifie les permissions :
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.ciam.maths5emegabon">

    <!-- Autoriser Internet et l'accès réseau si besoin -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Maths 5ème Gabon"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar"
        android:usesCleartextTraffic="true">
        
        <activity
            android:name=".MainActivity"
            android:configChanges="orientation|screenSize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

---

### Étape 5 : Code de `MainActivity.kt`
Remplace le contenu de `app/src/main/java/.../MainActivity.kt` par le code suivant :

```kotlin
package com.ciam.maths5emegabon

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialisation de la WebView plein écran
        webView = WebView(this)
        setContentView(webView)

        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.mediaPlaybackRequiresUserGesture = false

        // Pour permettre le zoom et l'ajustement automatique à l'écran mobile
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true

        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        // Chargement de l'application locale depuis les assets Android
        webView.loadUrl("file:///android_asset/index.html")

        // Gestion du bouton retour Android pour naviguer dans l'historique de l'application
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }
}
```

---

## 🛠️ Méthode 2 : Installation PWA directe sur Smartphone (Alternative sans code)
L'application est une **Progressive Web App (PWA)** avec un fichier `manifest.json`.
Tu peux l'installer instantanément sur n'importe quel smartphone Android :
1. Ouvre l'URL de l'application dans Chrome sur Android.
2. Appuie sur le menu des **3 petits points** en haut à droite.
3. Appuie sur **« Ajouter à l'écran d'accueil »** ou **« Installer l'application »**.
4. L'icône de l'application s'installe directement sur ton téléphone comme une vraie application du Play Store !

---

## 💡 Corrections intégrées dans le code source :
1. **Correction du bogue `window.fetch`** :
   Un garde JavaScript a été placé dans `index.html` pour doter `window.fetch` d'un getter et d'un setter configurables, éliminant l'erreur `Cannot set property fetch of #<Window> which has only a getter`.
2. **Chemins relatifs `base: './'`** :
   Le fichier `vite.config.ts` génère des chemins relatifs pour que les scripts et styles soient immédiatement trouvés par le protocole `file:///android_asset/` d'Android Studio.
3. **Sécurisation de `window.print()` et `AudioContext`** :
   Toutes les fonctions spécifiques au navigateur sont protégées contre les plantages si l'environnement WebView Android ne les supporte pas.
