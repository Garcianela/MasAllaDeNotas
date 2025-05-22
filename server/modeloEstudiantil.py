import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# Cargar datos
df = pd.read_csv('rendimientoEstudiantilOptimo.csv')  # Reemplaza con tu archivo real

# Codificadores
le_asignatura = LabelEncoder()
 
df['cursos'] = le_asignatura.fit_transform(df['cursos'])

# Separar features y target
X = df.drop(['desempeno', 'estudiante_ID'], axis=1)
print("Orden columnas del modelo:", list(X.columns))
y = df['desempeno']

# Dividir datos
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Crear modelo
modelo= RandomForestClassifier(class_weight='balanced', random_state=42)
modelo.fit(X_train, y_train)

# Evaluar
y_pred = modelo.predict(X_test)
print(classification_report(y_test, y_pred))

# Guardar modelo y encoders
joblib.dump(modelo, 'modelo_estudiante.pkl')
joblib.dump(le_asignatura, 'encoder_asignatura.pkl')