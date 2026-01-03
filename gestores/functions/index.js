const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Plantilla lista para deploy de cloud functions en una cuenta BLAZE (de pago) para eliminar un documento (tarea o proyecto)
exports.deleteDocument = functions.https.onCall((data, context) => {
    const { collectionName, docId } = data;

    if (!collectionName || !docId) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "collectionName y docId son obligatorios"
        );
    }

    return admin
        .firestore()
        .collection(collectionName)
        .doc(docId)
        .delete()
        .then(() => ({ success: true }))
        .catch((error) => {
            throw new functions.https.HttpsError(
                "internal",
                `Error al eliminar el documento en ${collectionName}`,
                error
            );
        });
});
