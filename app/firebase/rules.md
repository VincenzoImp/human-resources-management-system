# Firestore Database
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Consenti la lettura a tutti gli utenti autenticati
    match /{document=**} {
      allow read: if request.auth != null;

      // Consenti la scrittura solo se l'UID dell'utente è nell'array "writers" del documento "permissions"
      allow write: if request.auth != null && 
                   request.auth.uid in get(/databases/$(database)/documents/settings/permissions).data.writers;
    }
  }
}
```

# Firebase Storage
```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Consenti la lettura a tutti gli utenti autenticati
      allow read: if request.auth != null;
      
      // Consenti la scrittura solo se l'UID è presente nel campo "writers" del documento "permissions" in Firestore
      allow write: if request.auth != null && 
                   request.auth.uid in firestore.get(/databases/$(database)/documents/settings/permissions).data.writers;
    }
  }
}
```